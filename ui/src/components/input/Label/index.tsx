type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

const Label: React.FC<LabelProps> = ({ children, ...props }) => {
  return (
    <label className="text-sm font-semibold" {...props}>
      {children}
    </label>
  );
};

export default Label;
