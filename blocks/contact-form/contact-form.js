/**
 * contact-form — India Uncharted contact page (bespoke).
 *
 * Authored content (all MOVED, never rebuilt — EW1):
 *   - standalone <h2> cells → section titles (1st = "Get In Touch", 2nd = "Enquire Now")
 *   - a row carrying a <picture> AND an <h6> → a contact-fact card (icon + label + value)
 *   - a cell with ONLY a <picture> (no heading) → the enquiry media image
 * The enquiry form inputs themselves are synthesized (decorative, no backend, no
 * authored text) and appended under the "Enquire Now" title.
 *
 * @ew-exempt synthesized enquiry-form inputs carry no authored text (decorative form)
 */
function buildForm() {
  const form = document.createElement('form');
  form.setAttribute('action', '#');
  form.setAttribute('method', 'post');
  form.addEventListener('submit', (e) => e.preventDefault());
  const fields = [
    { type: 'text', name: 'your-name', placeholder: 'Your Name' },
    { type: 'email', name: 'your-email', placeholder: 'E-mail' },
    { type: 'tel', name: 'your-phone', placeholder: 'Your Phone Number' },
    { type: 'text', name: 'package', placeholder: 'Package' },
    { type: 'text', name: 'your-message', placeholder: 'Your Message' },
  ];
  fields.forEach((f) => {
    const p = document.createElement('p');
    const input = document.createElement('input');
    input.type = f.type;
    input.name = f.name;
    input.placeholder = f.placeholder;
    input.maxLength = 400;
    p.append(input);
    form.append(p);
  });
  const submitP = document.createElement('p');
  const submit = document.createElement('input');
  submit.type = 'submit';
  submit.className = 'contact-form-submit';
  submit.value = 'SUBMIT HERE !!';
  submitP.append(submit);
  form.append(submitP);
  return form;
}

export default function decorate(block) {
  const rows = [...block.children];
  const titles = [];
  const facts = [];
  let media = null;

  rows.forEach((row) => {
    const pic = row.querySelector('picture');
    const h6 = row.querySelector('h6');
    const h2 = row.querySelector('h2');
    if (pic && h6) {
      const card = document.createElement('div');
      card.className = 'contact-form-card';
      [...row.children].forEach((cell) => {
        while (cell.firstElementChild) card.append(cell.firstElementChild);
      });
      facts.push(card);
    } else if (h2) {
      titles.push(h2);
    } else if (pic) {
      media = pic;
    }
  });

  const info = document.createElement('div');
  info.className = 'contact-form-info';
  if (titles[0]) info.append(titles[0]);
  const grid = document.createElement('div');
  grid.className = 'contact-form-cards';
  facts.forEach((c) => grid.append(c));
  info.append(grid);

  const enquire = document.createElement('div');
  enquire.className = 'contact-form-enquire';
  const panel = document.createElement('div');
  panel.className = 'contact-form-panel';
  if (titles[1]) panel.append(titles[1]);
  panel.append(buildForm());
  enquire.append(panel);
  if (media) {
    const mediaWrap = document.createElement('div');
    mediaWrap.className = 'contact-form-media';
    mediaWrap.append(media);
    enquire.append(mediaWrap);
  }

  block.replaceChildren(info, enquire);
}
