type Props = {
  className?: string;
  children: React.ReactNode;
};

export const EmptyText: React.FC<Props> = ({ className, children }) => {
  return <p className={`opacity-50 italic ${className}`}>{children}</p>;
};
