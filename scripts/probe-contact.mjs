import { chromium } from 'playwright';
const url=process.argv[2]||'https://indiauncharted.com/contact-us/';
const width=+(process.argv[3]||1440);
const UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const b=await chromium.launch();const ctx=await b.newContext({viewport:{width,height:900},deviceScaleFactor:1,userAgent:UA});
const p=await ctx.newPage();await p.goto(url,{waitUntil:'domcontentloaded',timeout:60000});await p.waitForTimeout(2500);
const d=await p.evaluate(()=>{
 const pick=(el,props)=>{if(!el)return null;const cs=getComputedStyle(el);const r=el.getBoundingClientRect();const o={rect:{y:Math.round(r.y+scrollY),h:Math.round(r.height),w:Math.round(r.width),x:Math.round(r.x)}};props.forEach(pr=>o[pr]=cs.getPropertyValue(pr));return o;};
 const type=['font-family','font-size','font-weight','line-height','color','text-align'];
 const box=['padding','margin','background-color','border-radius','box-shadow','border','width','height','gap'];
 const q=s=>document.querySelector(s);const qa=s=>[...document.querySelectorAll(s)];
 const out={};
 out.subheader=pick(q('#Subheader'),['padding','background-color','min-height']);
 out.h1=pick(q('#Subheader h1'),type);
 // sections
 out.sections=qa('#Content .section').map(s=>({y:Math.round(s.getBoundingClientRect().y+scrollY),h:Math.round(s.getBoundingClientRect().height),pad:getComputedStyle(s).padding,bg:getComputedStyle(s).backgroundColor}));
 out.getintouch=pick(qa('#Content h2')[0],type);
 // info cards
 const cards=qa('#Content .one-third .column_attr');
 out.card0=pick(cards[0],box);
 out.cardImg=pick(cards[0]?.querySelector('img'),['width','height','margin']);
 out.cardH6=pick(cards[0]?.querySelector('h6'),type);
 out.cardP=pick(cards[0]?.querySelector('p'),type);
 // enquire
 out.enquireWrap=pick(qa('#Content .one-second .column_attr')[0],box);
 out.enquireH2=pick([...qa('#Content h2')].find(h=>h.textContent.includes('Enquire')),type);
 out.input=pick(q('.wpcf7-form input[type=text]'),[...box,...type]);
 out.submit=pick(q('.wpcf7-submit'),[...box,...type]);
 out.formImg=pick(qa('#Content .one-second.column_image img')[0]||q('#Content .column_image img'),['width','height']);
 out.docH=document.documentElement.scrollHeight;
 return out;
});
console.log(JSON.stringify(d,null,1));
await b.close();
