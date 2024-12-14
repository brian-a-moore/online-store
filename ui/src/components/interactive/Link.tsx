import { AnchorHTMLAttributes } from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export const Link: React.FC<Props> = ({
  href,
  children,
  className,
  ...props
}) => {
  return (
    <span>
      <RouterLink
        className={`hover:underline ${className}`}
        to={href}
        {...props}
      >
        {children}
      </RouterLink>
    </span>
  );
};
