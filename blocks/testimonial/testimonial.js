/**
 * testimonial — India Uncharted centered quote card on a photo band.
 *
 * The background photo is a CSS background on the block (the live
 * testimonial-background image). Authored content (all MOVED, never rebuilt — EW1):
 *   a single row/cell holding <h3> quote title + <p> body + a star row (<p>) +
 *   an author line (<p>). decorate() lifts the authored nodes into a centered
 *   white card, prepends a decorative big quote mark, and tags the star/author
 *   lines. Values lifted from home.css .testi*.
 *
 * @param {Element} block The testimonial block element
 */
export default function decorate(block) {
  const card = document.createElement('div');
  card.className = 'testimonial-card';

  const quote = document.createElement('div');
  quote.className = 'testimonial-quote';
  quote.setAttribute('aria-hidden', 'true');
  quote.textContent = '“';
  card.append(quote);

  const paras = [...block.querySelectorAll('p')];
  // last two authored paragraphs are the star row and the author line
  const stars = paras[paras.length - 2];
  const author = paras[paras.length - 1];
  if (stars) stars.classList.add('testimonial-stars');
  if (author) author.classList.add('testimonial-author');

  [...block.children].forEach((row) => {
    [...row.children].forEach((cell) => {
      while (cell.firstElementChild) card.append(cell.firstElementChild);
    });
  });

  block.replaceChildren(card);
}
