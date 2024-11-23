import { mdiImage } from '@mdi/js';
import Icon from '@mdi/react';

type Props = {
  className?: string;
  image?: string | null;
  name: string;
};
export const BannerImage: React.FC<Props> = ({ className, image, name }) => {
  return (
    <div className={` banner-shadow bg-slate-200 flex items-center justify-center w-full h-40 ${className}`}>
      {image ? (
        <img className="w-full h-full object-cover object-center" src={image} alt={name} />
      ) : (
        <div className="flex flex-col items-center opacity-30">
          <Icon path={mdiImage} size={2} />
          <p className="text-sm font-semibold">No Image</p>
        </div>
      )}
    </div>
  );
};
