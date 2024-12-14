import React, { createContext, useState } from 'react';

export type ToastProps = {
  type: 'success' | 'error' | 'info';
  message: string;
};

interface ToastContextProps {
  toast: ToastProps | null;
  setToast: React.Dispatch<React.SetStateAction<ToastProps | null>>;
}

const DEFAULT_CONTEXT: ToastContextProps = {
  toast: null,
  setToast: () => {},
};

export const ToastContext = createContext<ToastContextProps>(DEFAULT_CONTEXT);

interface Props {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<Props> = ({ children }) => {
  const [toast, setToast] = useState<ToastProps | null>(null);

  return (
    <ToastContext.Provider value={{ toast, setToast }}>
      {children}
    </ToastContext.Provider>
  );
};
