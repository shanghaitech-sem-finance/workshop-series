const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const publicBasePath = configuredBasePath.replace(/\/$/, "");
export const siteOrigin = new URL(configuredSiteUrl).origin;

export function sitePath(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${publicBasePath}${normalizedPath}`;
}

export function absoluteSiteUrl(path: string) {
  return `${siteOrigin}${sitePath(path)}`;
}
