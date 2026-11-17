import test from "node:test";
import assert from "node:assert/strict";
import { loadModule, loadOptions } from "./helpers.mjs";

const m = await loadModule("src/utils/imageModel.js", "imageModel");
const opts = await loadOptions();

const defaultAttrs = () => ({
  styleSl: "styleDefault",
  gallery: [
    { title: "Paris", subtitle: "Trip", images: ["https://x.test/a.jpg", "", "https://x.test/b.jpg"], albs: ["Travel"] },
    { title: "Cake", images: ["https://x.test/c.jpg"] },
  ],
});

test("Default layout: URL strings normalize, blanks skipped, refs point at the right slot", () => {
  const imgs = m.readImages(defaultAttrs());
  assert.deepEqual(imgs.map((i) => i.url), ["https://x.test/a.jpg", "https://x.test/b.jpg", "https://x.test/c.jpg"]);
  assert.deepEqual(imgs[1].ref, { store: "gallery", group: 0, index: 2 });
  assert.deepEqual(imgs[0].albs, ["Travel"]);
  assert.equal(imgs[0].attachmentId, 0);
  assert.equal(imgs[0].decorative, false);
});

test("Default layout: patch writes imageMeta, keeps images as URL strings, does not mutate input", () => {
  const a = defaultAttrs();
  const snap = JSON.stringify(a);
  const ref = m.readImages(a)[1].ref;
  const patch = m.patchImage(a, ref, { alt: "Eiffel", attachmentId: 55, width: 1600, bogus: 1 });
  assert.equal(JSON.stringify(a), snap);
  assert.deepEqual(patch.gallery[0].images, a.gallery[0].images);
  assert.deepEqual(patch.gallery[0].imageMeta[2], { alt: "Eiffel", attachmentId: 55, width: 1600 });
  assert.equal(patch.gallery[1], a.gallery[1], "untouched group is the same object");
  const again = m.readImages({ ...a, ...patch });
  assert.equal(again[1].alt, "Eiffel");
  assert.equal(again[1].attachmentId, 55);
});

test("decorative flag round-trips and resolveAlt honours it", () => {
  const a = defaultAttrs();
  const patch = m.patchImage(a, m.readImages(a)[0].ref, { decorative: true });
  const img = m.readImages({ ...a, ...patch })[0];
  assert.equal(img.decorative, true);
  assert.equal(m.resolveAlt({ decorative: true, alt: "x" }, "Title"), "");
  assert.equal(m.resolveAlt({ alt: "Real" }, "Title"), "Real");
  assert.equal(m.resolveAlt({ alt: "  " }, "Title"), "Title", "blank alt keeps legacy fallback");
  assert.equal(m.resolveAlt(undefined, "Title"), "Title");
  assert.equal(m.resolveAlt({}, undefined), "");
});

test("layout ids are NOT treated as attachment ids", () => {
  const a = { styleSl: "styleOne", imagesData: { images: [{ id: "1", url: "https://x.test/p.jpg" }, { id: "9", attachmentId: 9, url: "https://x.test/q.jpg" }] } };
  const imgs = m.readImages(a);
  assert.equal(imgs[0].attachmentId, 0);
  assert.equal(imgs[1].attachmentId, 9);
});

test("every real demo layout is readable and round-trips a patch without losing fields", () => {
  for (const style of Object.keys(opts.styleItems).filter((s) => s !== "styleDefault")) {
    const a = { styleSl: style, imagesData: JSON.parse(JSON.stringify(opts.styleItems[style].imagesData)) };
    const imgs = m.readImages(a);
    assert.equal(imgs.length, a.imagesData.images.length, style);
    const patch = m.patchImage(a, imgs[0].ref, { alt: "A", attachmentId: 3 });
    const orig = a.imagesData.images[0];
    const next = patch.imagesData.images[0];
    for (const k of Object.keys(orig)) if (k !== "alt") assert.deepEqual(next[k], orig[k], `${style}.${k}`);
    assert.equal(next.alt, "A");
    assert.equal(patch.imagesData.images.length, a.imagesData.images.length);
    for (const k of Object.keys(a.imagesData)) if (k !== "images") assert.deepEqual(patch.imagesData[k], a.imagesData[k]);
  }
});

