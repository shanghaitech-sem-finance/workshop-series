const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const publicBasePath = configuredBasePath.replace(/\/$/, "");

export function sitePath(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${publicBasePath}${normalizedPath}`;
}
