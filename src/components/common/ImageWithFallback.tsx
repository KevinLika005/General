import { ImageOff } from 'lucide-react';
import { useEffect, useState } from 'react';

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
    <div className={['relative overflow-hidden rounded-2xl bg-surface-subtle', aspectClass, className].filter(Boolean).join(' ')}>
      {!failed && src ? (
        <img
          alt={alt}
          className={['h-full w-full object-cover', imageClassName].filter(Boolean).join(' ')}
          loading={loading}
          onError={() => setFailed(true)}
          src={src}
        />
      ) : (
        <div className="industrial-grid flex h-full min-h-[220px] w-full items-end bg-surface-subtle p-5">
          <div className="rounded-2xl border border-border bg-white/80 px-4 py-4 text-text shadow-card backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <ImageOff className="h-5 w-5 text-brand-gold" />
              <span className="text-sm font-semibold text-brand-navy">
                Rafin Machinery
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-6 text-text-muted">
              Industrial product media will appear here. This branded fallback prevents broken catalog cards.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
