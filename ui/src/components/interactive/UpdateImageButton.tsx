import { mdiCamera } from '@mdi/js';
import Icon from '@mdi/react';

type Props = {
  onClick: () => void;
};

export const UpdateImageButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className="absolute bg-slate-800 bg-opacity-50 top-0 left-0 z-20 flex w-full h-full items-center justify-center"
    >
      <div className="flex flex-col items-center animate-toastOpen">
        <Icon path={mdiCamera} size={1.5} color="#fff" />
        <p className="text-xs text-white">Update Image</p>
      </div>
    </button>
  );
};
