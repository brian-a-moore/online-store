type Props = {
    children: React.ReactNode;
    onClick: () => void;
    isActive: boolean;
};

export const TextButton: React.FC<Props> = ({ children, onClick, isActive }) => {
    return <button onClick={onClick} className={`${isActive ? 'font-semibold text-sky-600' : 'opacity-50'}`}>{children}</button>
};