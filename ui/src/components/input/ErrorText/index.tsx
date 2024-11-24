type ErrorTextProps = React.HTMLAttributes<HTMLParagraphElement>;

const ErrorText: React.FC<ErrorTextProps> = ({ children, ...props }) => {
  return (
    <p className="text-sm text-[var(--text-error-color)]" {...props}>
      {children}
    </p>
  );
};

export default ErrorText;
