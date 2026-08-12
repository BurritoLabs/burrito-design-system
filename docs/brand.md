# Burrito brand asset rules

The canonical mark is `brand/icon-1024.png`. The 64 px and 192 px files are delivery assets derived from the same mark. Products must not redraw, recolor, crop, stretch, or add chain colors to it.

## Lockup and clear space

- Use the word `Burrito` exactly. Add a product descriptor such as `Monitor`, `AI`, `Finder`, `Studio`, or `Labs` as a separate, lighter-weight word.
- Primary desktop and mobile headers use a 24 px mark, a 20 px wordmark, and a 6 px gap between the mark and wordmark. Product descriptors use the same 20 px size with a lighter weight.
- Use zero letter spacing for the primary wordmark and product descriptor so the lockup has the same width and rhythm in every product.
- Do not use the compact `20/16` lockup in a primary mobile header. The compact variant is reserved for secondary surfaces where the full header geometry does not apply.
- Preserve clear space around the mark equal to at least one quarter of its rendered width.
- Keep the full lockup at the primary desktop sidebar/header origin. On mobile, keep it at the leading edge and do not place the theme switcher between the mark and product name.

## Mobile header placement

- When the row containing the brand is 56 px tall, use a 16 px leading inset.
- For any other row height, use `(row height - 24 px) / 2` as the leading inset so the mark has equal space above and to its leading edge.
- In a multi-row header, calculate placement from the row containing the brand rather than the total header height.
- Account for the platform safe-area inset before applying the row calculation. Keep page-content padding independent from header-brand placement.

## Tablet header placement

- Use a 56 px primary header row on touch-first phones and tablets, including portrait and landscape iPad layouts up to 1366 CSS pixels.
- The primary row uses a 16 px leading inset with a 24 px mark, 20 px wordmark, and 6 px mark-to-wordmark gap. Do not restore legacy logo compensation on wider mobile layouts.
- Search or product-navigation rows may remain below the primary row when the controls cannot fit safely, but they do not change the 56 px brand-and-actions row.
- Choose mobile, tablet, or desktop navigation from available space and input precision rather than user-agent detection. Touch-first editing tools may present a focused tablet companion instead of a precision desktop editor.

## Delivery assets

- Browser favicon: 64 px PNG or an ICO generated from the same canonical mark.
- PWA icon: 192 px and 512 px or larger square PNG. Use `maskable` only after safe-area testing proves the mark is not clipped.
- Apple/native app icon: derive from the 1024 px source through the platform asset catalog.
- Social previews may include the mark, but a chain accent must never replace the Burrito brand color.

## Navigation shell

- Use `--bui-color-shell-divider` for the primary boundary below a top header and beside a desktop sidebar.
- Draw each boundary once. Do not stack an adjacent border or a directional shadow on top of the divider.
- Product applications may use a sidebar or a top-only header according to their information architecture. Marketing and company websites keep a horizontal website navigation; they should not imitate an application sidebar.
