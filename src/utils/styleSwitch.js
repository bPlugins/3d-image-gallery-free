/**
 * Non-destructive layout (style) switching — IG-001.
 *
 * The block keeps content in two places depending on the layout:
 *   - styleDefault  -> attributes.gallery[]        (groups; images are URL strings)
 *   - styleOne..Seven -> attributes.imagesData.images[] (image objects)
 *
 * Switching layout used to overwrite both stores with demo data. This module
 * instead computes an *additive* attribute patch:
 *   - existing content is never replaced or removed;
 *   - the store the target layout reads is filled by deriving from the other
 *     store ONLY if it has no content yet;
 *   - the outgoing layout's `styles` are stashed in `layoutStash` and restored
 *     when the user returns to that layout;
 *   - demo data is seeded only when the whole block has no content at all.
 *
 * Pure (no WordPress / React imports) so it can be tested with `node --test`.
 * The demo fixtures live in utils/options.js and are injected by the caller.
 */

export const DEFAULT_STYLE = "styleDefault";

// Item keys that carry user content. They are never filled from demo templates.
const CONTENT_KEYS = [
  "id",
  "url",
  "title",
  "description",
  "alt",
  "link",
  "date",
  "category",
  "albs",
];

// imagesData keys that are demo metadata, not real layout settings.
const DEMO_META_KEYS = ["images", "id", "name", "description"];

const isObj = (v) => v !== null && typeof v === "object" && !Array.isArray(v);
const clone = (v) => (v === undefined ? v : JSON.parse(JSON.stringify(v)));

export const getGroupImages = (group) =>
  (Array.isArray(group?.images) ? group.images : []).filter(
    (u) => typeof u === "string" && u !== "",
  );

export const hasGalleryContent = (gallery) =>
  Array.isArray(gallery) && gallery.some((g) => getGroupImages(g).length > 0);

export const hasImagesDataContent = (imagesData) =>
  Array.isArray(imagesData?.images) &&
  imagesData.images.some((i) => i && typeof i.url === "string" && i.url !== "");

/** Untouched "Title N" shells created by the block default / "New Item". */
const isEmptyShell = (group) =>
  getGroupImages(group).length === 0 &&
  (!group?.title || /^Title \d+$/.test(group.title)) &&
  (!group?.subtitle || /^Subtitle \d+$/.test(group.subtitle));

const nextId = (used, seed) => {
  let n = seed;
  while (used.has(String(n))) n++;
  used.add(String(n));
  return n;
};

/** Give every item a unique id WITHOUT changing ids that already exist. */
const ensureUniqueIds = (items) => {
  const used = new Set();
  const dupes = [];
  items.forEach((it, i) => {
    const key = it?.id === undefined || it?.id === "" ? null : String(it.id);
    if (key === null || used.has(key)) dupes.push(i);
    else used.add(key);
  });
  if (!dupes.length) return items;
  const out = items.map((it) => ({ ...it }));
  let seed = 1;
  dupes.forEach((i) => {
    const id = nextId(used, seed);
    seed = id + 1;
    out[i].id = id;
  });
  return out;
};

/** Default groups -> layout items (one per image URL). */
export const groupsToItems = (gallery, template = {}) => {
  const items = [];
  (Array.isArray(gallery) ? gallery : []).forEach((group) => {
    const urls = getGroupImages(group);
    let n = 0;
    (Array.isArray(group?.images) ? group.images : []).forEach((url, origIdx) => {
      if (typeof url !== "string" || url === "") return;
      const i = n++;
      const meta = group.imageMeta?.[origIdx] || {};
      const item = { ...clone(template) };
      CONTENT_KEYS.forEach((k) => {
        if (k !== "id") delete item[k];
      });
      delete item.id;
      item.url = url;
      item.title =
        urls.length > 1 && group.title
          ? `${group.title} ${i + 1}`
          : group.title || "";
      item.description = group.subtitle || "";
      if (meta.attachmentId) item.attachmentId = meta.attachmentId;
      if (meta.alt !== undefined) item.alt = meta.alt;
      if (meta.decorative) item.decorative = true;
      if (meta.width) item.naturalWidth = meta.width;
      if (meta.height) item.naturalHeight = meta.height;
      if (Array.isArray(group.albs) && group.albs.length) {
        item.albs = [...group.albs];
      }
      items.push(item);
    });
  });
  return ensureUniqueIds(items);
};

const itemMeta = (item) => {
  const m = {};
  if (item.attachmentId) m.attachmentId = item.attachmentId;
  if (typeof item.alt === "string") m.alt = item.alt;
  if (item.decorative) m.decorative = true;
  if (item.naturalWidth) m.width = item.naturalWidth;
  if (item.naturalHeight) m.height = item.naturalHeight;
  return m;
};

/** Layout items -> Default groups (one per image). */
export const itemsToGroups = (images, groupTemplate = {}) =>
  (Array.isArray(images) ? images : [])
    .filter((i) => i && typeof i.url === "string" && i.url !== "")
    .map((item, idx) => ({
      id: idx + 1,
      title: item.title || "",
      subtitle: item.description || item.alt || "",
      images: [item.url],
      colors: clone(groupTemplate.colors) || {
        color: "#fff",
        bgType: "solid",
        bg: "#505a64d9",
      },
      btnColors: clone(groupTemplate.btnColors) || {
        color: "#fff",
        bgType: "solid",
        bg: "#000a1480",
      },
      albs: Array.isArray(item.albs) ? [...item.albs] : [],
      imageMeta: [itemMeta(item)],
    }));

