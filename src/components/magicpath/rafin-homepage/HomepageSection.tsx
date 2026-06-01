import type { ReactNode } from 'react';

interface HomepageSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  shellClassName?: string;
  shellVariant?: 'wide' | 'band';
}

export function HomepageSection({
  children,
  className,
  id,
  shellClassName,
  shellVariant = 'wide',
}: HomepageSectionProps) {
  const shellClass = shellVariant === 'band' ? 'band-shell' : 'wide-shell';

  return (
    <section className={className} id={id}>
      <div
        className={[
          shellClass,
          'py-[clamp(2.75rem,4vw,5rem)]',
          shellClassName,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {children}
      </div>
    </section>
  );
}
