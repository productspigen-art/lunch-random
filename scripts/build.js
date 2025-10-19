const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, 'www');

// Files to copy for this static site
const FILES = [
  'index.html',
  'app.js',
  'styles.css',
  'seasonal_kr.json',
  'menu_dataset_full_5tags_with_category.json',
  'privacy.html',
];

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function cleanDir(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir)) {
    const p = path.join(dir, entry);
    const stat = fs.lstatSync(p);
    if (stat.isDirectory()) {
      fs.rmSync(p, { recursive: true, force: true });
    } else {
      fs.unlinkSync(p);
    }
  }
}

function copyFile(src, destDir) {
  const srcPath = path.join(ROOT, src);
  const destPath = path.join(destDir, path.basename(src));
  if (!fs.existsSync(srcPath)) return;
  fs.copyFileSync(srcPath, destPath);
}

function main() {
  ensureDir(OUT_DIR);
  cleanDir(OUT_DIR);

  for (const f of FILES) {
    copyFile(f, OUT_DIR);
  }

  // Optionally copy any images/assets folders if present in future
  const assetsDir = path.join(ROOT, 'assets');
  if (fs.existsSync(assetsDir)) {
    fs.cpSync(assetsDir, path.join(OUT_DIR, 'assets'), { recursive: true });
  }

  console.log(`Built to: ${OUT_DIR}`);
}

main();
