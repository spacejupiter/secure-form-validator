import { SCRIPT_TAGS, EVENT_HANDLERS, JS_PROTOCOL, SQL_META_CHARS, HTML_TAGS, ZERO_WIDTH_CHARS } from '../constant/sanitise';

export const sanitizeInput = (value: any): string => {
  if (typeof value !== 'string') return value;
  return value
    .trim()
    .replace(SCRIPT_TAGS, '') // Remove script tags
    .replace(EVENT_HANDLERS, '') // Remove inline event handlers
    .replace(JS_PROTOCOL, '') // Remove JS URLs
    .replace(SQL_META_CHARS, '') // Strip SQL-sensitive characters
    .replace(HTML_TAGS, '') // Remove all HTML tags
    .replace(ZERO_WIDTH_CHARS, ''); // Remove zero-width chars
};
