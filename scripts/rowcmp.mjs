import { chromium } from 'playwright';
async function m(url,sel,capSel){
  const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
  const p=await ctx.newPage();await p.goto(url,{waitUntil:'networkidle',timeout:60000});await p.waitForTimeout(1000);
  await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=800){scrollTo(0,y);await new Promise(r=>setTimeout(r,40));}scrollTo(0,0);});
  const r=await p.evaluate(({sel,capSel})=>{
    const caps=[...document.querySelectorAll(capSel)].map(c=>({t:c.innerText.trim(),y:Math.round(c.getBoundingClientRect().y+scrollY)}));
    const foot=document.querySelector('.iu-footer, #Footer, footer');
    return {caps,footY:foot?Math.round(foot.getBoundingClientRect().y+scrollY):null,docH:document.documentElement.scrollHeight};
  },{sel,capSel});
  await b.close();return r;
}
const live=await m('https://indiauncharted.com/destinations/','x','.wp-caption-text');
const proto=await m('http://localhost:8791/listing-dest-proposed.html','x','.ld-card__cap');
console.log('CAP  LIVE  PROTO  Δ');
for(let i=0;i<live.caps.length;i++){const L=live.caps[i],P=proto.caps[i];if(P&&L.t.startsWith(P.t.split(' ')[0]))console.log(P.t.padEnd(18),L.y,P.y,(P.y-L.y));}
console.log('footY',live.footY,proto.footY,'docH',live.docH,proto.docH);
