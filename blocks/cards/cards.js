/**
 * cards — India Uncharted card-grid block (reconstructive, variant-driven).
 *
 * Variants (class on the block): `packages`, `destinations`, `themes`, `blogs`, `tiles`.
 * Schema: one ROW per card; cells map by content (EW1 — authored nodes MOVED, never rebuilt):
 *   - a cell whose only element is a <picture> → .cards-card-image (media layer)
 *   - every other cell → .cards-card-body (title/meta/CTA, kept in author order)
 * For label-overlay variants (destinations/themes) the body holds just the label,
 * layered over the image via CSS. Section head (eyebrow/heading above the grid) is authored
 * as default content and styled via `.cards-container .default-content-wrapper`.
 */
import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const pic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    img.closest('picture').replaceWith(pic);
  });
  block.replaceChildren(ul);
}
