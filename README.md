# Burrito Design System

The shared code-first UI foundation for Burrito products. It owns Burrito brand assets, semantic light/dark design tokens, the two supported chain identities, theme persistence, and reusable React primitives.

## Product boundary

- Burrito brand: `#52C41A`
- Terra Classic / LUNC: `#38BDF8`
- Terra / LUNA: `#F97316`
- USTC is an asset, not a chain. It must never be added to the global chain theme or chain switcher.

## Install

```bash
npm install @burritolabs/ui
```

Import tokens once at the application root:

```tsx
import "@burritolabs/ui/tokens.css";
```

Initialize the theme before hydration, then wrap client UI with `BurritoThemeProvider` and render `BurritoThemeToggle` in the product header.

## Governance

- Product code consumes semantic variables such as `--bui-color-surface`; it does not copy palette literals.
- Logo files are consumed from this package or synchronized from this repository. Product repositories do not redraw the mark.
- New colors and spacing values require a token change and contrast validation here first.
- Releases use semantic versions and a changelog. Applications pin a tested version at build time.
- Runtime CDN styling is prohibited; applications bundle the pinned package for availability and reproducibility.

## Visual specifications

- `concepts/monitor-overview-dark.png`
- `concepts/monitor-overview-light.png`

These files define the first production pilot. They are references for visual regression, not shipped UI assets.

