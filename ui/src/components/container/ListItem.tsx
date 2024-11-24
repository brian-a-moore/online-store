import { ButtonHTMLAttributes } from "react";


interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const ListItem: React.FC<Props> = ({ children, onClick }) => {
    return (
        <button
            className="flex gap-4 p-4 items-center text-left bg-white hover:bg-slate-100 text-slate-800 border-[1px] rounded shadow-md"
            onClick={onClick}
        >
            {children}
        </button>
    )
};