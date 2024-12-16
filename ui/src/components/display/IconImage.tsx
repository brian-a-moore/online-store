import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetImageMediaQuery } from '../../../../api/src/types/api';
import { api } from '../../api';
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
  ['xs', 'size-6'],
  ['sm', 'size-12'],
  ['md', 'size-16'],
  ['lg', 'size-24'],
  ['xl', 'size-32'],
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
  const [params, setParams] = useState<GetImageMediaQuery>({});

  useEffect(() => {
    if (image) setParams({ filePath: image });
  }, [image]);

  const imageSize = sizeMap.get(size)!;

  const { error, isLoading, data } = useQuery({
    queryKey: ['get-image-media', params],
    queryFn: () => api.media.getImageMedia(params),
  });

  const openUploadForm = () =>
    openModal(
      <UploadImageDashboardForm
        existingImage={data}
        existingFilePath={image}
        upload={upload}
        forceReload={() => {}}
      />,
    );

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading || !data) return <p>Loading...</p>;

  return (
    <div
      className={`relative bg-white flex items-center justify-center border ${imageSize} ${rounded ? 'rounded-full' : 'rounded-sm'} overflow-hidden  ${className} z-10`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        className="w-full h-full object-contain"
        src={URL.createObjectURL(data)}
        alt={name}
      />
      {upload && isHovered ? (
        <UpdateImageButton onClick={openUploadForm} />
      ) : null}
    </div>
  );
};
