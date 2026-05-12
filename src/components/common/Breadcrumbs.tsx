import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  to?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="overflow-x-auto">
      <ol className="flex min-w-max items-center gap-2 text-xs text-text-muted md:text-sm">
        {items.map((item, index) => (
          <li className="flex items-center gap-2" key={`${item.label}-${index}`}>
            {item.to ? (
              <Link className="transition hover:text-navy" to={item.to}>
                {item.label}
              </Link>
            ) : (
              <span className="text-navy">{item.label}</span>
            )}
            {index < items.length - 1 ? <ChevronRight className="h-3.5 w-3.5 text-text-muted" /> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
