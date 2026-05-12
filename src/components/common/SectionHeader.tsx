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
      {eyebrow ? <p className="kicker">{eyebrow}</p> : null}
      <TitleTag className="mt-2 text-[2.15rem] text-brand-navy sm:text-[2.7rem]">{title}</TitleTag>
      {description ? <p className="mt-3 max-w-2xl text-sm text-text-muted sm:text-[0.98rem]">{description}</p> : null}
    </div>
  );
}
