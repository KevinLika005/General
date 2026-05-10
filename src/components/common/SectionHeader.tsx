interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export function SectionHeader({
  align = 'left',
  description,
  eyebrow,
  title,
}: SectionHeaderProps) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="mt-2 text-[2.2rem] text-white sm:text-5xl">{title}</h2>
      {description ? <p className="mt-3 max-w-2xl text-sm text-rafin-muted-light sm:text-base">{description}</p> : null}
    </div>
  );
}
