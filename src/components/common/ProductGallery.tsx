import { useEffect, useState } from 'react';
import type { ProductImage } from '../../data/catalog';
import { ImageWithFallback } from './ImageWithFallback';

interface ProductGalleryProps {
  images: ProductImage[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [images]);

  const activeImage = images[activeImageIndex] ?? images[0];

  return (
    <div>
      <ImageWithFallback
        alt={activeImage?.alt ?? title}
        aspectRatio="wide"
        className="min-h-[320px] rounded-2xl"
        loading="eager"
        src={activeImage?.src}
      />
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {images.map((image, index) => (
          <button
            aria-label={`View product image ${index + 1} of ${images.length}`}
            className={[
              'overflow-hidden rounded-xl border transition',
              index === activeImageIndex ? 'border-brand-gold shadow-card' : 'border-border',
            ].join(' ')}
            key={image.src}
            onClick={() => setActiveImageIndex(index)}
            type="button"
          >
            <ImageWithFallback alt={image.alt} aspectRatio="wide" className="rounded-none" src={image.src} />
          </button>
        ))}
      </div>
    </div>
  );
}
