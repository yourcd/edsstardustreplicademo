import sharp from 'sharp';
const G='stardust/replica/gates/listing-dest-1440';
for(const [f,o] of [['live','live_row1'],['proto','proto_row1']]){
  await sharp(`${G}/${f}.png`).extract({left:0,top:474,width:1440,height:360}).toFile(`${G}/${o}.png`);
}
console.log('done');
