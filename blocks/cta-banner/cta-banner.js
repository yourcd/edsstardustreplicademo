/**
 * cta-banner — India Uncharted full-bleed photo CTA band (template-slotted).
 *
 * The background photo + brown overlay are drawn in CSS. Authored content
 * (all MOVED, never rebuilt — EW1):
 *   a single row/cell holding the white Playfair <h2> + a coral pill CTA
 *   (a p.button-wrapper > a.button.primary, auto-classed before decorate runs).
 * Values lifted from home.css .ctabanner*.
 *
 * @param {Element} block The cta-banner block element
 */
export default function decorate(block) {
  const inner = document.createElement('div');
  inner.className = 'cta-banner-inner';
  [...block.children].forEach((row) => {
    [...row.children].forEach((cell) => {
      while (cell.firstElementChild) inner.append(cell.firstElementChild);
    });
  });
  block.replaceChildren(inner);
}
