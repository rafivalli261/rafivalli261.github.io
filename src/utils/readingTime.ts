export function calculateReadingTime(body: string): number {
  const wordsPerMinute = 200;
  const wordCount = body.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}
