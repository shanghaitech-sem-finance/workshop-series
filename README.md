# ShanghaiTech SEM Finance Workshop

Official marketing and program archive website for the ShanghaiTech SEM Finance Workshop.

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
