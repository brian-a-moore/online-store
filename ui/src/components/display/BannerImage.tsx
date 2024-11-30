import { mdiImage } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useState } from 'react';
import { ModalContext } from '../../context/ModalContext';
import { UploadImageDashboardForm } from '../form';
import { UpdateImageButton } from '../interactive';

type Props = {
  className?: string;
  image?: string | null;
  name: string;
  upload?: {
    storeId: string;
    productId?: string;
    itemId?: string;
  }
};
export const BannerImage: React.FC<Props> = ({ className, image, name, upload }) => {
  const { openModal } = useContext(ModalContext);
  const [isHovered, setIsHovered] = useState(false);

  // TODO: We need to pass a forceUpload function here
  const openUploadForm = () => openModal(<UploadImageDashboardForm existingImage={image || ''} imageType='bannerImage' upload={upload} forceReload={() => {}} />);

  return (
    <div className={` banner-shadow bg-slate-200 flex items-center justify-center w-full h-40 md:h-52 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      {image ? (
        <img className="w-full h-full object-cover object-center" src={image} alt={name} />
      ) : (
        <div className="flex flex-col items-center opacity-30">
          <Icon path={mdiImage} size={2} />
          <p className="text-sm font-semibold">No Image</p>
        </div>
      )}
      {upload && isHovered ? <UpdateImageButton onClick={openUploadForm} /> : null}
    </div>
  );
};
