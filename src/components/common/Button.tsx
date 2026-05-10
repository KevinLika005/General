import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';
import { Link } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'dark';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface BaseProps {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

type LinkProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'className'> & {
    to: string;
  };

type NativeProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> & {
    to?: never;
  };

type ButtonProps = LinkProps | NativeProps;

function isLinkProps(props: ButtonProps): props is LinkProps {
  return 'to' in props;
}

function getClasses(variant: ButtonVariant, size: ButtonSize, className?: string) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl border font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-60';
  const variants: Record<ButtonVariant, string> = {
    primary:
      'border-brand-gold bg-brand-gold text-brand-navy hover:border-brand-gold hover:bg-brand-gold-soft',
    secondary:
      'border-border bg-surface-card text-brand-navy hover:border-brand-navy hover:bg-surface-subtle',
    ghost:
      'border-transparent bg-transparent text-text-muted hover:text-brand-navy',
    dark:
      'border-brand-navy bg-brand-navy text-white hover:bg-brand-ink',
  };
  const sizes: Record<ButtonSize, string> = {
    sm: 'min-h-10 px-4 text-sm',
    md: 'min-h-11 px-5 text-sm',
    lg: 'min-h-12 px-6 text-base',
    xl: 'min-h-14 px-7 text-base',
  };

  return [base, variants[variant], sizes[size], className].filter(Boolean).join(' ');
}

export function Button(props: ButtonProps) {
  if (isLinkProps(props)) {
    const {
      children,
      className,
      size = 'md',
      to,
      variant = 'primary',
      ...rest
    } = props;

    return (
      <Link className={getClasses(variant, size, className)} to={to} {...rest}>
        {children}
      </Link>
    );
  }

  const {
    children,
    className,
    size = 'md',
    type = 'button',
    variant = 'primary',
    ...rest
  } = props;

  return (
    <button className={getClasses(variant, size, className)} type={type} {...rest}>
      {children}
    </button>
  );
}
