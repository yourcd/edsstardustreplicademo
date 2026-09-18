import { PNG } from 'pngjs'; import fs from 'fs';
const f=(p,y0,y1)=>{const png=PNG.sync.read(fs.readFileSync(p));let s=0,n=0;for(let y=y0;y<y1;y++)for(let x=100;x<400;x++){const i=(y*png.width+x)<<2;s+=(png.data[i]+png.data[i+1]+png.data[i+2])/3;n++;}return(s/n).toFixed(1);};
console.log('LIVE banner lum',f('stardust/replica/gates/package-1440/live.png',150,400));
console.log('PROTO banner lum',f('stardust/replica/gates/package-1440/proto.png',150,400));
