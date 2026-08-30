const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const DIR = path.join(__dirname, "..", "public", "images", "shopify-cdn");
const MAX_WIDTH = 2000;

async function run() {
  const files = fs.readdirSync(DIR).filter((f) => /\.(jpe?g)$/i.test(f));
  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const filePath = path.join(DIR, file);
    const before = fs.statSync(filePath).size;
    const original = fs.readFileSync(filePath);
    const meta = await sharp(original).metadata();

    let pipeline = sharp(original).rotate();
    if (meta.width && meta.width > MAX_WIDTH) {
      pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    }
    const output = await pipeline
      .jpeg({ quality: 80, mozjpeg: true, progressive: true })
      .toBuffer();

    if (output.length < before) {
      fs.writeFileSync(filePath, output);
      totalBefore += before;
      totalAfter += output.length;
      const pct = Math.round(((before - output.length) / before) * 100);
      console.log(`${file.padEnd(45)} ${before} -> ${output.length}  (${pct}%)`);
    } else {
      totalBefore += before;
      totalAfter += before;
      console.log(`${file.padEnd(45)} ${before} -> kept original (no gain)`);
    }
  }

  console.log("---");
  console.log(
    `Total: ${totalBefore} -> ${totalAfter} bytes (${Math.round(
      ((totalBefore - totalAfter) / totalBefore) * 100
    )}% reduction)`
  );
}

run();
