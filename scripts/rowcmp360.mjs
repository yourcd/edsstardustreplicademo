import { chromium } from 'playwright';
async function m(url,capSel){
  const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:360,height:800},deviceScaleFactor:1});
  const p=await ctx.newPage();await p.goto(url,{waitUntil:'networkidle',timeout:60000});await p.waitForTimeout(1000);
  await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=600){scrollTo(0,y);await new Promise(r=>setTimeout(r,40));}scrollTo(0,0);});
  const r=await p.evaluate(({capSel})=>{
    const caps=[...document.querySelectorAll(capSel)];
    const first=caps[0]?caps[0].closest('.column, .ld-card'):null;
    const img=first?first.querySelector('img'):null;
    const cols= document.querySelectorAll(capSel).length;
    // determine columns by comparing x of first two cards
    const cards=[...document.querySelectorAll('.column.one-third, .ld-card')];
    const c0=cards[0],c1=cards[1];
    return {
      n:caps.length,
      card0:c0?{w:Math.round(c0.getBoundingClientRect().width),h:Math.round(c0.getBoundingClientRect().height),x:Math.round(c0.getBoundingClientRect().x),y:Math.round(c0.getBoundingClientRect().y+scrollY)}:null,
      card1:c1?{x:Math.round(c1.getBoundingClientRect().x),y:Math.round(c1.getBoundingClientRect().y+scrollY)}:null,
      img:img?{w:Math.round(img.getBoundingClientRect().width),h:Math.round(img.getBoundingClientRect().height)}:null,
      docH:document.documentElement.scrollHeight,
      firstCapY: caps[0]?Math.round(caps[0].getBoundingClientRect().y+scrollY):null
    };
  },{capSel});
  await b.close();return r;
}
console.log('LIVE',JSON.stringify(await m('https://indiauncharted.com/destinations/','.wp-caption-text')));
console.log('PROTO',JSON.stringify(await m('http://localhost:8791/listing-dest-proposed.html','.ld-card__cap')));
