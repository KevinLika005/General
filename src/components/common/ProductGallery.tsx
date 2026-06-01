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
    <div className="mx-auto max-w-[52rem] 3xl:max-w-none">
      <ImageWithFallback
        alt={activeImage?.alt ?? title}
        aspectRatio="wide"
        className="min-h-[320px] rounded-none 3xl:min-h-[360px]"
        loading="eager"
        src={activeImage?.src}
      />
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {images.map((image, index) => (
          <button
            aria-label={t('common.accessibility.viewProductImage', { index: index + 1, count: images.length })}
            className={[
              'overflow-hidden rounded-none border transition',
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
