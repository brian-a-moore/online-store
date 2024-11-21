import { Modal as ModalType } from '../../types';
import { Card } from '../container';

type Props = {
  modal: ModalType | null;
};

const Modal: React.FC<Props> = ({ modal }) => {
  if (!modal) return null;
  return (
    <div className="fixed bg-black bg-opacity-30 top-0 left-0 w-full h-full z-20 p-4 flex items-center justify-center">
      <div className="w-full max-w-[460px]">
        <Card className='flex flex-col gap-y-4'>
          <h1>{modal.title}</h1>
          <div>{modal.Body}</div>
          {modal.ActionBar && (
            <>
              <hr />
              <div className={`flex items-center gap-x-4`}>
                {modal.ActionBar}
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Modal;
