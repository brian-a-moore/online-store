type Props = {
  className?: string;
  screen?: boolean;
};

export const Loader: React.FC<Props> = ({ className, ...rest }) => {
  return (
    <div {...rest} className={`flex w-screen h-screen items-center justify-center p-4 opacity-50 ${className}`}>
      <span className="loader"></span>
    </div>
  );
};
