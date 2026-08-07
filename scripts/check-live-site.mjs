const configuredSiteUrl =
  process.env.WORKSHOP_SITE_URL ||
  "https://shanghaitech-sem-finance.github.io/workshop-series/";
const expectedVersion = process.env.WORKSHOP_EXPECTED_SHA ?? "";
const siteUrl = new URL(
  configuredSiteUrl.endsWith("/") ? configuredSiteUrl : `${configuredSiteUrl}/`,
);

const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

async function fetchWithRetry(url, attempts = 6) {
  const requestUrl = new URL(url);
  if (expectedVersion) {
    requestUrl.searchParams.set("health-check", expectedVersion.slice(0, 12));
  }

  let lastFailure;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(requestUrl, {
        headers: { "user-agent": "ShanghaiTech-SEM-website-health-check" },
      });
      if (response.ok) return response;
      lastFailure = new Error(`${requestUrl} returned HTTP ${response.status}`);
    } catch (error) {
      lastFailure = error;
    }

    if (attempt < attempts) await delay(5000);
  }
  throw lastFailure;
}

async function fetchHtml(url) {
  const response = await fetchWithRetry(url);
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("text/html")) {
    throw new Error(`${url} returned unexpected content type: ${contentType}`);
  }
  return response.text();
}

const documents = new Map();
documents.set(siteUrl.href, await fetchHtml(siteUrl));

const workshopUrls = new Set();
for (const match of documents.get(siteUrl.href).matchAll(/href="([^"]+)"/g)) {
  const linkedUrl = new URL(match[1], siteUrl);
  if (
    linkedUrl.origin === siteUrl.origin &&
    linkedUrl.pathname.startsWith(siteUrl.pathname) &&
    /\/workshops\/\d{4}\/?$/.test(linkedUrl.pathname)
  ) {
    workshopUrls.add(linkedUrl.href);
  }
}

if (workshopUrls.size < 3) {
  throw new Error(`Expected at least three workshop pages, found ${workshopUrls.size}.`);
}

for (const workshopUrl of workshopUrls) {
  documents.set(workshopUrl, await fetchHtml(workshopUrl));
}

for (const [documentUrl, html] of documents) {
  const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
  if (!canonicalMatch) {
    throw new Error(`${documentUrl} does not declare a canonical URL.`);
  }
  if (canonicalMatch[1] !== documentUrl) {
    throw new Error(
      `${documentUrl} declares unexpected canonical URL ${canonicalMatch[1]}.`,
    );
  }
  if (!/<meta name="robots" content="index, follow"\/>/.test(html)) {
    throw new Error(`${documentUrl} does not explicitly allow indexing.`);
  }
}

const sitemapUrl = new URL("sitemap.xml", siteUrl);
const sitemapResponse = await fetchWithRetry(sitemapUrl);
const sitemap = await sitemapResponse.text();
for (const documentUrl of documents.keys()) {
  if (!sitemap.includes(`<loc>${documentUrl}</loc>`)) {
    throw new Error(`${sitemapUrl} does not include ${documentUrl}.`);
  }
}

const verificationUrl = new URL("google51880260da1cd2eb.html", siteUrl);
const verificationResponse = await fetchWithRetry(verificationUrl);
const verificationText = (await verificationResponse.text()).trim();
if (
  verificationText !==
  "google-site-verification: google51880260da1cd2eb.html"
) {
  throw new Error(`${verificationUrl} returned unexpected verification content.`);
}

const assetUrls = new Set();
for (const html of documents.values()) {
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const assetUrl = new URL(match[1], siteUrl);
    if (assetUrl.origin === siteUrl.origin && assetUrl.pathname.includes("/_next/")) {
      assetUrls.add(assetUrl.href);
    }
  }
}

if (![...assetUrls].some((url) => new URL(url).pathname.endsWith(".css"))) {
  throw new Error("The live HTML does not reference a CSS asset.");
}
if (![...assetUrls].some((url) => new URL(url).pathname.endsWith(".js"))) {
  throw new Error("The live HTML does not reference a JavaScript asset.");
}

for (const assetUrl of assetUrls) {
  const response = await fetchWithRetry(assetUrl);
  const contentType = response.headers.get("content-type") ?? "";
  const pathname = new URL(assetUrl).pathname;
  if (pathname.endsWith(".css") && !contentType.includes("text/css")) {
    throw new Error(`${assetUrl} returned unexpected content type: ${contentType}`);
  }
  if (pathname.endsWith(".js") && !/javascript/.test(contentType)) {
    throw new Error(`${assetUrl} returned unexpected content type: ${contentType}`);
  }
  await response.arrayBuffer();
}

console.log(
  `Live site check passed: ${documents.size} HTML pages, sitemap, Google verification, and ${assetUrls.size} static assets${expectedVersion ? ` for ${expectedVersion.slice(0, 12)}` : ""}.`,
);
