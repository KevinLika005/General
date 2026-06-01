import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';
import { Link } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'dark';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

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
    'inline-flex items-center justify-center gap-2 rounded-none border font-semibold tracking-[0.01em] transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60';
  const variants: Record<ButtonVariant, string> = {
    primary:
      'border-primary bg-primary text-text-on-dark hover:border-primary-hover hover:bg-primary-hover',
    secondary:
      'border-border bg-surface-card text-navy hover:border-primary hover:bg-surface-subtle',
    ghost:
      'border-transparent bg-transparent text-navy hover:border-border hover:bg-surface-subtle',
    dark:
      'border-border-blue bg-surface-dark text-text-on-dark hover:border-surface-blue hover:bg-surface-blue',
  };
  const sizes: Record<ButtonSize, string> = {
    xs: 'min-h-8 px-3 text-[0.74rem]',
    sm: 'min-h-10 px-3.5 text-[0.78rem]',
    md: 'min-h-11 px-4 text-[0.82rem]',
    lg: 'min-h-12 px-5 text-[0.86rem]',
    xl: 'min-h-14 px-6 text-[0.92rem]',
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
