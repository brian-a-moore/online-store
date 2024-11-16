import { AnchorHTMLAttributes } from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export const Link = ({ href, children, className, ...props }: LinkProps) => {
  return (
    <RouterLink className={`hover:underline ${className}`} to={href} {...props}>
      {children}
    </RouterLink>
  );
};
