import { defineConfig } from "vite";
import fs from "node:fs";
import path from "node:path";

const SVG_INLINE_RE = /\.svg\?st-inline$/;
const FONT_WEIGHT_REPLACEMENTS = [
  [/font-family="'Roboto-Thin'"/g, 'font-weight="100"'],
  [/font-family="'Roboto-Light'"/g, 'font-weight="300"'],
  [/font-family="'Roboto-Regular'"/g, 'font-weight="400"'],
  [/font-family="'Roboto-Black'"/g, 'font-weight="900"'],
];

const stInlineSvg = () => ({
  name: "st-inline-svg",
  enforce: "pre", // must beat Vite's built-in .svg-as-URL-asset handling
  resolveId(source, importer) {
    if (!SVG_INLINE_RE.test(source)) return null;
    const [filePath] = source.split("?");
    return `${path.resolve(path.dirname(importer), filePath)}?st-inline`;
  },
  load(id) {
    if (!SVG_INLINE_RE.test(id)) return null;
    const [filePath] = id.split("?");
    let svg = fs.readFileSync(filePath, "utf-8");
    FONT_WEIGHT_REPLACEMENTS.forEach(([pattern, replacement]) => {
      svg = svg.replace(pattern, replacement);
    });
    return { code: `export default ${JSON.stringify(svg)}`, moduleType: "js" };
  },
});

export default defineConfig({
  root: "src",
  publicDir: "../public",
  plugins: [stInlineSvg()],
  build: {
    outDir: "../build",
    emptyOutDir: true,
    cssMinify: false, // Lightning CSS (Vite 8 default) can choke on the @-st-frames DSL
  },
  server: { host: "0.0.0.0" },
});
