/**
 * page-banner — India Uncharted inner-page title banner (template-slotted).
 *
 * Authored shape (two rows, EW1 — authored nodes MOVED, never rebuilt):
 *   row 1: a <picture> (the background photo)
 *   row 2: the page <h1> (the single page title; <h2> also accepted)
 * decorate() moves the picture into a .page-banner-bg layer and the heading
 * into a .page-banner-title layer; CSS draws the brown overlay + centered
 * Playfair title. Values lifted from canon.css .iu-pagebanner*.
 * @param {Element} block The page-banner block element
 */
export default function decorate(block) {
  const bg = document.createElement('div');
  bg.className = 'page-banner-bg';
  const title = document.createElement('div');
  title.className = 'page-banner-title';

  const picture = block.querySelector('picture');
  if (picture) bg.append(picture);
  block.querySelectorAll('h1, h2').forEach((h) => title.append(h));

  block.replaceChildren(bg, title);
}
