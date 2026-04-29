import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import { constants as fsConstants } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUTPUT_DIR = path.join(ROOT, "public", "images", "blog");
const MODEL = "gemini-3.1-flash-image-preview";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const RATE_LIMIT_MS = 5000;
const FORCE_REGENERATE = process.env.FORCE_REGENERATE === "1";
const FALLBACK_ENV_FILES = [
  path.join(ROOT, "env.local"),
  path.join(ROOT, ".env.local"),
  path.join(ROOT, ".env"),
  "C:\\Dev\\github\\exyuiptv.app_new\\env.local"
];
const GLOBAL_PROMPT_SUFFIX =
  "\nAdditional constraints: 16:9 composition, premium editorial realism, no readable text anywhere, no letters, no numbers, no subtitles, no channel names, no interface labels, no logos, no watermarks, no brand marks, no visible faces, and if a TV or device screen is visible it should show only abstract or blurred non-textual content.";

const POSTS = [
  {
    slug: "android-box-iptv-instalacija",
    prompt: "Use case: photorealistic-natural\nAsset type: premium installation guide hero image\nPrimary request: Android TV box setup for IPTV at home\nScene/background: modern entertainment center in a clean living room\nSubject: Android TV box connected to a television, hands configuring the device, cables tidy and realistic\nStyle/medium: editorial consumer-tech photography\nComposition/framing: wide 16:9, setup process centered clearly for a blog hero\nLighting/mood: practical, premium, realistic household tech scene\nConstraints: no text, no watermark, no logos, no visible faces"
  },
  {
    slug: "fire-tv-stick-iptv-instalacija",
    prompt: "Use case: photorealistic-natural\nAsset type: premium installation guide hero image\nPrimary request: streaming stick setup in progress on a modern television\nScene/background: stylish living room media setup\nSubject: streaming stick inserted into TV HDMI port, remote in hand, setup progress implied with non-readable screen content\nStyle/medium: editorial product-lifestyle photography\nComposition/framing: wide 16:9, clear emphasis on the device installation process\nLighting/mood: clean, premium, approachable tech mood\nConstraints: no text, no watermark, no logos, no visible faces, avoid brand marks"
  },
  {
    slug: "kako-instalirati-iptv-na-samsung-tv",
    prompt: "Use case: photorealistic-natural\nAsset type: premium smart TV installation hero image\nPrimary request: smart TV app installation for IPTV at home\nScene/background: modern living room with close but wide enough view of a television setup\nSubject: smart TV showing an app installation mood with abstract non-readable interface, hands using a remote, no visible faces\nStyle/medium: editorial consumer-tech photography\nComposition/framing: wide 16:9, clear setup narrative for a technical guide\nLighting/mood: clean, realistic, premium home-tech look\nConstraints: no text, no watermark, no logos, no visible faces"
  },
  {
    slug: "najbolji-iptv-box-2026",
    prompt: "Use case: photorealistic-natural\nAsset type: premium product comparison hero image\nPrimary request: editorial lineup of the best IPTV streaming boxes for 2026\nScene/background: refined media shelf or modern tabletop in a living room\nSubject: three or four different streaming boxes arranged elegantly with a television in the background\nStyle/medium: editorial product photography with realistic materials\nComposition/framing: wide 16:9, clean comparison lineup without labels\nLighting/mood: premium, modern, trustworthy tech review atmosphere\nConstraints: no text, no watermark, no logos, no faces, neutral styling"
  },
  {
    slug: "sta-je-iptv-i-kako-radi",
    prompt: "Use case: photorealistic-natural\nAsset type: premium explainer blog hero image\nPrimary request: realistic concept for how IPTV works at home\nScene/background: modern home networking and television setup\nSubject: data cables, router and television with subtle digital signal visualization integrated naturally into the scene\nStyle/medium: editorial consumer-tech photography\nComposition/framing: wide 16:9, educational but premium and realistic\nLighting/mood: clear, modern, confident, believable tech ambience\nConstraints: no text, no watermark, no logos, no visible faces"
  },
  {
    slug: "iptv-vs-kabelska-televizija",
    prompt: "Use case: photorealistic-natural\nAsset type: editorial comparison hero image\nPrimary request: visual comparison between classic cable television and modern streaming hardware\nScene/background: minimalist tabletop or media console in a modern home\nSubject: coax cable and traditional TV element contrasted with sleek streaming device and remote\nStyle/medium: premium editorial still-life photography\nComposition/framing: wide 16:9, clean side-by-side composition without labels\nLighting/mood: informative, modern, restrained, premium\nConstraints: no text, no watermark, no logos, no faces"
  },
  {
    slug: "kako-poboljsati-kvalitetu-iptv-streama",
    prompt: "Use case: photorealistic-natural\nAsset type: premium tech advice hero image\nPrimary request: improving IPTV stream quality at home\nScene/background: modern media room with router and television setup\nSubject: high-quality router in foreground with sharp stable television playback in background, premium networking concept\nStyle/medium: editorial consumer-tech photography\nComposition/framing: wide 16:9, focus on connection quality and stable streaming\nLighting/mood: modern, precise, premium, realistic tech atmosphere\nConstraints: no text, no watermark, no logos, no visible faces"
  },
  {
    slug: "legalnost-iptv-u-njemackoj",
    prompt: "Use case: photorealistic-natural\nAsset type: serious editorial blog hero image\nPrimary request: legal discussion around IPTV in Germany and the DACH region\nScene/background: sophisticated Berlin cityscape or governmental architecture with editorial neutrality\nSubject: balanced legal concept in a modern setting, subtle scales of justice or documents near a television setup, tasteful and realistic\nStyle/medium: editorial reportage photography\nComposition/framing: wide 16:9, sober and premium, suitable for a legal explainer article\nLighting/mood: balanced, calm, serious, professional\nConstraints: no text, no watermark, no logos, no visible faces, no political propaganda"
  },
  {
    slug: "najbolji-sportski-kanali-exyu-iptv",
    prompt: "Use case: photorealistic-natural\nAsset type: premium sports blog hero image\nPrimary request: best sports channels on Balkan IPTV shown through a premium home viewing setup\nScene/background: modern TV room with energetic live sports atmosphere\nSubject: television showing football, tennis and basketball moments in a tasteful collage-like on-screen mix, stadium energy without logos\nStyle/medium: editorial sports-lifestyle photography\nComposition/framing: wide 16:9, television as focal point with premium sports mood\nLighting/mood: dynamic, premium, realistic event-night atmosphere\nConstraints: no text, no watermark, no logos, no visible faces"
  },
  {
    slug: "kako-gledati-exyu-kanale-u-inostranstvu",
    prompt: "Use case: photorealistic-natural\nAsset type: premium diaspora guide hero image\nPrimary request: watching EX YU channels abroad through IPTV\nScene/background: tasteful home-viewing concept in a realistic European apartment interior\nSubject: television in an apartment abroad, subtle travel and diaspora connection cues, remote on table, no readable screen details\nStyle/medium: editorial lifestyle photography\nComposition/framing: wide 16:9, readable storytelling without text elements\nLighting/mood: warm, aspirational, realistic, premium\nConstraints: no text, no watermark, no logos, no visible faces"
  },
  {
    slug: "exyu-iptv-njemacka",
    prompt: "Use case: photorealistic-natural\nAsset type: premium diaspora blog hero image\nPrimary request: Balkan diaspora in Germany watching EXYU IPTV at home\nScene/background: modern German apartment with subtle city lights outside, warm evening interior\nSubject: large TV showing abstract Balkan channel content, remote and tidy living-room setup\nStyle/medium: editorial interior lifestyle photography\nComposition/framing: wide 16:9, blend German urban exterior with cozy home streaming mood\nLighting/mood: warm, premium, realistic European evening ambience\nConstraints: no text, no logos, no watermark, no visible faces, no readable screen content"
  },
  {
    slug: "tivimate-postavke-za-exyu-iptv",
    prompt: "Use case: photorealistic-natural\nAsset type: premium IPTV app settings guide hero image\nPrimary request: configuring an advanced IPTV app on Android TV\nScene/background: clean living room with large smart TV and remote control in foreground\nSubject: TV showing abstract organized channel-grid shapes with no readable interface text, setup mood for power users\nStyle/medium: editorial consumer-tech photography\nComposition/framing: wide 16:9, TV and remote clearly visible\nLighting/mood: polished, technical, calm, premium\nConstraints: no text, no logos, no watermark, no visible faces, no readable UI"
  },
  {
    slug: "iptv-smarters-pro-postavke",
    prompt: "Use case: photorealistic-natural\nAsset type: premium IPTV app setup hero image\nPrimary request: configuring a simple IPTV app profile for EXYU channels\nScene/background: cozy modern living room with TV, smartphone and remote on the table\nSubject: TV and phone showing abstract streaming app screens without readable text, beginner-friendly setup mood\nStyle/medium: editorial tech lifestyle photography\nComposition/framing: wide 16:9, devices arranged naturally for a blog hero\nLighting/mood: approachable, clean, warm, premium\nConstraints: no text, no logos, no watermark, no visible faces, no readable UI"
  },
  {
    slug: "exyu-iptv-iphone-ipad",
    prompt: "Use case: photorealistic-natural\nAsset type: premium iOS IPTV guide hero image\nPrimary request: watching EXYU IPTV on iPhone and iPad\nScene/background: modern desk or sofa setup in a bright European apartment\nSubject: iPhone and tablet displaying abstract colorful streaming content without readable UI, TV in soft background\nStyle/medium: editorial mobile-tech lifestyle photography\nComposition/framing: wide 16:9, mobile devices as focal point with home streaming context\nLighting/mood: clean, modern, premium, practical\nConstraints: no text, no logos, no watermark, no visible faces, no brand marks"
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
      // Continue to the next configured env file.
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
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ],
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

  const selectedSlugs = process.env.POST_SLUGS
    ? new Set(process.env.POST_SLUGS.split(",").map((slug) => slug.trim()).filter(Boolean))
    : null;
  const posts = selectedSlugs ? POSTS.filter((post) => selectedSlugs.has(post.slug)) : POSTS;
  const results = [];

  for (const [index, post] of posts.entries()) {
    const outputPath = path.join(OUTPUT_DIR, `${post.slug}.webp`);
    const imageExists = await fileExists(outputPath);

    try {
      if (!imageExists || FORCE_REGENERATE) {
        console.log(`[${index + 1}/${posts.length}] Generating image for ${post.slug}...`);
        const imageBuffer = await generateImageBuffer(apiKey, `${post.prompt}${GLOBAL_PROMPT_SUFFIX}`);
        await saveWebP(imageBuffer, outputPath);
        await sleep(RATE_LIMIT_MS);
        results.push({ slug: post.slug, status: "generated" });
      } else {
        console.log(`[${index + 1}/${posts.length}] Reusing existing image for ${post.slug}`);
        results.push({ slug: post.slug, status: "reused" });
      }
    } catch (error) {
      console.error(`Failed for ${post.slug}: ${error.message}`);
      results.push({ slug: post.slug, status: "failed" });
    }
  }

  console.log("\nSummary:");
  for (const item of results) {
    console.log(`- ${item.slug}: image=${item.status}`);
  }

  if (results.some((item) => item.status === "failed")) {
    process.exitCode = 1;
  }
}

await main();
