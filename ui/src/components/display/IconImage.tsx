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
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: boolean;
  upload?: {
    storeId: string;
    productId?: string;
    itemId?: string;
  };
};

const sizeMap = new Map([
  ['xs', ['size-[24px]', 'text-xs', 0.5, 'gap-0']],
  ['sm', ['size-[48px]', 'text-xxs', 0.5, 'gap-0']],
  ['md', ['size-[64px]', 'text-xxs', 0.5, 'gap-2']],
  ['lg', ['size-[96px]', 'text-sm', 1, 'gap-2']],
  ['xl', ['size-[132px]', 'text-sm', 2, 'gap-2']],
]);

export const IconImage: React.FC<Props> = ({ className, image, name, size = 'xl', rounded = true, upload }) => {
  const { openModal } = useContext(ModalContext);
  const [isHovered, setIsHovered] = useState(false);

  const [imageSize, textSize, iconSize, gapSize] = sizeMap.get(size)!;

  const openUploadForm = () =>
    openModal(<UploadImageDashboardForm existingImage={image || ''} upload={upload} forceReload={() => {}} />);

  return (
    <div
      className={`relative bg-white flex items-center justify-center border ${imageSize} ${rounded ? 'rounded-full' : 'rounded-sm'} overflow-hidden  ${className} z-10`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {image ? (
        <img className="w-full h-full text-xs object-contain" src={image} alt={name} />
      ) : (
        <div className={`flex flex-col ${gapSize} items-center justify-center bg-slate-200 w-full h-full`}>
          <Icon path={mdiImage} size={iconSize} color="#94A3B8" />
          {size !== 'xs' && <p className={`${textSize} text-slate-400 font-semibold`}>No Image</p>}
        </div>
      )}
      {upload && isHovered ? <UpdateImageButton onClick={openUploadForm} /> : null}
    </div>
  );
};
