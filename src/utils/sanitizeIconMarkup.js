/**
 * Allowlist-sanitizes a stored icon markup string (play buttons, step
 * markers, hotspot icons, etc.) before it is rendered via
 * dangerouslySetInnerHTML.
 *
 * These attributes are free-form strings — reachable through the block's
 * Code Editor (or a direct REST call) regardless of which icon picker UI a
 * block ships — so a saved value isn't limited to what that picker would
 * ever produce. This parses the string as HTML/SVG and rebuilds it keeping
 * only a small allowlist of SVG structural tags and presentational
 * attributes, dropping everything else (script tags, event handler
 * attributes, foreignObject, etc.) so no payload can survive.
 */
const ALLOWED_TAGS = new Set([
  'svg', 'path', 'g', 'circle', 'rect', 'line', 'polyline', 'polygon',
  'ellipse', 'defs', 'lineargradient', 'radialgradient', 'stop', 'use',
  'title', 'desc',
]);

const ALLOWED_ATTRS = new Set([
  'viewbox', 'width', 'height', 'fill', 'stroke', 'stroke-width',
  'stroke-linecap', 'stroke-linejoin', 'd', 'cx', 'cy', 'r', 'rx', 'ry',
  'x', 'y', 'x1', 'y1', 'x2', 'y2', 'points', 'class', 'fill-rule',
  'clip-rule', 'xmlns', 'id', 'offset', 'stop-color', 'stop-opacity',
  'gradienttransform', 'gradientunits', 'opacity', 'transform',
]);

const sanitizeNode = (sourceNode, doc) => {
  const out = [];
  sourceNode.childNodes.forEach((child) => {
    if (child.nodeType === Node.TEXT_NODE) {
      out.push(doc.createTextNode(child.textContent));
      return;
    }
    if (child.nodeType !== Node.ELEMENT_NODE) {
      // Comments, processing instructions, etc. - drop entirely.
      return;
    }
    const tag = child.tagName.toLowerCase();
    const sanitizedChildren = sanitizeNode(child, doc);
    if (!ALLOWED_TAGS.has(tag)) {
      // Disallowed tag (script, foreignObject, image, ...): drop it and
      // its contents entirely - unlike inline text formatting, an icon's
      // sub-elements only make sense inside their original tag.
      return;
    }
    const clean = doc.createElementNS('http://www.w3.org/2000/svg', tag);
    Array.from(child.attributes || []).forEach((attr) => {
      const name = attr.name.toLowerCase();
      if (ALLOWED_ATTRS.has(name) && !/^on/i.test(name)) {
        clean.setAttribute(attr.name, attr.value);
      }
    });
    sanitizedChildren.forEach((n) => clean.appendChild(n));
    out.push(clean);
  });
  return out;
};

const copyAllowedAttrs = (from, to) => {
  Array.from(from.attributes || []).forEach((attr) => {
    const name = attr.name.toLowerCase();
    if (ALLOWED_ATTRS.has(name) && !/^on/i.test(name)) {
      to.setAttribute(attr.name, attr.value);
    }
  });
};

export const sanitizeIconMarkup = (html) => {
  if (!html) return '';
  if (typeof window === 'undefined' || typeof DOMParser === 'undefined') {
    // No DOM available (shouldn't happen in view.js/Edit.js, but fail safe).
    return '';
  }
  const parsed = new DOMParser().parseFromString(String(html), 'image/svg+xml');
  const wrapper = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  if (!parsed.querySelector('parsererror') && parsed.documentElement?.tagName?.toLowerCase() === 'svg') {
    // Valid standalone <svg>...</svg> - keep the root's own attributes
    // (viewBox/width/height) in addition to sanitizing its children, so
    // icon sizing/scaling keeps working.
    copyAllowedAttrs(parsed.documentElement, wrapper);
    sanitizeNode(parsed.documentElement, document).forEach((n) => wrapper.appendChild(n));
    // outerHTML, not innerHTML: the wrapper is the <svg> that carries the
    // root's viewBox and size, and without it the shapes are left bare and
    // nothing is drawn.
    return wrapper.outerHTML;
  }

  // Not a standalone <svg> root (e.g. a bare <path> fragment with no <svg>
  // wrapper) - fall back to HTML parsing, which is lenient about fragments.
  const htmlParsed = new DOMParser().parseFromString(String(html), 'text/html');
  sanitizeNode(htmlParsed.body, document).forEach((n) => wrapper.appendChild(n));
  return wrapper.innerHTML;
};

export default sanitizeIconMarkup;
