import { chromium } from 'playwright';
async function m(url,capSel){
  const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:360,height:800},deviceScaleFactor:1});
  const p=await ctx.newPage();await p.goto(url,{waitUntil:'networkidle',timeout:60000});await p.waitForTimeout(1000);
  await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=600){scrollTo(0,y);await new Promise(r=>setTimeout(r,40));}scrollTo(0,0);});
  const r=await p.evaluate(({capSel})=>[...document.querySelectorAll(capSel)].map(c=>({t:c.innerText.trim(),y:Math.round(c.getBoundingClientRect().y+scrollY)})),{capSel});
  await b.close();return r;
}
const L=await m('https://indiauncharted.com/destinations/','.wp-caption-text');
const P=await m('http://localhost:8791/listing-dest-proposed.html','.ld-card__cap');
for(let i=0;i<L.length;i++)console.log((P[i].t).padEnd(18),L[i].y,P[i].y,(P[i].y-L[i].y));
