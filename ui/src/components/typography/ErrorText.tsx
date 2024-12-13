type Props = {
  children: React.ReactNode;
};

export const ErrorText: React.FC<Props> = ({ children }) => {
  return <p className="text-sm text-red-600">{children}</p>;
};
