import { chromium } from 'playwright';
const url='https://indiauncharted.com/agra-tour-packages/';
const width=+(process.argv[2]||1440);
const UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const b=await chromium.launch(); const ctx=await b.newContext({viewport:{width,height:1000},deviceScaleFactor:1,userAgent:UA});
const p=await ctx.newPage(); await p.goto(url,{waitUntil:'domcontentloaded',timeout:60000}); await p.waitForTimeout(2500);
await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=800){scrollTo(0,y);await new Promise(r=>setTimeout(r,40));}scrollTo(0,0);});
const pick=(sel,props)=>{const el=document.querySelector(sel); if(!el) return null; const cs=getComputedStyle(el); const r=el.getBoundingClientRect(); const o={rect:{x:Math.round(r.x),y:Math.round(r.y+scrollY),w:Math.round(r.width),h:Math.round(r.height)}}; props.forEach(pr=>o[pr]=cs.getPropertyValue(pr)); return o;};
const data=await p.evaluate((pickStr)=>{
  const pick=eval('('+pickStr+')');
  const t=['font-family','font-size','font-weight','line-height','color','text-align','margin','padding'];
  const box=['max-width','width','padding','margin','background-color'];
  return {
    subheader: pick('#Subheader',box),
    subTitle: pick('#Subheader .title',t),
    contentWrapper: pick('.content_wrapper',box),
    firstSection: pick('.entry-content .section.mcb-section',box),
    sectionWrapper: pick('.entry-content .section_wrapper',box),
    introH2: pick('.column_visual h2',t),
    introP: pick('.column_visual p',t),
    introH4: pick('.column_visual h4',t),
    colVisual: pick('.column_visual',box),
    colImage: pick('.column_image',box),
    theContentSection: pick('.section.the_content',box),
    theContentWrapper: pick('.the_content_wrapper',box),
    popularH2: pick('h2.wp-block-heading',t),
    tourGrid: pick('.tour-grid',box),
    tourCard: pick('.tour-card',box),
    footProduct: pick('.ova_foot_product',box),
  };
},pick.toString());
console.log(JSON.stringify(data,null,1));
await b.close();
