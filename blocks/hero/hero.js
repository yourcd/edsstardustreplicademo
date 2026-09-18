/**
 * hero — India Uncharted home hero (template-slotted, rebranded from stock).
 *
 * Authored shape (three rows, EW1 — authored nodes MOVED, never rebuilt):
 *   row 1: a <picture> — the curved photo layer on the right
 *   row 2: the page <h1> — the brown Playfair headline (the page's only h1)
 *   row 3: a sub <p> — the brown sub-line
 * decorate() lifts the picture into a .hero-photo layer, the headline + sub into
 * a .hero-copy layer, and synthesizes a decorative enquiry FORM strip (no
 * backend). Values lifted from home.css .hero*.
 *
 * @ew-exempt the synthesized enquiry-form inputs carry no authored text (decorative form)
 * @param {Element} block The hero block element
 */
function buildForm() {
  const form = document.createElement('form');
  form.className = 'hero-form';
  form.setAttribute('action', '#');
  form.setAttribute('method', 'post');
  form.addEventListener('submit', (e) => e.preventDefault());
  const fields = [
    { type: 'text', name: 'your-name', placeholder: 'Your Name' },
    { type: 'email', name: 'your-email', placeholder: 'E-mail' },
    { type: 'tel', name: 'your-phone', placeholder: 'Phone Number' },
    { type: 'text', name: 'package', placeholder: 'Package' },
  ];
  fields.forEach((f) => {
    const input = document.createElement('input');
    input.type = f.type;
    input.name = f.name;
    input.placeholder = f.placeholder;
    input.maxLength = 400;
    form.append(input);
  });
  const submit = document.createElement('button');
  submit.type = 'submit';
  submit.className = 'hero-submit';
  submit.textContent = 'SUBMIT HERE !!';
  form.append(submit);
  return form;
}

export default function decorate(block) {
  const photo = document.createElement('div');
  photo.className = 'hero-photo';
  const picture = block.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      img.setAttribute('loading', 'eager');
      img.setAttribute('fetchpriority', 'high');
    }
    photo.append(picture);
  }

  const copy = document.createElement('div');
  copy.className = 'hero-copy';
  block.querySelectorAll('h1, h2, p').forEach((el) => copy.append(el));

  const inner = document.createElement('div');
  inner.className = 'hero-inner';
  inner.append(copy, buildForm());

  block.replaceChildren(photo, inner);
}
