import { chromium } from 'playwright';
const url=process.argv[2]; const width=+(process.argv[3]||1440);
const UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const b=await chromium.launch(); const ctx=await b.newContext({viewport:{width,height:900},deviceScaleFactor:1,userAgent:UA});
const p=await ctx.newPage(); await p.goto(url,{waitUntil:'domcontentloaded',timeout:60000}); await p.waitForTimeout(3000);
await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=800){scrollTo(0,y);await new Promise(r=>setTimeout(r,60));}scrollTo(0,0);});
await p.waitForTimeout(500);
const r=await p.evaluate(()=>{
  const rect=(el)=>{if(!el)return null;const b=el.getBoundingClientRect();return{y:Math.round(b.y+scrollY),w:Math.round(b.width),h:Math.round(b.height)};};
  const near=(needle)=>[...document.querySelectorAll('h2,h3,h4')].find(e=>(e.innerText||'').trim().includes(needle));
  const out={};
  // feature card: text Personalized
  let f=[...document.querySelectorAll('*')].find(e=>[...e.childNodes].some(n=>n.nodeType===3&&/Personalized Journeys/.test(n.textContent)));
  while(f&&f.getBoundingClientRect().height<160&&f.parentElement)f=f.parentElement;
  out.feature=rect(f);
  // theme label BEACH
  let t=[...document.querySelectorAll('*')].find(e=>/BEACH HOLIDAY/i.test(e.innerText||'')&&(e.innerText||'').length<40);
  out.themeLabel=rect(t);
  let tc=t; while(tc&&tc.getBoundingClientRect().height<200&&tc.parentElement)tc=tc.parentElement; out.themeCard=rect(tc);
  // welcome image
  let w=near('Welcome To'); out.welcomeH=rect(w);
  // testimonial card
  let ts=[...document.querySelectorAll('*')].find(e=>/A Journey We/i.test(e.innerText||'')&&(e.innerText||'').length<300);
  while(ts&&ts.getBoundingClientRect().height<200&&ts.parentElement)ts=ts.parentElement; out.testiCard=rect(ts);
  // hero section: first big section
  out.hero=rect(document.querySelector('.mcb-wrap, .rev_slider_wrapper, section'));
  return out;
});
console.log(JSON.stringify(r,null,1)); await b.close();
