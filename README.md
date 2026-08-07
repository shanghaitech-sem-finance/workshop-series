# ShanghaiTech SEM Finance Workshop

Official marketing and program archive website for the ShanghaiTech SEM Finance Workshop.

Live site: https://shanghaitech-sem-finance.github.io/workshop-series/

## Current edition

- Date: October 10, 2026
- Theme: Financial Markets in a Changing Information Environment
- Status: Preliminary program coming soon
- Contact: Yapei Zhang, zhangyp3@shanghaitech.edu.cn

## Local development

```bash
npm ci
npm run dev
```

The local website is available at `http://localhost:3000`.

If an embedded browser cannot reach the default loopback listener, use:

```bash
npm run dev:preview
```

This preview-only command listens on `0.0.0.0`; stop it when the review is complete.

## Content structure

- Homepage: `app/page.tsx`
- Homepage content and bilingual copy: `app/components/MarketingHome.tsx`
- Workshop program data: `app/data/workshops.ts`
- Shared annual program layout: `app/components/ProgramPage.tsx`
- Global visual styles: `app/globals.css`

## Updating the contact email

Search for `zhangyp3@shanghaitech.edu.cn` in `app/components/MarketingHome.tsx` and replace both language entries with the new event address.

## Adding the 2026 program

1. Add the 2026 schedule to `app/data/workshops.ts` following the existing `Workshop` shape.
2. Create `app/workshops/2026/page.tsx` using one of the existing annual pages as a model.
3. Replace the homepage `Preliminary program coming soon` message with a link to `/workshops/2026`.
4. Run `npm run build` before publishing.

## GitHub Pages

The workflow in `.github/workflows/deploy-pages.yml` builds and publishes the static site automatically whenever the `main` branch is updated.

In the GitHub repository, open **Settings > Pages** and set **Source** to **GitHub Actions**. The workflow automatically handles the project-site path `/workshop-series/`.

The workflow also verifies every emitted CSS and JavaScript reference before upload and checks the live HTML pages and assets after deployment. The same live check can be run manually with:

```bash
npm run check:live
```

## Search indexing

- Canonical URLs are generated from `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_BASE_PATH`.
- `public/sitemap.xml` lists the homepage and every public workshop program page. Update it whenever a new annual page is published.
- The sitemap is published at https://shanghaitech-sem-finance.github.io/workshop-series/sitemap.xml.
- Google Search Console should use the URL-prefix property `https://shanghaitech-sem-finance.github.io/workshop-series/` because the site is hosted below the shared `github.io` domain.
- Keep `public/google51880260da1cd2eb.html`, the Google ownership-verification file for this property; removing or changing it can invalidate verification.

The GitHub Pages project is hosted below `/workshop-series/`. A standard `robots.txt` applies only at the domain root, so a file at `/workshop-series/robots.txt` would not control crawling. Indexing permission is declared in page metadata instead.
