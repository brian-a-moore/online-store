import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const Page: React.FC<Props> = ({ children, className }) => {
  return <div className={`flex flex-col gap-4 p-4 w-full ${className}`}>{children}</div>;
};
