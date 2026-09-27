import imagesWithThumbnail from '../data/imageThumbnails.json';

// Catalog images ship as a large WebP plus, where it is clearly smaller, an 800px JPEG thumbnail
// (scripts/make-thumbnails.mjs, which also writes the list). Category heroes are 1920px wide;
// product photos 1200-1440px (declared as 1200w, the smaller).
const thumbnails = new Set(imagesWithThumbnail);

export function getSrcSet(src?: string) {
  if (!src || !thumbnails.has(src)) {
    return undefined;
  }

  const fullWidth = src.startsWith('/images/categories/') ? 1920 : 1200;
  return `${src.replace(/\/([^/]+)\.webp$/, '/thumbs/$1.jpg')} 800w, ${src} ${fullWidth}w`;
}
