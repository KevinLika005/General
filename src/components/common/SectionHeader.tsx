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
      <TitleTag className="mt-2 text-[1.65rem] leading-[1.08] text-navy sm:text-[1.9rem] lg:text-[2.2rem] xl:text-[2.5rem]">{title}</TitleTag>
      {description ? <p className="mt-2 max-w-2xl text-sm text-text-muted md:text-[0.94rem]">{description}</p> : null}
    </div>
  );
}
