type Props = {
  children: React.ReactNode;
};
export const Grid: React.FC<Props> = ({ children }) => {
  return (
    <div className="grid gap-4 pt-4 mx-auto w-full max-w-[960px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
};
