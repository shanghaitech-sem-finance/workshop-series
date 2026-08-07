# ShanghaiTech SEM Finance Workshop Website

## Purpose and ownership

This repository contains the official marketing site and HTML program archive for the ShanghaiTech School of Entrepreneurship and Management Finance Workshop Series.

- Live site: https://shanghaitech-sem-finance.github.io/workshop-series/
- GitHub organization: `shanghaitech-sem-finance`
- Repository: `shanghaitech-sem-finance/workshop-series`
- Hosting: GitHub Pages, deployed from `main` by GitHub Actions

Read `README.md` for the basic development and content-update workflow.

## Confirmed current-edition content

Do not change these details unless the organizer supplies replacements:

- Edition: 2026
- Date: Saturday, October 10, 2026
- Topic: Financial Markets in a Changing Information Environment
- Location: Room 501, School of Entrepreneurship and Management, ShanghaiTech University
- Status: Preliminary program coming soon
- Contact: Yapei Zhang / 张亚佩
- Temporary contact email: `zhangyp3@shanghaitech.edu.cn`

Replace the temporary contact email when the event-specific address is provided.

## Product and design rules

- English is the default language; retain the Chinese toggle.
- Keep the site concise, formal, academic, and professional. The HEC Paris Entrepreneurship Workshop site is a structural reference, not a source to copy.
- Do not add submissions, registration, accounts, a CMS, or other product features unless explicitly requested.
- Do not add an About/Overview section or summaries/annotations for previous workshops.
- Header wording is `School of Entrepreneurship and Management` and `Finance Workshop Series` (Chinese: `金融系列研讨会`).
- The homepage current-edition heading separates the main title from the smaller gray topic. Its desktop maximum width is 1200px; narrow screens wrap naturally.
- The three homepage fact columns are Date, Location, and Program, with equal left padding on desktop.
- Previous workshop links open consistently formatted HTML pages, not PDFs.
- Annual pages use Date, Location, and Program; do not add a separate Time field.
- Do not add transcription disclaimers. Discussant names use the same font size as presenter names.
- The 2023 page must not include workshop participants or the venue note.

## Code map

- Homepage route: `app/page.tsx`
- Bilingual homepage content: `app/components/MarketingHome.tsx`
- Shared header: `app/components/SiteHeader.tsx`
- Workshop data: `app/data/workshops.ts`
- Shared annual-program layout: `app/components/ProgramPage.tsx`
- Annual routes: `app/workshops/<year>/page.tsx`
- Global styles: `app/globals.css`
- Site metadata and social preview: `app/layout.tsx` and `public/og.png`
- Base-path helper: `app/lib/site-path.ts`
- Deployment workflow: `.github/workflows/deploy-pages.yml`

`workshopYears` in `app/data/workshops.ts` controls the previous-workshop list. A newly published current-edition page does not automatically need to be added to that list until it becomes a previous edition.

## Common maintenance tasks

### Update the contact email

Search for `zhangyp3@shanghaitech.edu.cn`, update both language entries in `MarketingHome.tsx`, and update the documentation if the address becomes permanent.

### Publish the 2026 program

1. Transcribe only organizer-confirmed information into the `Workshop` structure in `app/data/workshops.ts`.
2. Add `app/workshops/2026/page.tsx` using an existing annual route as the model.
3. Turn the homepage Program status into a link to `/workshops/2026` while preserving both languages.
4. Keep 2026 out of the Previous Workshop Programs list until it is a past edition unless the organizer requests otherwise.

### Add a future edition

Update the bilingual homepage copy, footer year, metadata, social-preview text/image if needed, workshop data, and the previous-edition list. Preserve the established page structure and styling unless a redesign is explicitly requested.

## Publishing and verification

Before every push, run:

```bash
npm test
npm run lint
```

A push to `main` triggers `.github/workflows/deploy-pages.yml`. The workflow sets the GitHub Pages base path and runs `scripts/prepare-pages-assets.mjs`, which copies nested `_next` assets to the artifact root and verifies every CSS and JavaScript reference. Do not remove the `Place static assets at the Pages artifact root` step: without it, HTML loads but CSS and JavaScript return 404.

After deployment, the workflow runs `scripts/check-live-site.mjs` to verify the homepage, linked annual pages, and all emitted CSS and JavaScript URLs. Run `npm run check:live` manually when diagnosing a live-site report. If a browser shows a previous version immediately after deployment, use a hard refresh before diagnosing a regression.

## Known pitfalls and their established fixes

- **Live page has content but no styling:** this is a GitHub Pages base-path artifact problem, not a CSS-design problem. Run `npm run prepare:pages` against a base-path build or inspect the `Place static assets at the Pages artifact root` workflow step. `npm test` includes a base-path build and referenced-asset regression check.
- **Embedded browser says localhost refused the connection:** run `npm run dev:preview` instead of editing `vite.config.ts`. It sets the preview-only host through `WORKSHOP_PREVIEW_HOST`; stop the long-running process after review.
- **Windows prints `UV_HANDLE_CLOSING` after an otherwise complete vinext build:** `scripts/test.mjs` retries a failed Windows build once after a short cleanup delay. Do not manually loop through unrelated fixes; if the scripted retry also fails, investigate the persistent build error.
- **A successful deployment still shows an old layout:** first hard-refresh the browser. Then run `npm run check:live` to distinguish browser/CDN cache from missing live assets.
- **GitHub Pages is not enabled in a new repository:** set Repository Settings > Pages > Source to GitHub Actions once, then rerun the workflow.

## Repository hygiene

- The original program PDF and `REQUIREMENTS.md` are local source/planning materials and are intentionally ignored by Git.
- Do not publish source PDFs unless the organizer explicitly asks; the public archive is HTML-first.
- Do not commit build output, dependencies, temporary preview configuration, or local credentials.
- Preserve unrelated user changes and stage only files needed for the requested update.
- Avoid broad visual or content changes without showing a local preview and receiving approval first.
