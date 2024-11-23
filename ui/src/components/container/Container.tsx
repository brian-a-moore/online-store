import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const Container: React.FC<Props> = ({ children, className }) => {
  return <div className={`flex flex-col w-full max-w-[960px] mx-auto gap-4 ${className}`}>{children}</div>;
};
