import Icon from '@mdi/react';

type Props = {
  onClick: () => void;
  label: string;
  path: string;
};

export const FloatingActionButton: React.FC<Props> = ({ label, path, onClick }) => {
  return (
    <div className='fixed bottom-0 left-0 w-screen pointer-events-none'>
      <div className='relative mx-auto w-full max-w-[960px] pointer-events-none'>
      <button
        className="absolute bottom-4 right-4 bg-sky-600 hover:bg-sky-700 p-6 rounded-full shadow-lg z-30 pointer-events-auto"
        title={label}
        onClick={onClick}
      >
        <Icon path={path} size={1.5} color="white" />
      </button>
      </div>
    </div>
  );
};
