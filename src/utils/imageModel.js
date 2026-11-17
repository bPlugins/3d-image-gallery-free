/**
 * Unified image model + legacy adapter — IG-002 / IG-003.
 *
 * Read side: `readImages(attributes)` returns one normalized list for ANY
 * layout, each entry carrying a `ref` pointing at where it lives.
 * Write side: `patchImage(attributes, ref, changes)` returns a setAttributes()
 * patch that writes the change back in the layout's ORIGINAL shape:
 *   - imagesData layouts: fields are set on the item object.
 *   - Default layout: `gallery[g].images` stays an array of URL strings (old
 *     readers keep working); extra data goes in an optional parallel array
 *     `gallery[g].imageMeta[i] = { attachmentId, alt, width, height }`.
 * Nothing is rewritten on load; only explicit edits produce patches.
 *
 * Pure (no WordPress imports) so it is testable with `node --test`.
 */

const isObj = (v) => v !== null && typeof v === "object" && !Array.isArray(v);
const str = (v) => (typeof v === "string" ? v : "");
const posInt = (v) => {
  const n = typeof v === "string" && /^\d+$/.test(v) ? Number(v) : v;
  return Number.isInteger(n) && n > 0 ? n : 0;
};
const num = (v) => {
  if (isObj(v)) return num(v.desktop);
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : 0;
};

/** Normalize a URL string or image object into the unified shape. */
export const normalizeImage = (raw, meta = {}) => {
  const o = isObj(raw) ? raw : { url: raw };
  const m = isObj(meta) ? meta : {};
  const link = isObj(o.link)
    ? { url: str(o.link.url), target: o.link.target || "_self" }
    : { url: str(o.link), target: o.isOpenNewTab ? "_blank" : "_self" };
  return {
    id: o.id ?? null,
    // Only an explicit field is trusted: layout `id`s are item ids (often the
    // demo "1","2",…), not necessarily Media Library attachment ids.
    attachmentId: posInt(o.attachmentId ?? m.attachmentId),
    url: str(o.url),
    alt: str(m.alt ?? o.alt),
    // An empty `alt` normally means "not written yet" (the renderers then
    // fall back to the title). Intentionally empty alt is an explicit flag.
    decorative: Boolean(m.decorative ?? o.decorative),
    title: str(o.title),
    description: str(o.description),
    caption: str(o.caption || o.description),
    width: num(m.width ?? o.naturalWidth ?? o.width),
    height: num(m.height ?? o.naturalHeight ?? o.height),
    link,
    albs: Array.isArray(o.albs) ? o.albs.filter((a) => typeof a === "string") : [],
    tags: Array.isArray(o.tags) ? o.tags.filter((t) => typeof t === "string") : [],
    date: str(o.date),
  };
};

/** Every image of the active layout, normalized, with write-back refs. */
export const readImages = (attributes = {}) => {
  const style = attributes.styleSl || "styleDefault";
  const out = [];

  if (style === "styleDefault") {
    (Array.isArray(attributes.gallery) ? attributes.gallery : []).forEach(
      (group, g) => {
        const urls = Array.isArray(group?.images) ? group.images : [];
        urls.forEach((url, i) => {
          if (typeof url !== "string" || url === "") return;
          const meta = group.imageMeta?.[i];
          const img = normalizeImage(
            { url, albs: group.albs, title: group.title, description: group.subtitle },
            meta,
          );
          // Group title/subtitle are group data, not this image's own fields.
          img.title = "";
          img.description = "";
          img.caption = "";
          out.push({ ...img, ref: { store: "gallery", group: g, index: i } });
        });
      },
    );
    return out;
  }

  const items = Array.isArray(attributes.imagesData?.images)
    ? attributes.imagesData.images
    : [];
  items.forEach((item, index) => {
    if (!item || typeof item.url !== "string" || item.url === "") return;
    const img = normalizeImage({
      ...item,
      isOpenNewTab: attributes.imagesData?.isOpenNewTab,
    });
    out.push({ ...img, ref: { store: "imagesData", index } });
  });
  return out;
};

const WRITABLE = ["attachmentId", "alt", "decorative", "width", "height"];

/**
 * Patch one image in its original storage shape. `changes` may include
 * attachmentId, alt, width, height (and, for imagesData layouts, title,
 * description, link-string). Unknown keys are ignored. Returns {} if the
 * ref is stale.
 */
