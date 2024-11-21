type Props = {
  children: React.ReactNode;
};
export const Grid: React.FC<Props> = ({ children }) => {
  return (
    <div className="grid gap-4 p-4 mx-auto w-full max-w-[1280px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-[50vh]">
      {children}
    </div>
  );
};
