import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GetImageMediaBody,
  GetImageMediaQuery,
  GetImageMediaResponse,
} from '../../../../api/src/types/api';
import { HTTP_METHOD } from '../../constants';
import { ModalContext } from '../../context/ModalContext';
import useApi from '../../hooks/useApi';
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
  ['xs', 'size-[24px]'],
  ['sm', 'size-[48px]'],
  ['md', 'size-[64px]'],
  ['lg', 'size-[96px]'],
  ['xl', 'size-[132px]'],
]);

export const IconImage: React.FC<Props> = ({
  className,
  image,
  name,
  size = 'xl',
  rounded = true,
  upload,
}) => {
  const { openModal } = useContext(ModalContext);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const imageSize = sizeMap.get(size)!;

  const { error, isLoading, response } = useApi<
    GetImageMediaBody,
    GetImageMediaQuery,
    GetImageMediaResponse
  >({
    method: HTTP_METHOD.GET,
    url: '/media',
    params: {
      ...(image && { filePath: image }),
    },
  });

  const openUploadForm = () =>
    openModal(
      <UploadImageDashboardForm
        existingImage={response}
        upload={upload}
        forceReload={() => {}}
      />,
    );

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div
      className={`relative bg-white flex items-center justify-center border ${imageSize} ${rounded ? 'rounded-full' : 'rounded-sm'} overflow-hidden  ${className} z-10`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        className="w-full h-full object-contain"
        src={URL.createObjectURL(response!)}
        alt={name}
      />
      {upload && isHovered ? (
        <UpdateImageButton onClick={openUploadForm} />
      ) : null}
    </div>
  );
};
