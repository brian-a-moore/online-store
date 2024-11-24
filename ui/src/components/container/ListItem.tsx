import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const ListItem: React.FC<Props> = ({ children, onClick, className }) => {
  return (
    <button
      className={`flex flex-col p-4 bg-white hover:bg-slate-100 text-slate-800 border-[1px] rounded shadow-md ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
