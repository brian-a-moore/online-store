type Props = React.HTMLAttributes<HTMLDivElement>;

export const Card: React.FC<Props> = ({ children, className, ...rest }) => {
  return (
    <div {...rest} className={`flex flex-col bg-white border rounded gap-4 p-4 ${className}`}>
      {children}
    </div>
  );
};
