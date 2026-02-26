export function normalizeInternalURL(url: string): string {
  const normalizedURL = url
    .replace('https://www.exyukanali.tv', 'https://exyukanali.tv')
    .replace('http://www.exyukanali.tv', 'https://exyukanali.tv')
    .replace('http://exyukanali.tv', 'https://exyukanali.tv');

  const parsed = new URL(normalizedURL);
  const lastSegment = parsed.pathname.split('/').pop() ?? '';
  const isFilePath = /\.[a-z0-9]+$/i.test(lastSegment);

  if (!isFilePath && !parsed.pathname.endsWith('/')) {
    parsed.pathname = `${parsed.pathname}/`;
  }

  return parsed.toString();
}
