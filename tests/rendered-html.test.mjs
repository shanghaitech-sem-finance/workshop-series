import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const outputRoot = new URL("../dist/client/", import.meta.url);

async function readOutput(path) {
  return readFile(new URL(path, outputRoot), "utf8");
}

test("exports the complete bilingual marketing homepage", async () => {
  const [html, source] = await Promise.all([
    readOutput("index.html"),
    readFile(new URL("../app/components/MarketingHome.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(html, /<title>ShanghaiTech SEM Finance Workshop<\/title>/);
  assert.match(html, /Saturday, October 10, 2026/);
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
  assert.match(html, /Preliminary program coming soon/);
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
    "Saturday, October 10, 2026",
    "Financial Markets in a Changing Information Environment",
    "Preliminary program coming soon",
  ]) {
    assert.equal(visibleBody.split(item).length - 1, 1, `${item} should appear once`);
  }
  assert.doesNotMatch(visibleBody, /About the workshop|A focused gathering for scholars/);
  assert.doesNotMatch(visibleBody, /A focused day of research on financial knowledge/);
  assert.match(normalizedVisibleBody, /2025 Program/);
  assert.match(normalizedVisibleBody, /2024 Program/);
  assert.match(normalizedVisibleBody, /2023 Program/);

  for (const year of ["2023", "2024", "2025"]) {
    assert.match(html, new RegExp(`href="/workshops/${year}"`));
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
});

test("includes GitHub Pages deployment assets", async () => {
  await Promise.all([
    access(new URL("og.png", outputRoot)),
    access(new URL("404.html", outputRoot)),
    access(new URL("../.github/workflows/deploy-pages.yml", import.meta.url)),
    access(new URL("../public/.nojekyll", import.meta.url)),
  ]);
});
