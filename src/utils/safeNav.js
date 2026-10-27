/**
 * Whether `url` is safe to navigate to or use as an <a href> — i.e. it parses
 * and its scheme is http(s). Gallery item "link" values are free-form strings
 * a Contributor can set (including via the block's Code Editor, which
 * bypasses the URL picker UI), so a `javascript:` URI reaching window.open(),
 * window.location.href, or a rendered <a href> executes in the clicking
 * visitor's browser unless every one of those sinks checks this first.
 *
 * @param {string} url
 * @return {boolean}
 */
export const isSafeHttpUrl = (url) => {
  if (!url || typeof url !== "string") return false;

  try {
    const parsed = new URL(
      url,
      typeof window !== "undefined" ? window.location.href : undefined,
    );
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch (err) {
    return false;
  }
};

/**
 * Navigates the browser to `url` only if its scheme is http(s). See
 * isSafeHttpUrl() above for why this check exists.
 *
 * @param {string} url
 * @return {boolean} Whether navigation was performed.
 */
export const safeNavigate = (url) => {
  if (!isSafeHttpUrl(url)) return false;

  window.location.href = url;
  return true;
};
