import React, { useContext, useEffect } from 'react';
import { ModalContext, ModalProps } from '../../context/ModalContext';
import { Card } from '../container';

type Props = {
  modal: ModalProps | null;
};

export const Modal: React.FC<Props> = ({ modal }) => {
  const { closeModal, setModal } = useContext(ModalContext);
  useEffect(() => {
    if (modal?.state === 'closing') {
      setTimeout(() => setModal(null), 300);
    }
  }, [modal?.state]);

  if (!modal) return null;
  const { state, clickOutsideDisabled = false } = modal;
  return (
    <div
      className={`
            fixed bg-black bg-opacity-30 top-0 left-0 w-screen h-screen z-20 p-4 flex items-center justify-center backdrop-blur-sm
            ${state === 'opening' ? 'opacity-100 transition-opacity duration-200' : 'opacity-0 duration-200 delay-100'}
        `}
    >
      {!clickOutsideDisabled && <button className="absolute top-0 left-0 w-full h-full" onClick={closeModal} />}
      <div
        className={`flex
                w-full max-w-[640px] h-auto max-h-full overflow-hidden
                opacity-0 -translate-y-20
                ${state === 'closing' ? 'animate-modalClose' : 'animate-modalOpen'}
            `}
      >
        <Card className='flex-1 overflow-hidden'>{modal.content}</Card>
      </div>
    </div>
  );
};
