interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  titleAs?: 'h1' | 'h2';
}

export function SectionHeader({
  align = 'left',
  description,
  eyebrow,
  title,
  titleAs = 'h2',
}: SectionHeaderProps) {
  const TitleTag = titleAs;

  return (
    <div className={align === 'center' ? 'mx-auto max-w-[min(100%,56rem)] text-center' : 'max-w-[min(100%,56rem)]'}>
      {eyebrow ? <p className="kicker">{eyebrow}</p> : null}
      <TitleTag className="mt-2 text-[clamp(1.65rem,1.1rem+1.3vw,2.7rem)] leading-[1.04] text-navy">{title}</TitleTag>
      {description ? <p className="text-measure mt-2 text-sm text-text-muted md:text-[0.94rem]">{description}</p> : null}
    </div>
  );
}