export const patchImage = (attributes = {}, ref, changes = {}) => {
  if (!ref) return {};

  if (ref.store === "gallery") {
    const gallery = Array.isArray(attributes.gallery) ? attributes.gallery : [];
    const group = gallery[ref.group];
    if (!group || typeof group.images?.[ref.index] !== "string") return {};
    const meta = Array.isArray(group.imageMeta) ? [...group.imageMeta] : [];
    while (meta.length < group.images.length) meta.push({});
    const next = { ...(meta[ref.index] || {}) };
    WRITABLE.forEach((k) => {
      if (changes[k] !== undefined) next[k] = changes[k];
    });
    meta[ref.index] = next;
    const newGroup = { ...group, imageMeta: meta };
    return {
      gallery: gallery.map((g, i) => (i === ref.group ? newGroup : g)),
    };
  }

  if (ref.store === "imagesData") {
    const images = Array.isArray(attributes.imagesData?.images)
      ? attributes.imagesData.images
      : [];
    if (!images[ref.index]) return {};
    const item = { ...images[ref.index] };
    ["attachmentId", "alt", "decorative", "title", "description"].forEach((k) => {
      if (changes[k] !== undefined) item[k] = changes[k];
    });
    // `width`/`height` on these items are per-device layout hints; the
    // image's natural size is stored separately.
    if (changes.width !== undefined) item.naturalWidth = changes.width;
    if (changes.height !== undefined) item.naturalHeight = changes.height;
    return {
      imagesData: {
        ...attributes.imagesData,
        images: images.map((it, i) => (i === ref.index ? item : it)),
      },
    };
  }
  return {};
};

/**
 * Keep `imageMeta` aligned when a group's URL list is edited positionally.
 * Call with the old and new `images` arrays; returns the realigned meta.
 */
export const realignImageMeta = (oldImages = [], oldMeta = [], newImages = []) => {
  const pool = new Map();
  oldImages.forEach((u, i) => {
    if (oldMeta?.[i] && !pool.has(u)) pool.set(u, oldMeta[i]);
  });
  return newImages.map((u) => pool.get(u) || {});
};

/** Metadata we keep from a Media Library selection (MediaUpload onSelect). */
export const metaFromMedia = (media) => {
  const m = isObj(media) ? media : {};
  const out = {};
  const id = posInt(m.id);
  if (id) out.attachmentId = id;
  if (typeof m.alt === "string") out.alt = m.alt;
  const w = num(m.width ?? m.media_details?.width);
  const h = num(m.height ?? m.media_details?.height);
  if (w) out.width = w;
  if (h) out.height = h;
  return out;
};

/** Same, from the bigb/v1/attachment-info response ({attachmentId:0} => {}). */
export const metaFromLookup = (info) =>
  info && posInt(info.attachmentId)
    ? metaFromMedia({
        id: info.attachmentId,
        alt: info.alt,
        width: info.width,
        height: info.height,
      })
    : {};

/** Meta -> fields stored on an imagesData item (`width`/`height` there are
 *  layout hints, so natural size is stored separately). */
export const metaToItemFields = (meta = {}) => {
  const f = {};
  if (meta.attachmentId) f.attachmentId = meta.attachmentId;
  if (meta.alt !== undefined) f.alt = meta.alt;
  if (meta.width) f.naturalWidth = meta.width;
  if (meta.height) f.naturalHeight = meta.height;
  return f;
};

/**
 * The alt attribute to render for an image-like object ({alt, decorative}).
 * decorative => "" (screen readers skip it); a written alt wins; otherwise
 * `fallback` (the layouts' previous behaviour, e.g. the title).
 */
export const resolveAlt = (item, fallback = "") => {
  if (item && item.decorative) return "";
  if (item && typeof item.alt === "string" && item.alt.trim() !== "") return item.alt;
  return fallback || "";
};

/**
 * `sizes` for a CSS-grid layout: each item takes 1/columns of the viewport
 * (per breakpoint). `span` widens it for items covering several columns.
 * Over-estimating is safe (a slightly larger file); under-estimating blurs.
 */
export const buildSizes = (columns = {}, span = 1) => {
  const vw = (cols) =>
    Math.min(100, Math.round((100 / Math.max(1, Number(cols) || 1)) * Math.max(1, Number(span) || 1)));
  return `(max-width: 767px) ${vw(columns?.mobile || 1)}vw, (max-width: 1024px) ${vw(columns?.tablet || 2)}vw, ${vw(columns?.desktop || 3)}vw`;
};

/** "18rem" / "300px" -> px number, or 0 when it cannot be known (%, calc, auto…). */
export const cssLengthToPx = (value) => {
  const m = /^\s*(\d+(?:\.\d+)?)\s*(px|rem|em)\s*$/i.exec(String(value ?? ""));
  if (!m) return 0;
  const n = parseFloat(m[1]);
  return Math.round(/px/i.test(m[2]) ? n : n * 16);
};

/**
 * { srcSet, sizes } for an <img>, or {} when the server found no srcset for
 * this url (external image, cropped size, …) — spread it straight into <img>.
 */
export const responsiveProps = (attributes, url, sizes) => {
  const r = attributes?.responsive?.[url];
  if (!r || typeof r.srcset !== "string" || r.srcset === "") return {};
  return { srcSet: r.srcset, sizes: sizes || "100vw" };
};
