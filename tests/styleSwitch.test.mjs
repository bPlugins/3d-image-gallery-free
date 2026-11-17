import test from "node:test";
import assert from "node:assert/strict";
import { loadOptions, loadSwitch } from "./helpers.mjs";

const opts = await loadOptions();
const { switchStyle } = await loadSwitch();
const deps = { styleItems: opts.styleItems, galleryAttr: opts.galleryAttr, getNewItemByStyle: opts.getNewItemByStyle };
const apply = (a, s) => ({ ...a, ...switchStyle(a, s, deps) });

const def = () => ({
  styleSl: "styleDefault", albums: ["Weddings", "Travel"], styles: {}, imagesData: { images: [] },
  gallery: [
    { id: 1, title: "Paris", subtitle: "Trip", images: ["https://x.test/a.jpg", "https://x.test/b.jpg"], albs: ["Travel"] },
    { title: "Ceremony", subtitle: "", images: ["https://x.test/c.jpg"], albs: ["Weddings"] },
  ],
});
const pol = () => ({
  styleSl: "styleOne", albums: ["Family"], gallery: [], styles: { card: { width: { desktop: "20rem" } } },
  imagesData: { showDate: true, globalDateFormat: "dd/MM/yyyy", images: [
    { id: "7", url: "https://x.test/p1.jpg", title: "Mum", description: "At home", date: "01/02/2020", albs: ["Family"] },
    { id: "8", url: "https://x.test/p2.jpg", title: "Dad", description: "", date: "", albs: [] },
  ] },
});

test("same style is a no-op", () => assert.deepEqual(switchStyle(pol(), "styleOne", deps), {}));

test("Default -> Polaroid -> Default keeps groups identical", () => {
  const s = def();
  const there = apply(s, "styleOne");
  assert.deepEqual(there.imagesData.images.map((i) => i.url), ["https://x.test/a.jpg", "https://x.test/b.jpg", "https://x.test/c.jpg"]);
  assert.deepEqual(there.imagesData.images[2].albs, ["Weddings"]);
  const back = apply(there, "styleDefault");
  assert.deepEqual(back.gallery, s.gallery);
  assert.deepEqual(back.albums, s.albums);
});

test("derived Polaroid items have no demo content and unique ids", () => {
  const there = apply(def(), "styleOne");
  const ids = there.imagesData.images.map((i) => String(i.id));
  assert.equal(new Set(ids).size, ids.length);
  for (const i of there.imagesData.images) assert.ok(!/templates\.bplugins\.com/.test(i.url));
});

test("Polaroid -> Default -> Polaroid restores items, extras and styles", () => {
  const s = pol();
  const d = apply(s, "styleDefault");
  assert.equal(d.gallery.length, 2);
  const back = apply(d, "styleOne");
  const pick = (a) => a.imagesData.images.map((i) => [i.id, i.url, i.title, i.description, i.date, i.albs]);
  assert.deepEqual(pick(back), pick(s));
  assert.equal(back.imagesData.globalDateFormat, "dd/MM/yyyy");
  assert.equal(back.imagesData.showDate, true);
  assert.deepEqual(back.styles, s.styles);
});

test("existing content is never replaced", () => {
  assert.equal(switchStyle({ ...pol(), gallery: def().gallery }, "styleDefault", deps).gallery, undefined);
});

test("empty block still gets demo preview; input not mutated", () => {
  assert.equal(apply({ styleSl: "styleOne", gallery: [], imagesData: { images: [] }, styles: {} }, "styleDefault").gallery.length, 3);
  const a = pol(); const snap = JSON.stringify(a);
  switchStyle(a, "styleDefault", deps);
  assert.equal(JSON.stringify(a), snap);
});

test("edits made in Default are reflected next time you switch to a layout (untouched copy is refreshed)", () => {
  const s = def();
  const pol1 = apply(s, "styleOne");
  const back = apply(pol1, "styleDefault");
  const edited = { ...back, gallery: [...back.gallery, { title: "New", subtitle: "", images: ["https://x.test/NEW.jpg"], albs: [] }] };
  const pol2 = apply(edited, "styleOne");
  assert.ok(pol2.imagesData.images.some((i) => i.url === "https://x.test/NEW.jpg"), "new image visible in Polaroid");
  assert.equal(pol2.imagesData.images.length, 4);
});

test("a layout store the user edited is NOT overwritten by a later switch", () => {
  const s = def();
  let a = apply(s, "styleOne");
  a = { ...a, imagesData: { ...a.imagesData, images: a.imagesData.images.map((i, n) => (n === 0 ? { ...i, title: "My caption" } : i)) } };
  const d = apply(a, "styleDefault");
  const edited = { ...d, gallery: [...d.gallery, { title: "New", subtitle: "", images: ["https://x.test/NEW.jpg"], albs: [] }] };
  const p = apply(edited, "styleOne");
  assert.equal(p.imagesData.images[0].title, "My caption");
  assert.equal(p.imagesData.images.length, 3, "edited store kept as is");
});

test("a Default store derived from layout items refreshes when still untouched", () => {
  const a = { styleSl: "styleOne", albums: [], styles: {}, gallery: [], imagesData: { images: [{ id: "1", url: "https://x.test/1.jpg", title: "One" }] } };
  const d1 = apply(a, "styleDefault");
  assert.equal(d1.gallery.length, 1);
  const p = apply(d1, "styleOne");
  const more = { ...p, imagesData: { ...p.imagesData, images: [...p.imagesData.images, { id: "2", url: "https://x.test/2.jpg", title: "Two" }] } };
  const d2 = apply(more, "styleDefault");
  assert.equal(d2.gallery.length, 2, "untouched derived groups refreshed with the new image");
});

test("authored Default groups are never overwritten from layout items", () => {
  const s = def();
  const p = apply(s, "styleOne");
  const more = { ...p, imagesData: { ...p.imagesData, images: [...p.imagesData.images, { id: "99", url: "https://x.test/p99.jpg", title: "X" }] } };
  const d = apply(more, "styleDefault");
  assert.deepEqual(d.gallery, s.gallery);
});
