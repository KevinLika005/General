import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { ProductImage } from '../../data/catalog';
import { ImageWithFallback } from './ImageWithFallback';

interface ProductGalleryProps {
  images: ProductImage[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const { t } = useTranslation();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [images]);

  const activeImage = images[activeImageIndex] ?? images[0];

  return (
    <div className="w-full">
      <ImageWithFallback
        alt={activeImage?.alt ?? title}
        aspectRatio="video"
        className="rounded-lg"
        loading="eager"
        src={activeImage?.src}
      />
      <div className="mt-3 grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <button
            aria-label={t('common.accessibility.viewProductImage', { index: index + 1, count: images.length })}
            className={[
              'overflow-hidden rounded border-2 transition-colors',
              index === activeImageIndex ? 'border-primary' : 'border-transparent hover:border-border',
            ].join(' ')}
            key={image.src}
            onClick={() => setActiveImageIndex(index)}
            type="button"
          >
            <ImageWithFallback alt={image.alt} aspectRatio="video" className="border-0" src={image.src} />
          </button>
        ))}
      </div>
    </div>
  );
}
