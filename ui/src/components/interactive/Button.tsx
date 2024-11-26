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
      className = 'bg-slate-600 hover:bg-slate-700 text-white font-semibold py-2 px-4 rounded';
      break;
    case 'secondary':
      className = ' bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-2 px-4 rounded';
      break;
    case 'transparent':
      className = 'bg-[transparent] hover:bg-[rgba(0,0,0,0.1)] font-semibold py-2 px-4 rounded';
      break;
    case 'destructive':
      className = 'bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded';
      break;
  }

  if (disabled) {
    className += ' opacity-20 pointer-events-none';
  }

  return (
    <button type='button' {...props} className={`${className}${styles ? ' ' + styles : ''}`} disabled={disabled}>
      {children}
    </button>
  );
};
