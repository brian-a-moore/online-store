import { mdiImage } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useState } from 'react';
import { ModalContext } from '../../context/ModalContext';
import { UpdateImageButton } from '../interactive';

type Props = {
  className?: string;
  image?: string | null;
  name: string;
  rounded?: boolean;
  upload?: {
    storeId: string;
    productId?: string;
    itemId?: string;
  }
};
export const IconImage: React.FC<Props> = ({ className, image, name, rounded = true, upload }) => {
  const { openModal } = useContext(ModalContext);
  const [isHovered, setIsHovered] = useState(false);

  const openUploadForm = () => openModal(<p>Upload Form</p>);

  return (
    <div
      className={`relative bg-white flex items-center justify-center size-[132px] ${rounded ? 'rounded-full' : 'rounded-sm'} overflow-hidden shadow-md ${className} z-10`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {image ? (
        <img className="w-full h-full object-cover object-center" src={image} alt={name} />
      ) : (
        <div className="flex flex-col items-center justify-center opacity-30 bg-slate-200 w-full h-full">
          <Icon path={mdiImage} size={2} />
          <p className="text-sm font-semibold">No Image</p>
        </div>
      )}
      {upload && isHovered ? <UpdateImageButton onClick={openUploadForm} /> : null}
    </div>
  );
};
