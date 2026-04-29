import { mkdir, readFile, access } from "node:fs/promises";
import { constants as fsConstants } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUTPUT_DIR = path.join(ROOT, "public", "images", "channels");
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
  "\nAdditional constraints: 16:9 composition, premium editorial realism, no readable text anywhere, no letters, no numbers, no subtitles, no channel names, no interface labels, no logos, no watermarks, no brand marks, no visible faces, and if a TV screen is visible it should show only abstract or blurred non-textual content.";

const IMAGES = [
  {
    slug: "sport-live-tv",
    prompt: "Use case: photorealistic-natural\nAsset type: premium IPTV channel category image\nPrimary request: live sports night on a modern living room television\nScene/background: stylish European apartment at night\nSubject: large TV showing abstract football and stadium action, remote on table, subtle sports atmosphere without readable screen details\nStyle/medium: editorial lifestyle photography\nComposition/framing: wide 16:9, TV and living room clearly visible\nLighting/mood: energetic but professional, premium sports viewing"
  },
  {
    slug: "movies-series-vod",
    prompt: "Use case: photorealistic-natural\nAsset type: premium IPTV channel category image\nPrimary request: movie and series night with video on demand at home\nScene/background: cozy modern living room, sofa, soft lighting\nSubject: television showing abstract cinematic colors, bowl and remote on coffee table, no visible faces\nStyle/medium: editorial home entertainment photography\nComposition/framing: wide 16:9, cinematic but realistic\nLighting/mood: warm, premium, relaxed"
  },
  {
    slug: "exyu-home-channels",
    prompt: "Use case: photorealistic-natural\nAsset type: premium diaspora IPTV channel category image\nPrimary request: Balkan diaspora watching home country TV channels abroad\nScene/background: modern European apartment with subtle family-home feeling and city lights outside\nSubject: TV with abstract news and regional programming mood, remote and coffee table, no readable text\nStyle/medium: editorial lifestyle photography\nComposition/framing: wide 16:9, realistic living room and TV as focal point\nLighting/mood: warm, trustworthy, connection to home"
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
      if (match?.[1]) return match[1].trim();
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
    .resize(1400, 788, {
      fit: "cover",
      position: "center"
    })
    .webp({
      quality: 88,
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
