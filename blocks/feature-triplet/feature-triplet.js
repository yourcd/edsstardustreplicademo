/**
 * feature-triplet — India Uncharted "Find Travel Perfection" feature cards.
 *
 * Authored shape (one ROW per feature, EW1 — authored nodes MOVED, never rebuilt):
 *   each row = one cell holding an icon glyph <span> + <h4> + <p>.
 * The section title + lede sit ABOVE as default content (styled via
 * .feature-triplet-container .default-content-wrapper). Values lifted from
 * home.css .perfection and .feature rules.
 *
 * @param {Element} block The feature-triplet block element
 */
export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.className = 'feature-triplet-item';
    [...row.children].forEach((cell) => {
      cell.className = 'feature-triplet-body';
      const icon = cell.querySelector('span');
      if (icon) icon.classList.add('feature-triplet-icon');
    });
  });
}
