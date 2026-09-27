// Creates the 800px thumbnails that srcset uses for cards and small slots:
// public/images/<categories|products>/<name>.webp -> public/images/<...>/thumbs/<name>.jpg
// Uses macOS `sips` (no extra dependency). JPEG because sips cannot encode WebP, so a thumbnail is
// kept only when it is clearly smaller than the original; small, simple WebPs are served as-is.
// Writes src/data/imageThumbnails.json, which is the only list srcset trusts.
import { execFileSync } from 'node:child_process';
import { mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const imagesDir = path.join(rootDir, 'public', 'images');
const MAX_RATIO = 0.85;
const withThumbnail = [];

for (const folder of ['categories', 'products']) {
  const sourceDir = path.join(imagesDir, folder);
  const thumbsDir = path.join(sourceDir, 'thumbs');
  rmSync(thumbsDir, { recursive: true, force: true });
  mkdirSync(thumbsDir, { recursive: true });

  for (const file of readdirSync(sourceDir).filter((name) => name.endsWith('.webp')).sort()) {
    const source = path.join(sourceDir, file);
    const target = path.join(thumbsDir, file.replace(/\.webp$/, '.jpg'));

    execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '65', '--resampleWidth', '800', source, '--out', target], {
      stdio: 'ignore',
    });

    if (statSync(target).size < statSync(source).size * MAX_RATIO) {
      withThumbnail.push(`/images/${folder}/${file}`);
    } else {
      rmSync(target);
    }
  }
}

writeFileSync(path.join(rootDir, 'src', 'data', 'imageThumbnails.json'), `${JSON.stringify(withThumbnail, null, 2)}\n`);
console.log(`[thumbnails] ${withThumbnail.length} images have an 800px thumbnail`);
