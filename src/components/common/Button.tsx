import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';
import { Link } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'dark';
type ButtonSize = 'sm' | 'md' | 'lg';

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
    'inline-flex items-center justify-center gap-2 border font-semibold uppercase tracking-[0.16em] transition duration-200 focus-visible:ring-2 focus-visible:ring-rafin-gold focus-visible:ring-offset-2 focus-visible:ring-offset-rafin-black disabled:cursor-not-allowed disabled:opacity-60';
  const variants: Record<ButtonVariant, string> = {
    primary:
      'border-rafin-gold bg-rafin-gold text-rafin-ink hover:bg-rafin-gold-soft hover:border-rafin-gold-soft',
    secondary:
      'border-white/16 bg-transparent text-white hover:border-rafin-gold hover:text-rafin-gold-soft',
    ghost:
      'border-transparent bg-transparent text-white/72 hover:text-rafin-gold-soft',
    dark:
      'border-white/10 bg-rafin-ink text-white hover:border-rafin-gold hover:bg-rafin-black',
  };
  const sizes: Record<ButtonSize, string> = {
    sm: 'px-4 py-2 text-[0.64rem]',
    md: 'px-5 py-2.5 text-[0.68rem]',
    lg: 'px-6 py-3 text-[0.7rem]',
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
