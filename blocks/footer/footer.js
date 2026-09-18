import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer (India Uncharted — dark footer, column grid + bar)
 *
 * Authored /footer sections (default content):
 *   1. brand blurb + logo link       → .footer-grid column
 *   2. Get In Touch (h4 + contacts)   → .footer-grid column
 *   3. Quick Links (h4 + ul)          → .footer-grid column
 *   4. copyright line                 → .footer-bar (full-width bottom bar)
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  // last section becomes the bottom bar; the rest form the column grid
  const cols = [...footer.children];
  const bar = cols.length > 1 ? cols.pop() : null;
  const grid = document.createElement('div');
  grid.className = 'footer-grid';
  cols.forEach((c) => { c.classList.add('footer-col'); grid.append(c); });
  footer.prepend(grid);
  if (bar) bar.classList.add('footer-bar');

  block.append(footer);
}
