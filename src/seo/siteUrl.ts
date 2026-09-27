const PLACEHOLDER_HOST =
  /(^localhost$)|(^127\.)|(^0\.0\.0\.0$)|(^\[?::1\]?$)|\.(local|localhost|test|example|invalid|internal)$|(^|\.)example\.(com|org|net)$/i;

/** Returns why a VITE_SITE_URL value must not ship to production, or null when it looks real. */
export function getSiteUrlProblem(value: string | undefined): string | null {
  const url = (value ?? '').trim();

  if (!url) {
    return 'VITE_SITE_URL is missing or empty';
  }

  let parsed: URL;

  try {
    parsed = new URL(url);
  } catch {
    return `VITE_SITE_URL "${url}" is not a valid URL`;
  }

  if (PLACEHOLDER_HOST.test(parsed.hostname)) {
    return `VITE_SITE_URL "${url}" is a placeholder or local host`;
  }

  if (parsed.protocol !== 'https:') {
    return `VITE_SITE_URL "${url}" must use https`;
  }

  if (parsed.pathname !== '/' || parsed.search || parsed.hash) {
    return `VITE_SITE_URL "${url}" must be an origin only (no path, query or hash)`;
  }

  return null;
}
