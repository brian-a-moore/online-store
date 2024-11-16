import { AnchorHTMLAttributes } from 'react';
import { Link as RouterLink } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'destructive';

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: ButtonVariant;
}

export const ButtonLink = ({ href, children, variant = 'primary', ...props }: ButtonProps) => {
  let className = '';

  switch (variant) {
    case 'primary':
      className =
        'text-[var(--btn-color)] bg-[var(--btn-primary-default-bg-color)] hover:bg-[var(--btn-primary-hover-bg-color)] font-semibold py-2 px-4 rounded';
      break;
    case 'secondary':
      className =
        'text-[var(--text-color)] bg-[var(--btn-secondary-default-bg-color)] hover:bg-[var(--btn-secondary-hover-bg-color)] font-semibold py-2 px-4 rounded';
      break;
    case 'destructive':
      className =
        'text-[var(--btn-color)] bg-[var(--btn-destructive-default-bg-color)] hover:bg-[var(--btn-destructive-hover-bg-color)] text-white font-semibold py-2 px-4 rounded';
      break;
  }

  return (
    <RouterLink to={href} className={(className += ' hover:no-underline')} {...props}>
      {children}
    </RouterLink>
  );
};
