import { AnchorHTMLAttributes } from 'react';
import { Link as RouterLink } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'destructive';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: ButtonVariant;
}

export const ButtonLink: React.FC<Props> = ({
  href,
  children,
  variant = 'primary',
  className: incomingClassName,
  ...props
}) => {
  let className = '';

  switch (variant) {
    case 'primary':
    default:
      className =
        'bg-slate-600 hover:bg-slate-700 text-white font-semibold py-2 px-4 rounded';
      break;
    case 'secondary':
      className =
        'bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded';
      break;
    case 'tertiary':
      className =
        'bg-white hover:bg-slate-200 text-slate-800 font-semibold py-2 px-4 rounded';
      break;
    case 'destructive':
      className =
        'bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded';
      break;
  }

  return (
    <RouterLink
      to={href}
      className={`${className} hover:no-underline ${incomingClassName}`}
      {...props}
    >
      {children}
    </RouterLink>
  );
};
