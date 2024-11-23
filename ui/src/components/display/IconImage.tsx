import { mdiImage } from '@mdi/js';
import Icon from '@mdi/react';

type Props = {
  className?: string;
  image?: string | null;
  name: string;
  rounded?: boolean;
};
export const IconImage: React.FC<Props> = ({ className, image, name, rounded = true }) => {
  return (
    <div
      className={`bg-slate-200 flex items-center justify-center size-[132px] ${rounded ? 'rounded-full' : 'rounded-sm'} overflow-hidden shadow-md ${className}`}
    >
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
