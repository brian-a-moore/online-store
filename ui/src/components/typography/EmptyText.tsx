type Props = {
  children: React.ReactNode;
};

export const EmptyText: React.FC<Props> = ({ children }) => {
  return <p className="opacity-50 italic">{children}</p>;
};
