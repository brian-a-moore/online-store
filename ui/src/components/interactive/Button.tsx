import { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'transparent' | 'destructive';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button: React.FC<Props> = ({
  children,
  variant = 'primary',
  disabled = false,
  className: styles,
  ...props
}) => {
  let className = '';

  switch (variant) {
    case 'primary':
      className =
        'text-[var(--btn-color)] bg-[var(--btn-primary-default-bg-color)] hover:bg-[var(--btn-primary-hover-bg-color)] font-semibold py-2 px-4 rounded';
      break;
    case 'secondary':
      className =
        'text-[var(--color)] bg-[var(--btn-secondary-default-bg-color)] hover:bg-[var(--btn-secondary-hover-bg-color)] font-semibold py-2 px-4 rounded';
      break;
    case 'transparent':
      className =
        'text-[var(--btn-color)] bg-[transparent] hover:bg-[rgba(255,255,255,0.2)] font-semibold py-2 px-4 rounded';
      break;
    case 'destructive':
      className =
        'text-[var(--btn-color)] bg-[var(--btn-destructive-default-bg-color)] hover:bg-[var(--btn-destructive-hover-bg-color)] text-white font-semibold py-2 px-4 rounded';
      break;
  }

  if (disabled) {
    className += ' opacity-20 pointer-events-none';
  }

  return (
    <button {...props} className={`${className}${styles ? ' ' + styles : ''}`} disabled={disabled}>
      {children}
    </button>
  );
};
