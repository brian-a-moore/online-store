type Props = {
  children: React.ReactNode;
};

export const FormOverflow: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col gap-4 overflow-y-auto pb-16">{children}</div>
  );
};
