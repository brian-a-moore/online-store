type Props = React.HTMLAttributes<HTMLDivElement>;

export const Card: React.FC<Props> = ({ children, className, ...rest }) => {
  return (
    <div {...rest} className={`flex flex-col bg-white border-[1px] rounded shadow-md gap-4 p-4 ${className}`}>
      {children}
    </div>
  );
};
