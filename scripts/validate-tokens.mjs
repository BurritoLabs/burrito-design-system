import { readFile } from "node:fs/promises";

const css = await readFile(new URL("../src/tokens.css", import.meta.url), "utf8");

const required = [
  "--bui-color-canvas",
  "--bui-color-surface",
  "--bui-color-text",
  "--bui-color-text-muted",
  "--bui-color-brand",
  "--bui-color-focus",
  "--bui-color-success-soft",
  "--bui-chain-lunc",
  "--bui-chain-luna",
  "--bui-chart-1",
  "--bui-chart-grid",
  "--bui-shadow-modal",
  "--bui-duration-normal",
];

for (const token of required) {
  if (!css.includes(token)) throw new Error(`Missing required token ${token}`);
}

if (/--bui-chain-ustc/i.test(css)) {
  throw new Error("USTC is an asset, not a supported Burrito chain token");
}

const brandDefinitions = css.match(/--bui-color-brand:\s*#([0-9a-f]{6})/gi) ?? [];
if (brandDefinitions.length !== 2 || brandDefinitions.some((value) => !value.toLowerCase().endsWith("#52c41a"))) {
  throw new Error("The canonical Burrito brand token must remain #52C41A in both themes");
}

const pairs = [
  ["dark text", "#EAF5EB", "#070D0B", 7],
  ["dark muted", "#82958B", "#070D0B", 4.5],
  ["light text", "#142019", "#F5F8F5", 7],
  ["light muted", "#5E7066", "#F5F8F5", 4.5],
  ["light brand text", "#2F7D0C", "#F5F8F5", 4.5],
  ["dark LUNC text", "#38BDF8", "#070D0B", 4.5],
  ["dark LUNA text", "#F97316", "#070D0B", 4.5],
  ["light LUNC text", "#0277B5", "#F5F8F5", 4.5],
  ["light LUNA text", "#B94700", "#F5F8F5", 4.5],
];

for (const [label, foreground, background, minimum] of pairs) {
  const ratio = contrast(foreground, background);
  if (ratio < minimum) throw new Error(`${label} contrast ${ratio.toFixed(2)} is below ${minimum}`);
}

console.log("Burrito token validation passed");

function contrast(foreground, background) {
  const lighter = Math.max(luminance(foreground), luminance(background));
  const darker = Math.min(luminance(foreground), luminance(background));
  return (lighter + 0.05) / (darker + 0.05);
}

function luminance(hex) {
  const rgb = hex.slice(1).match(/.{2}/g).map((part) => Number.parseInt(part, 16) / 255);
  const linear = rgb.map((value) => (value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4));
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}
