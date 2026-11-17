import apiFetch from "@wordpress/api-fetch";
import { metaFromLookup } from "./imageModel";

const cache = new Map();

/**
 * Resolve a Media Library URL to { attachmentId, alt, width, height } via
 * bigb/v1/attachment-info. Resolves to {} for external URLs or on any error,
 * so callers can always spread the result. Cached per URL for the session.
 */
export const lookupAttachmentMeta = (url) => {
  if (typeof url !== "string" || !/^https?:\/\//i.test(url)) {
    return Promise.resolve({});
  }
  if (!cache.has(url)) {
    cache.set(
      url,
      apiFetch({ path: `/bigb/v1/attachment-info?url=${encodeURIComponent(url)}` })
        .then(metaFromLookup)
        .catch(() => ({})),
    );
  }
  return cache.get(url);
};

const pending = new Map();

/**
 * Debounced lookup for typed URLs: a new call for the same `key` supersedes
 * the previous one (which resolves to {} so its caller does nothing), so
 * typing a URL character by character produces one request, not one per key.
 */
export const lookupAttachmentMetaDebounced = (key, url, delay = 600) =>
  new Promise((resolve) => {
    const prev = pending.get(key);
    if (prev) {
      clearTimeout(prev.timer);
      prev.resolve({});
    }
    const timer = setTimeout(() => {
      pending.delete(key);
      lookupAttachmentMeta(url).then(resolve);
    }, delay);
    pending.set(key, { timer, resolve });
  });
