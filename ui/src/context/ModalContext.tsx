import React, { createContext, useState } from 'react';
import { Modal } from '../types';

interface ModalContextProps {
  modal: Modal | null;
  setModal: React.Dispatch<React.SetStateAction<Modal | null>>;
}

const DEFAULT_CONTEXT: ModalContextProps = {
  modal: null,
  setModal: () => {},
};

export const ModalContext = createContext<ModalContextProps>(DEFAULT_CONTEXT);

interface Props {
  children: React.ReactNode;
}

export const ModalProvider: React.FC<Props> = ({ children }) => {
  const [modal, setModal] = useState<Modal | null>(null);

  return <ModalContext.Provider value={{ modal, setModal }}>{children}</ModalContext.Provider>;
};
