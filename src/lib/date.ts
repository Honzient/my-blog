/**
 * Shared date formatting utilities.
 * All pages and components import these so date output is always locale-consistent.
 */

export type DateLocale = 'zh' | 'en';

/**
 * Human-readable date string.
 *
 *  - zh full:    2026年7月1日
 *  - zh short:   7月1日
 *  - en full:    July 1, 2026
 *  - en short:   Jul 1
 */
export function formatDate(
  date: Date,
  locale: DateLocale,
  style: 'full' | 'short' = 'full',
): string {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();

  if (locale === 'zh') {
    if (style === 'short') return `${m}月${d}日`;
    return `${y}年${m}月${d}日`;
  }

  return date.toLocaleDateString('en-US', {
    year: style === 'full' ? 'numeric' : undefined,
    month: style === 'short' ? 'short' : 'long',
    day: 'numeric',
  });
}

/** ISO 8601 date string — used in <time datetime="..."> */
export function toISODate(date: Date): string {
  return date.toISOString().split('T')[0];
}
