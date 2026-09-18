import { PNG } from 'pngjs'; import fs from 'fs';
const [,,src,out,y0,h]=process.argv;
const png=PNG.sync.read(fs.readFileSync(src));
const Y=+y0,H=+h;
const o=new PNG({width:png.width,height:H});
for(let y=0;y<H;y++)for(let x=0;x<png.width;x++){const si=((Y+y)*png.width+x)<<2;const di=(y*png.width+x)<<2;for(let c=0;c<4;c++)o.data[di+c]=png.data[si+c];}
fs.writeFileSync(out,PNG.sync.write(o));
console.log('wrote',out,png.width+'x'+H);