test("Hexagonal link string + open-in-new-tab map to link object", () => {
  const a = { styleSl: "styleSix", imagesData: { isOpenNewTab: true, images: [{ url: "https://x.test/h.jpg", link: "https://x.test/l", alt: "L" }] } };
  const img = m.readImages(a)[0];
  assert.deepEqual(img.link, { url: "https://x.test/l", target: "_blank" });
  assert.equal(img.alt, "L");
});

test("responsive size hints read from per-device objects and numbers", () => {
  assert.equal(m.normalizeImage({ url: "u", width: { desktop: 800 }, height: 1200 }).width, 800);
  assert.equal(m.normalizeImage({ url: "u", width: { desktop: 800 }, height: 1200 }).height, 1200);
});

test("stale refs return an empty patch", () => {
  assert.deepEqual(m.patchImage(defaultAttrs(), { store: "gallery", group: 9, index: 0 }, { alt: "x" }), {});
  assert.deepEqual(m.patchImage({ imagesData: { images: [] } }, { store: "imagesData", index: 3 }, {}), {});
});

test("realignImageMeta follows URLs when a group list is reordered/removed", () => {
  const meta = m.realignImageMeta(["a", "b", "c"], [{ alt: "A" }, { alt: "B" }, { alt: "C" }], ["c", "a", "new"]);
  assert.deepEqual(meta, [{ alt: "C" }, { alt: "A" }, {}]);
});

test("metaFromMedia keeps attachment id, alt, natural size; ignores junk", () => {
  assert.deepEqual(m.metaFromMedia({ id: 42, alt: "Cat", width: 1600, height: 900, url: "u", sizes: {} }), { attachmentId: 42, alt: "Cat", width: 1600, height: 900 });
  assert.deepEqual(m.metaFromMedia({ id: "abc" }), {});
  assert.deepEqual(m.metaFromLookup({ attachmentId: 0 }), {});
  assert.deepEqual(m.metaFromLookup({ attachmentId: 7, alt: "", width: 10, height: 5 }), { attachmentId: 7, alt: "", width: 10, height: 5 });
});

test("imagesData patch stores natural size separately, never touching layout width/height", () => {
  const a = { styleSl: "styleOne", imagesData: { images: [{ id: "1", url: "u", width: { desktop: 800 }, height: { desktop: 1200 } }] } };
  const p = m.patchImage(a, { store: "imagesData", index: 0 }, { width: 1600, height: 900, attachmentId: 5 });
  const it = p.imagesData.images[0];
  assert.deepEqual(it.width, { desktop: 800 });
  assert.equal(it.naturalWidth, 1600);
  assert.equal(it.attachmentId, 5);
  assert.deepEqual(m.metaToItemFields({ attachmentId: 5, alt: "", width: 3 }), { attachmentId: 5, alt: "", naturalWidth: 3 });
});

test("buildSizes: columns -> vw per breakpoint, span widens, never above 100vw", () => {
  assert.equal(m.buildSizes({ desktop: 3, tablet: 2, mobile: 1 }), "(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 33vw");
  assert.equal(m.buildSizes({ desktop: 4, tablet: 2, mobile: 1 }, 2), "(max-width: 767px) 100vw, (max-width: 1024px) 100vw, 50vw");
  assert.equal(m.buildSizes(undefined), "(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 33vw");
});

test("cssLengthToPx only trusts px/rem/em; unknown units give 0", () => {
  assert.equal(m.cssLengthToPx("18rem"), 288);
  assert.equal(m.cssLengthToPx("300px"), 300);
  assert.equal(m.cssLengthToPx("50%"), 0);
  assert.equal(m.cssLengthToPx("calc(100% - 2rem)"), 0);
  assert.equal(m.cssLengthToPx(undefined), 0);
});

test("responsiveProps returns {} unless the server supplied a srcset for exactly that url", () => {
  const a = { responsive: { "https://s/a.jpg": { srcset: "https://s/a-300.jpg 300w, https://s/a.jpg 1000w" } } };
  assert.deepEqual(m.responsiveProps(a, "https://s/a.jpg", "50vw"), { srcSet: "https://s/a-300.jpg 300w, https://s/a.jpg 1000w", sizes: "50vw" });
  assert.equal(m.responsiveProps(a, "https://s/a.jpg").sizes, "100vw");
  assert.deepEqual(m.responsiveProps(a, "https://other/x.jpg"), {});
  assert.deepEqual(m.responsiveProps({}, "u"), {});
  assert.deepEqual(m.responsiveProps({ responsive: { u: { srcset: "" } } }, "u"), {});
});
