interface SectionHeaderProps {
  title: string;
  description?: string;
  align?: 'left' | 'center';
  titleAs?: 'h1' | 'h2';
}

export function SectionHeader({
  align = 'left',
  description,
  title,
  titleAs = 'h2',
}: SectionHeaderProps) {
  const TitleTag = titleAs;

  return (
    <div className={align === 'center' ? 'mx-auto max-w-[min(100%,56rem)] text-center' : 'max-w-[min(100%,56rem)]'}>
      <TitleTag className="text-[clamp(1.5rem,1.1rem+1.1vw,2rem)] text-navy">{title}</TitleTag>
      {description ? <p className="text-measure mt-2 text-[0.9375rem] text-text-muted">{description}</p> : null}
    </div>
  );
}
