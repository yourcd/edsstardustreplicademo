/**
 * itinerary — India Uncharted "Tour Itinerary" day-by-day list (reconstructive).
 *
 * Authored shape: one ROW per day (EW1 — authored nodes MOVED, never rebuilt).
 * Each day-row's single cell holds, in author order:
 *   - a <p> day-head ("Day 1: …") — BODY role on live (renders bold body text,
 *     NOT a heading; mirrored here via CSS, no retag)
 *   - an optional <p> intro
 *   - a <ul> of items (may nest a sub-<ul>)
 * decorate() moves each day cell's children into a .itinerary-day wrapper; a
 * hairline divider between days is drawn in CSS. Reference package.css .itinerary*.
 * @param {Element} block The itinerary block element
 */
export default function decorate(block) {
  const days = [];
  [...block.children].forEach((row) => {
    const day = document.createElement('div');
    day.className = 'itinerary-day';
    const cell = row.querySelector(':scope > div') || row;
    // first <p> is the day-head; the block reads it via :first-of-type in CSS
    while (cell.firstElementChild) day.append(cell.firstElementChild);
    days.push(day);
  });
  block.replaceChildren(...days);
}
