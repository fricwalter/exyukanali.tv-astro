import { mkdir, readFile, access } from "node:fs/promises";
import { constants as fsConstants } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUTPUT_DIR = path.join(ROOT, "public", "images", "devices");
const MODEL = "gemini-3.1-flash-image-preview";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const FORCE_REGENERATE = process.env.FORCE_REGENERATE === "1";
const FALLBACK_ENV_FILES = [
  path.join(ROOT, "env.local"),
  path.join(ROOT, ".env.local"),
  path.join(ROOT, ".env"),
  "C:\\Dev\\github\\exyuiptv.app_new\\env.local"
];
const GLOBAL_PROMPT_SUFFIX =
  "\nAdditional constraints: 16:9 composition, premium editorial realism, no readable text anywhere, no letters, no numbers, no subtitles, no channel names, no interface labels, no logos, no watermarks, no brand marks, no visible faces, and if a screen is visible it should show only abstract or blurred non-textual streaming content.";

const IMAGES = [
  {
    slug: "smart-tv",
    prompt: "Use case: photorealistic-natural\nAsset type: premium device compatibility card image\nPrimary request: IPTV on a modern smart TV in a stylish living room\nScene/background: clean European apartment living room, media wall, evening ambience\nSubject: large smart TV, remote on coffee table, screen showing abstract colorful streaming content\nStyle/medium: editorial consumer-tech photography\nComposition/framing: wide 16:9, TV clearly centered, premium and realistic\nLighting/mood: warm, professional, trustworthy"
  },
  {
    slug: "fire-tv-stick",
    prompt: "Use case: photorealistic-natural\nAsset type: premium device compatibility card image\nPrimary request: compact HDMI streaming stick connected to a television for IPTV\nScene/background: close view behind or beside a modern television, tidy media setup\nSubject: small unbranded streaming stick in HDMI port, remote nearby, TV glow in background\nStyle/medium: editorial product-lifestyle photography\nComposition/framing: wide 16:9, device and TV connection readable without logos\nLighting/mood: clean, practical, premium"
  },
  {
    slug: "android-box",
    prompt: "Use case: photorealistic-natural\nAsset type: premium device compatibility card image\nPrimary request: Android TV box setup for IPTV\nScene/background: modern media console under a television\nSubject: compact unbranded Android TV box, remote, HDMI cable, TV with abstract streaming colors\nStyle/medium: editorial consumer-tech photography\nComposition/framing: wide 16:9, product setup as focal point\nLighting/mood: precise, stable, professional"
  },
  {
    slug: "apple-ios",
    prompt: "Use case: photorealistic-natural\nAsset type: premium device compatibility card image\nPrimary request: IPTV on tablet and phone with living room TV context\nScene/background: sofa or coffee table in a bright modern apartment\nSubject: unbranded smartphone and tablet showing abstract streaming visuals, TV blurred in background\nStyle/medium: editorial mobile-tech lifestyle photography\nComposition/framing: wide 16:9, mobile devices clearly visible, no logos\nLighting/mood: clean, premium, mobile viewing"
  },
  {
    slug: "android-mobile",
    prompt: "Use case: photorealistic-natural\nAsset type: premium device compatibility card image\nPrimary request: Android phone and tablet used for IPTV viewing\nScene/background: desk or sofa setup with headphones and remote nearby\nSubject: unbranded Android-style phone and tablet showing abstract sports and movie colors without text\nStyle/medium: editorial mobile technology photography\nComposition/framing: wide 16:9, devices centered and professional\nLighting/mood: practical, modern, everyday use"
  },
  {
    slug: "pc-laptop",
    prompt: "Use case: photorealistic-natural\nAsset type: premium device compatibility card image\nPrimary request: IPTV on laptop and desktop monitor\nScene/background: neat home office desk in evening\nSubject: laptop and monitor showing abstract streaming content, keyboard and mouse, no readable UI\nStyle/medium: editorial home-office technology photography\nComposition/framing: wide 16:9, laptop as main subject\nLighting/mood: focused, calm, professional"
  },
  {
    slug: "mag-enigma2",
    prompt: "Use case: photorealistic-natural\nAsset type: premium receiver compatibility card image\nPrimary request: IPTV receiver setup for MAG and Enigma2 style boxes\nScene/background: media shelf below a TV in a tidy living room\nSubject: compact unbranded receiver box with remote, ethernet cable, TV glow in background\nStyle/medium: editorial consumer electronics photography\nComposition/framing: wide 16:9, receiver hardware clear without logos\nLighting/mood: technical, reliable, understated"
  },
  {
    slug: "game-console",
    prompt: "Use case: photorealistic-natural\nAsset type: premium living room entertainment card image\nPrimary request: game console area used as part of home entertainment and streaming setup\nScene/background: modern gaming and TV corner, clean and grown-up\nSubject: unbranded game controllers, console-like device, TV with abstract streaming visuals\nStyle/medium: editorial entertainment technology photography\nComposition/framing: wide 16:9, premium setup without brand identifiers\nLighting/mood: modern, polished, not playful"
  }
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fileExists(filePath) {
  try {
    await access(filePath, fsConstants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function getApiKey() {
  if (process.env.GOOGLE_GEMINI_API_KEY) {
    return process.env.GOOGLE_GEMINI_API_KEY.trim();
  }

  for (const envPath of FALLBACK_ENV_FILES) {
    try {
      const contents = await readFile(envPath, "utf8");
      const match = contents.match(/^GOOGLE_GEMINI_API_KEY=(.+)$/m);
      if (match?.[1]) {
        return match[1].trim();
      }
    } catch {
      // Continue to next configured env file.
    }
  }

  throw new Error("GOOGLE_GEMINI_API_KEY not found in environment or fallback env files");
}

async function generateImageBuffer(apiKey, prompt) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseModalities: ["TEXT", "IMAGE"]
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Gemini API ${response.status}: ${await response.text()}`);
  }

  const data = await response.json();
  const imagePart = data?.candidates?.[0]?.content?.parts?.find((part) =>
    part.inlineData?.mimeType?.startsWith("image/")
  );

  if (!imagePart?.inlineData?.data) {
    throw new Error("Gemini response did not include image data");
  }

  return Buffer.from(imagePart.inlineData.data, "base64");
}

async function saveWebP(inputBuffer, outputPath) {
  await sharp(inputBuffer)
    .resize(1200, 675, {
      fit: "cover",
      position: "center"
    })
    .webp({
      quality: 86,
      effort: 6
    })
    .toFile(outputPath);
}

async function main() {
  const apiKey = await getApiKey();
  await mkdir(OUTPUT_DIR, { recursive: true });

  for (const [index, image] of IMAGES.entries()) {
    const outputPath = path.join(OUTPUT_DIR, `${image.slug}.webp`);
    const imageExists = await fileExists(outputPath);

    if (imageExists && !FORCE_REGENERATE) {
      console.log(`[${index + 1}/${IMAGES.length}] Reusing ${image.slug}`);
      continue;
    }

    console.log(`[${index + 1}/${IMAGES.length}] Generating ${image.slug}...`);
    const imageBuffer = await generateImageBuffer(apiKey, `${image.prompt}${GLOBAL_PROMPT_SUFFIX}`);
    await saveWebP(imageBuffer, outputPath);
    await sleep(5000);
  }
}

await main();
