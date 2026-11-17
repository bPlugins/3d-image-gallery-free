// Loads the plugin's ESM source (which imports WordPress packages) into Node
// without a bundler: strips imports, stubs __(), and re-imports from a temp dir.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(import.meta.dirname, "..");
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "igb-test-"));

export const loadModule = async (relPath, name) => {
  let src = fs.readFileSync(path.join(root, relPath), "utf8");
  src = src.replace(/^import .*?;\s*$/gms, (m) => (m.includes("@wordpress/i18n") ? "const __ = (s) => s;" : ""));
  const out = path.join(tmp, name + ".mjs");
  fs.writeFileSync(out, src);
  return import(pathToFileURL(out).href);
};

export const loadOptions = () => loadModule("src/utils/options.js", "options");
export const loadSwitch = () => loadModule("src/utils/styleSwitch.js", "styleSwitch");