/**
 * Fill layout-specific fields an item is missing for `style`, never touching
 * content keys. A width/height whose *shape* conflicts with the target layout
 * (number vs per-device object) is replaced by the template's layout hint,
 * because the renderer cannot read the other shape.
 */
export const fillLayoutFields = (items, template = {}) =>
  items.map((item) => {
    const out = { ...item };
    Object.keys(template).forEach((k) => {
      if (CONTENT_KEYS.includes(k)) return;
      const tv = template[k];
      if (out[k] === undefined || out[k] === "" || out[k] === null) {
        out[k] = clone(tv);
      } else if (
        (k === "width" || k === "height") &&
        isObj(tv) !== isObj(out[k])
      ) {
        out[k] = clone(tv);
      }
    });
    return out;
  });

/** Small stable signature of a store, used to tell "still exactly what the
 *  switch generated" from "edited by the user since". */
export const sigOf = (v) => {
  const str = JSON.stringify(v ?? null);
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) | 0;
  return String(h >>> 0);
};

const fillExtras = (imagesData, demoImagesData) => {
  const out = { ...imagesData };
  Object.keys(demoImagesData || {}).forEach((k) => {
    if (DEMO_META_KEYS.includes(k)) return;
    if (out[k] === undefined) out[k] = clone(demoImagesData[k]);
  });
  return out;
};

/**
 * @param {Object} attributes current block attributes
 * @param {string} newStyle   target styleSl
 * @param {Object} deps       { styleItems, galleryAttr, getNewItemByStyle }
 * @return {Object} attribute patch for setAttributes() ({} when nothing to do)
 */
export const switchStyle = (attributes = {}, newStyle, deps = {}) => {
  const { styleItems = {}, galleryAttr = [], getNewItemByStyle } = deps;
  const current = attributes.styleSl || DEFAULT_STYLE;
  if (!newStyle || newStyle === current) return {};

  const gallery = Array.isArray(attributes.gallery) ? attributes.gallery : [];
  const imagesData = isObj(attributes.imagesData)
    ? attributes.imagesData
    : { images: [] };
  const stash = isObj(attributes.layoutStash) ? attributes.layoutStash : {};

  const nextStash = { ...stash };
  // Signatures of stores that were GENERATED by a previous switch. A generated
  // store that is still unchanged is just a copy, so it may be refreshed from
  // the layout being left; a store the user edited (or authored) is never touched.
  const sigs = isObj(stash.derivedSig) ? { ...stash.derivedSig } : {};
  nextStash.derivedSig = sigs;
  // Remember the outgoing layout's own styling so switching back restores it.
  if (current !== DEFAULT_STYLE && isObj(attributes.styles)) {
    nextStash[current] = { styles: clone(attributes.styles) };
  }

  const patch = { styleSl: newStyle, layoutStash: nextStash };

  const haveGallery = hasGalleryContent(gallery);
  const haveImages = hasImagesDataContent(imagesData);
  const nothingAnywhere = !haveGallery && !haveImages;

  if (newStyle === DEFAULT_STYLE) {
    patch.styles = {};
    if (nothingAnywhere) {
      if (gallery.length === 0) patch.gallery = clone(galleryAttr);
    } else if (haveImages) {
      const galleryUntouched = Boolean(sigs.gallery) && sigOf(gallery) === sigs.gallery;
      if (!haveGallery || galleryUntouched) {
        const derived = itemsToGroups(
          imagesData.images,
          galleryAttr[0] || undefined,
        );
        const shellsOnly = gallery.every(isEmptyShell);
        if (galleryUntouched || shellsOnly) {
          patch.gallery = derived;
          sigs.gallery = sigOf(derived);
        } else {
          patch.gallery = [...gallery, ...derived];
        }
      }
    }
    // else: groups already hold content — leave `gallery` untouched.
    return patch;
  }

  // Target is one of the imagesData layouts.
  const demo = styleItems[newStyle] || {};
  const template =
    typeof getNewItemByStyle === "function"
      ? getNewItemByStyle(newStyle) || {}
      : {};

  patch.styles = stash[newStyle]?.styles
    ? clone(stash[newStyle].styles)
    : clone(demo.styles) || {};

  if (nothingAnywhere) {
    patch.imagesData = clone(demo.imagesData) || { images: [] };
    return patch;
  }

  const imagesUntouched = Boolean(sigs.imagesData) && sigOf(imagesData) === sigs.imagesData;
  const derive =
    current === DEFAULT_STYLE && haveGallery && (!haveImages || imagesUntouched);

  let images = Array.isArray(imagesData.images) ? imagesData.images : [];
  if (derive) {
    images = groupsToItems(gallery, template);
  } else {
    images = ensureUniqueIds(images);
  }
  images = fillLayoutFields(images, template);

  patch.imagesData = { ...fillExtras(imagesData, demo.imagesData), images };
  if (derive) sigs.imagesData = sigOf(patch.imagesData);
  return patch;
};
