const baseUrl = import.meta.env.BASE_URL || '/';

export function publicAsset(path) {
  const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
  return `${normalizedBaseUrl}${normalizedPath}`;
}
