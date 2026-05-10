import { ImageOff } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ImageWithFallbackProps {
  src?: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  loading?: 'eager' | 'lazy';
}

export function ImageWithFallback({
  alt,
  className,
  imageClassName,
  loading = 'lazy',
  src,
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(!src);

  useEffect(() => {
    setFailed(!src);
  }, [src]);

  return (
    <div className={['relative overflow-hidden bg-rafin-ink', className].filter(Boolean).join(' ')}>
      {!failed && src ? (
        <img
          alt={alt}
          className={['h-full w-full object-cover', imageClassName].filter(Boolean).join(' ')}
          loading={loading}
          onError={() => setFailed(true)}
          src={src}
        />
      ) : (
        <div className="flex h-full min-h-[220px] w-full items-end bg-[radial-gradient(circle_at_top_left,rgba(203,161,53,0.22),transparent_35%),linear-gradient(180deg,rgba(30,32,35,1),rgba(17,19,22,1))] p-5">
          <div className="border border-white/10 bg-black/25 px-4 py-4 text-white/85 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <ImageOff className="h-5 w-5 text-rafin-gold-soft" />
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-rafin-gold-soft">
                Rafin Machinery
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-6 text-white/70">
              Industrial product media will appear here. This branded fallback prevents broken catalog cards.
            </p>
          </div>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
    </div>
  );
}
