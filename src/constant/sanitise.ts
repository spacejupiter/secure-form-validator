export const SCRIPT_TAGS = /<script.*?>.*?<\/script>/gi;
export const EVENT_HANDLERS = /on\w+=".*?"/gi;
export const JS_PROTOCOL = /javascript:/gi;
export const SQL_META_CHARS = /['";]/g;
export const HTML_TAGS = /<.*?>/g;
export const ZERO_WIDTH_CHARS = /[\u200B-\u200D\uFEFF]/g;