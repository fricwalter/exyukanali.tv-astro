import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import { constants as fsConstants } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUTPUT_DIR = path.join(ROOT, "public", "images", "countries");
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
  "\nAdditional constraints: 16:9 composition, premium editorial realism, no readable text anywhere, no letters, no numbers, no subtitles, no channel names, no interface labels, no logos, no watermarks, no brand marks, no visible faces, and if a TV or device screen is visible it should show only abstract or blurred non-textual content.";

const IMAGES = [
  {
    slug: "deutschland-sportabend",
    prompt: "Use case: photorealistic-natural\nAsset type: premium country landing page hero image\nPrimary request: Balkan family home in Germany watching a major live football match through IPTV\nScene/background: modern German apartment living room in the evening with subtle city lights through the window\nSubject: large TV with abstract football stadium action, remote on table, snacks and cozy seating, no visible faces\nStyle/medium: editorial lifestyle photography\nComposition/framing: wide 16:9, warm and practical, TV and living room clearly visible\nLighting/mood: premium sports-night atmosphere, welcoming, realistic"
  },
  {
    slug: "deutschland-geraete",
    prompt: "Use case: photorealistic-natural\nAsset type: premium device compatibility landing page image\nPrimary request: IPTV running on multiple home devices in Germany\nScene/background: clean media console in a contemporary apartment\nSubject: smart TV, streaming stick, Android TV box, smartphone and tablet arranged naturally, all screens showing abstract streaming colors without text\nStyle/medium: editorial consumer-tech photography\nComposition/framing: wide 16:9, devices readable and balanced, no clutter\nLighting/mood: modern, trustworthy, simple setup feeling"
  },
  {
    slug: "deutschland-catch-tv",
    prompt: "Use case: photorealistic-natural\nAsset type: premium catch-up TV feature image\nPrimary request: viewer catching up on a missed sports broadcast at home\nScene/background: relaxed living room with TV guide feeling represented only by abstract timeline shapes\nSubject: television showing blurred sports replay moment, remote control in foreground, coffee table, no visible faces\nStyle/medium: editorial lifestyle photography\nComposition/framing: wide 16:9, clear TV focal point and catch-up mood without readable UI\nLighting/mood: calm evening, useful feature, premium and realistic"
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
    .resize(1600, 900, {
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
