import { Modal as ModalType } from '../../types';
import { Card } from '../container';
import { H2 } from '../typography';

type Props = {
  modal: ModalType | null;
};

const Modal: React.FC<Props> = ({ modal }) => {
  if (!modal) return null;
  return (
    <div className="fixed bg-black bg-opacity-30 top-0 left-0 w-full h-full z-20 p-4 flex items-center justify-center backdrop-blur-sm">
      <div className="w-full max-w-[460px]">
        <Card className="flex flex-col gap-y-4">
          <H2>{modal.title}</H2>
          <div>{modal.Body}</div>
          {modal.ActionBar && (
            <div className={`flex gap-4 justify-between`}>{modal.ActionBar.map((Element) => Element)}</div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Modal;
