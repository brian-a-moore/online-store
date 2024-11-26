import React, { createContext, useState } from 'react';

export type ModalProps = {
  state: 'opening' | 'closing';
  clickOutsideDisabled?: boolean;
  content: React.ReactNode;
};

interface ModalContextProps {
  modal: ModalProps | null;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
  setModal: React.Dispatch<React.SetStateAction<ModalProps | null>>;
}

const DEFAULT_CONTEXT: ModalContextProps = {
  modal: null,
  openModal: () => {},
  closeModal: () => {},
  setModal: () => {},
};

export const ModalContext = createContext<ModalContextProps>(DEFAULT_CONTEXT);

interface Props {
  children: React.ReactNode;
}

export const ModalProvider: React.FC<Props> = ({ children }) => {
  const [modal, setModal] = useState<ModalProps | null>(null);

  const openModal = (content: React.ReactNode) => {
    setModal({ state: 'opening', content });
  };

  const closeModal = () =>
    setModal((prevState) => {
      if (prevState) return { ...prevState, state: 'closing' };
      else return prevState;
    });

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal, setModal }}>
      {children}
    </ModalContext.Provider>
  );
};
