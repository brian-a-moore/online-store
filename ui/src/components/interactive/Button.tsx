import { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'destructive';

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
    default:
      className = 'bg-slate-600 hover:bg-slate-700 text-white font-semibold py-2 px-4 rounded';
      break;
    case 'secondary':
      className = 'bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded';
      break;
    case 'tertiary':
      className = 'bg-white hover:bg-slate-200 text-slate-800 font-semibold py-2 px-4 rounded';
      break;
    case 'destructive':
      className = 'bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded';
      break;
  }

  if (disabled) {
    className += ' opacity-20 pointer-events-none';
  }

  return (
    <button
      type="button"
      {...props}
      className={`flex items-center gap-2 ${className}${styles ? ' ' + styles : ''}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
