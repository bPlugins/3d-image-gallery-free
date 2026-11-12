/**
 * Strips any literal "<" from CSS before it goes into a <style> tag through
 * dangerouslySetInnerHTML. The CSS is built from block attribute values, so a
 * value containing "</style>" would otherwise close the tag and inject markup.
 * CSS never needs "<".
 */
export const sanitizeStyleTag = (css) => String(css ?? '').replace(/</g, '');
export const safeStyleHtml = (obj) => ({ __html: sanitizeStyleTag(obj && obj.__html) });
export default sanitizeStyleTag;
