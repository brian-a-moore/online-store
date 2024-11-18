type Props = {
  children: React.ReactNode;
};
export const Grid: React.FC<Props> = ({ children }) => {
  return (
    <div className="grid gap-4 pt-4 mx-auto w-full max-w-[1280px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {children}
    </div>
  );
};
