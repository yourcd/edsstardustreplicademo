import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const b=await chromium.launch(); const ctx=await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1,userAgent:UA});
const p=await ctx.newPage(); await p.goto('https://indiauncharted.com/',{waitUntil:'domcontentloaded',timeout:60000}); await p.waitForTimeout(3500);
const grab=async(label)=>{
  const r=await p.evaluate(()=>{
    const h=document.querySelector('header')||document.querySelector('.mfn-header, #Top_bar, .header_placeholder')||document.querySelector('[class*="header"]');
    // find the sticky bar: fixed position element containing nav
    let fixedBar=null;
    document.querySelectorAll('*').forEach(e=>{const cs=getComputedStyle(e);if((cs.position==='fixed'||cs.position==='sticky')&&e.querySelector('a')&&e.getBoundingClientRect().top<120&&e.getBoundingClientRect().height>40&&e.getBoundingClientRect().height<160){if(!fixedBar||e.getBoundingClientRect().height<fixedBar.getBoundingClientRect().height)fixedBar=e;}});
    const desc=(el)=>{if(!el)return null;const cs=getComputedStyle(el);const r=el.getBoundingClientRect();return{pos:cs.position,bg:cs.backgroundColor,h:Math.round(r.height),top:Math.round(r.top),cls:(el.className||'').toString().slice(0,60)};};
    // hero bg image
    let heroBg=null; document.querySelectorAll('img, .rev-slidebg, [class*="slide"]').forEach(e=>{const s=e.currentSrc||e.src||getComputedStyle(e).backgroundImage;if(s&&/hero|boat|kashmir|shikara|dal|slider|uploads/i.test(s)&&!heroBg&&e.getBoundingClientRect().top<400&&e.getBoundingClientRect().width>800)heroBg=s;});
    return {fixedBar:desc(fixedBar), body:document.body.className, heroBg};
  });
  console.log(label, JSON.stringify(r));
};
await grab('AT_TOP');
await p.evaluate(()=>scrollTo(0,1200)); await p.waitForTimeout(800);
await grab('SCROLLED');
// grab all slide images
const slides=await p.evaluate(()=>[...document.querySelectorAll('img.rev-slidebg, .rev_slider img, [data-lazyload], .tp-bgimg')].map(i=>i.src||i.getAttribute('data-lazyload')||i.currentSrc).filter(Boolean).slice(0,8));
console.log('SLIDES',JSON.stringify(slides));
await b.close();
