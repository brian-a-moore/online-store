type ErrorTextProps = React.HTMLAttributes<HTMLParagraphElement>;

const ErrorText: React.FC<ErrorTextProps> = ({ children, className, ...props }) => {
  return (
    <p {...props} className={`text-sm text-[var(--text-error-color)] ${className}`}>
      {children}
    </p>
  );
};

export default ErrorText;
