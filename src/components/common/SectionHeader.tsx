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
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <TitleTag className="mt-2 text-[2rem] text-brand-navy sm:text-[3rem]">{title}</TitleTag>
      {description ? <p className="mt-3 max-w-2xl text-sm text-text-muted sm:text-base">{description}</p> : null}
    </div>
  );
}
