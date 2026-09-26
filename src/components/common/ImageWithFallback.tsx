import { ImageOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ImageWithFallbackProps {
  src?: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  loading?: 'eager' | 'lazy';
  aspectRatio?: 'square' | 'video' | 'portrait' | 'wide' | 'auto';
}

export function ImageWithFallback({
  alt,
  aspectRatio = 'auto',
  className,
  imageClassName,
  loading = 'lazy',
  src,
}: ImageWithFallbackProps) {
  const { t } = useTranslation();
  const [failed, setFailed] = useState(!src);

  useEffect(() => {
    setFailed(!src);
  }, [src]);

  const aspectClass =
    aspectRatio === 'square'
      ? 'aspect-square'
      : aspectRatio === 'video'
        ? 'aspect-[4/3]'
        : aspectRatio === 'portrait'
          ? 'aspect-[3/4]'
          : aspectRatio === 'wide'
            ? 'aspect-[16/9]'
            : '';

  return (
    <div className={['relative overflow-hidden border border-border bg-surface-subtle', aspectClass, className].filter(Boolean).join(' ')}>
      {!failed && src ? (
        <img
          alt={alt}
          className={['h-full w-full object-cover', imageClassName].filter(Boolean).join(' ')}
          loading={loading}
          onError={() => setFailed(true)}
          src={src}
        />
      ) : (
        <div
          aria-label={alt}
          className="technical-grid flex h-full min-h-[6rem] w-full flex-col items-center justify-center gap-2 bg-surface-subtle p-3 text-center"
          role="img"
        >
          <ImageOff aria-hidden="true" className="h-6 w-6 shrink-0 text-text-muted" />
          <p className="line-clamp-2 max-w-[16rem] text-[0.75rem] leading-snug text-text-muted">
            {t('pages.productDetail.imageFallback')}
          </p>
        </div>
      )}
    </div>
  );
}
