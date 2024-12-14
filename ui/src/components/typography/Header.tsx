export const H1: React.FC<React.HTMLProps<HTMLHeadingElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <h1 {...rest} className={`text-3xl font-semibold ${className}`}>
      {children}
    </h1>
  );
};

export const H2: React.FC<React.HTMLProps<HTMLHeadingElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <h2 {...rest} className={`text-2xl font-semibold ${className}`}>
      {children}
    </h2>
  );
};

export const H3: React.FC<React.HTMLProps<HTMLHeadingElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <h3 {...rest} className={`text-xl font-semibold ${className}`}>
      {children}
    </h3>
  );
};

export const H4: React.FC<React.HTMLProps<HTMLHeadingElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <h4 {...rest} className={`text-lg font-semibold ${className}`}>
      {children}
    </h4>
  );
};

export const H5: React.FC<React.HTMLProps<HTMLHeadingElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <h5 {...rest} className={`font-semibold ${className}`}>
      {children}
    </h5>
  );
};
