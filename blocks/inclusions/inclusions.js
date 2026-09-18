/**
 * inclusions — India Uncharted "Package Inclusions" / "Package Exclusions"
 * (reconstructive). Two bordered cards side by side.
 *
 * Authored shape: one ROW per card (EW1 — authored nodes MOVED, never rebuilt).
 * Each card cell holds an <h2> title + a <ul> of items. decorate() moves each
 * card cell's children into a .inclusions-card wrapper. Reference package.css .inex*.
 * @param {Element} block The inclusions block element
 */
export default function decorate(block) {
  const cards = [];
  [...block.children].forEach((row) => {
    const card = document.createElement('div');
    card.className = 'inclusions-card';
    const cell = row.querySelector(':scope > div') || row;
    while (cell.firstElementChild) card.append(cell.firstElementChild);
    cards.push(card);
  });
  const grid = document.createElement('div');
  grid.className = 'inclusions-grid';
  grid.append(...cards);
  block.replaceChildren(grid);
}
