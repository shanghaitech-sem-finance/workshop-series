import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const outputRoot = new URL("../dist/client/", import.meta.url);
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
const siteOrigin = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
).origin;
const canonicalUrl = (path) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteOrigin}${basePath}${normalizedPath}`;
};
const productionUrl = (path) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `https://shanghaitech-sem-finance.github.io/workshop-series${normalizedPath}`;
};

async function readOutput(path) {
  return readFile(new URL(path, outputRoot), "utf8");
}

test("exports the complete bilingual marketing homepage", async () => {
  const [html, source] = await Promise.all([
    readOutput("index.html"),
    readFile(new URL("../app/components/MarketingHome.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(html, /<title>ShanghaiTech SEM Finance Workshop<\/title>/);
  assert.match(
    html,
    new RegExp(
      `<link rel="canonical" href="${canonicalUrl("/").replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`,
    ),
  );
  assert.match(html, /<meta name="robots" content="index, follow"\/>/);
  assert.match(html, /<meta name="googlebot" content="index, follow"\/>/);
  assert.match(html, /Sunday, October 11, 2026/);
  assert.match(
    html,
    /<span class="hero-title-main">2026 SEM Finance Workshop:<\/span>/,
  );
  assert.match(
    html,
    /<span class="hero-title-theme">Financial Markets in a Changing Information Environment<\/span>/,
  );
  assert.match(
    html,
    /Room 501, School of Entrepreneurship and Management, ShanghaiTech University/,
  );
  assert.match(html, /Financial Markets in a Changing Information Environment/);
  assert.match(html, /Preliminary Program/);
  assert.match(html, /class="schedule-list"/);
  assert.match(html, /Jun Tu/);
  assert.match(html, /Crowd Wisdom in Social Media: Investor Heterogeneity and Stock Returns/);
  assert.match(html, /Data Privacy Gone Wrong: The Financial Fallout of App Misconduct/);
  assert.match(html, /zhangyp3@shanghaitech\.edu\.cn/);
  assert.match(html, /中文/);
  assert.match(
    html,
    /<small class="wordmark-school">School of Entrepreneurship and Management<\/small>/,
  );
  assert.match(html, /<small class="wordmark-event">Finance Workshop Series<\/small>/);
  assert.match(source, /上海科技大学创业与管理学院/);

  const visibleBody = html.match(/<body>([\s\S]*?)<script/)?.[1] ?? "";
  const normalizedVisibleBody = visibleBody.replace(/<!--.*?-->/g, "");
  for (const item of [
    "Sunday, October 11, 2026",
    "Financial Markets in a Changing Information Environment",
    "Preliminary Program",
  ]) {
    assert.equal(visibleBody.split(item).length - 1, 1, `${item} should appear once`);
  }
  assert.doesNotMatch(visibleBody, /About the workshop|A focused gathering for scholars/);
  assert.doesNotMatch(visibleBody, /A focused day of research on financial knowledge/);
  assert.match(normalizedVisibleBody, /2025 Program/);
  assert.match(normalizedVisibleBody, /2024 Program/);
  assert.match(normalizedVisibleBody, /2023 Program/);

  for (const year of ["2023", "2024", "2025"]) {
    assert.match(html, new RegExp(`href="${basePath}/workshops/${year}"`));
  }

  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});

test("exports each historical workshop as a standalone HTML page", async () => {
  const expectedContent = {
    "2023": [
      "2023 SEM Finance Workshop",
      "The Effects of the QSBS Exemption on Entrepreneurship and Innovation",
    ],
    "2024": [
      "2024 SEM Finance Workshop",
      "Sea level rise, collateral constraints, and entrepreneurship",
    ],
    "2025": [
      "2025 SEM Finance Workshop: Household Finance",
      "Digital Transmission of Financial Knowledge",
    ],
  };

  for (const [year, snippets] of Object.entries(expectedContent)) {
    const html = await readOutput(`workshops/${year}.html`);
    assert.match(html, new RegExp(`<title>${year} Program`));
    assert.match(
      html,
      new RegExp(
        `<link rel="canonical" href="${canonicalUrl(`/workshops/${year}`).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`,
      ),
    );
    assert.match(html, /class="schedule-list"/);
    assert.match(html, /中文/);
    assert.match(html, /<dt>Date<\/dt>/);
    assert.match(html, /<dt>Location<\/dt>/);
    assert.match(html, /<dt>Program<\/dt>/);
    assert.doesNotMatch(html, /<dt>Time<\/dt>/);
    assert.doesNotMatch(
      html,
      /The program below has been transcribed from the original workshop material/,
    );

    for (const snippet of snippets) {
      assert.ok(html.includes(snippet), `${year} page is missing: ${snippet}`);
    }
  }

  const html2023 = await readOutput("workshops/2023.html");
  assert.doesNotMatch(html2023, /Workshop participants|Venue note/);

  const workshopData = await readFile(
    new URL("../app/data/workshops.ts", import.meta.url),
    "utf8",
  );
  assert.match(workshopData, /社交媒体中的群体智慧：投资者异质性与股票收益/);
  assert.match(workshopData, /数据隐私失守：应用程序违规行为的金融后果/);
});

test("includes GitHub Pages deployment assets", async () => {
  const [gitignore, sitemap, googleVerification] = await Promise.all([
    readFile(new URL("../.gitignore", import.meta.url), "utf8"),
    readOutput("sitemap.xml"),
    readOutput("google51880260da1cd2eb.html"),
  ]);

  await Promise.all([
    access(new URL("og.png", outputRoot)),
    access(new URL("404.html", outputRoot)),
    access(new URL("../.github/workflows/deploy-pages.yml", import.meta.url)),
    access(new URL("../public/.nojekyll", import.meta.url)),
  ]);

  assert.match(gitignore, /^\/REQUIREMENTS\.md$/m);
  assert.match(
    gitignore,
    /^\/6\. ShanghaiTech_SEM_Finance_Workshop_Programs\.pdf$/m,
  );

  for (const path of [
    "/",
    "/workshops/2023",
    "/workshops/2024",
    "/workshops/2025",
  ]) {
    assert.match(sitemap, new RegExp(`<loc>${productionUrl(path)}</loc>`));
  }
  assert.doesNotMatch(sitemap, /localhost/);
  assert.equal(
    googleVerification.trim(),
    "google-site-verification: google51880260da1cd2eb.html",
  );
});

test("preserves approved typography and homepage spacing", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  const titleRule = css.match(/\.home-page \.hero h1\s*\{([^}]*)\}/)?.[1] ?? "";
  assert.match(titleRule, /max-width:\s*1200px/);

  const factsStart = css.indexOf(".home-page .event-facts {");
  const mobileStart = css.indexOf("@media (max-width: 900px)", factsStart);
  const desktopFacts = css.slice(factsStart, mobileStart);
  assert.match(
    desktopFacts,
    /grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/,
  );
  assert.match(
    desktopFacts,
    /\.home-page \.event-facts div\s*\{[^}]*padding:\s*22px 26px/s,
  );
  assert.doesNotMatch(
    desktopFacts,
    /\.home-page \.event-facts div:first-child\s*\{/,
  );

  const fontSizesFor = (selector) => {
    const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return [...css.matchAll(new RegExp(`${escapedSelector}\\s*\\{([^}]*)\\}`, "g"))]
      .map((match) => match[1].match(/font-size:\s*([^;]+);/)?.[1])
      .filter(Boolean);
  };

  assert.deepEqual(fontSizesFor(".discussant strong"), fontSizesFor(".schedule-row h3"));
});
