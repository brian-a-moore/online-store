import { mdiDelete, mdiPlusBoxMultiple } from '@mdi/js';
import Icon from '@mdi/react';
import { useEffect, useState } from 'react';
import { Button } from '../../interactive';
import { EmptyText } from '../../typography';
import ErrorText from '../ErrorText';

type Props = {
  defaultValue?: File;
};

const ImageUploader: React.FC<Props> = ({ defaultValue }) => {
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (!e.target.files || !e.target.files.length) return;
    const images = Array.from(e.target.files);
    setImage(images[0]);
  };

  const removeImage = () => {
    setError(null);
    setImage(null);
  };

  useEffect(() => {
    if(defaultValue) setImage(defaultValue);
  }, [defaultValue]);

  return (
    <div className="flex flex-col gap-y-4 items-center w-full">
      <div className="flex flex-wrap items-center justify-center px-4 gap-4 w-full max-w-[53rem] max-h-[316px] overflow-y-auto">
        {image ? (
          <div
            className="bg-[rgba(0,0,0,0.3)] relative size-[150px] overflow-hidden flex items-center justify-center"
          >
            <div className="absolute top-2 right-2 z-[+1]">
              <Button
                title="Delete Image"
                className="shadow-sm"
                variant="destructive"
                onClick={removeImage}
              >
                <Icon path={mdiDelete} size={0.75} color="#fff" />
              </Button>
            </div>
            <img src={URL.createObjectURL(image)} alt={image.name} />
          </div>
        ) : (<div className="p-4">
            <EmptyText>No Images Added</EmptyText>
          </div>)}
      </div>
      <div>
        <Button disabled={!!image} className="relative flex gap-x-4">
          <Icon path={mdiPlusBoxMultiple} size={1} />
          Upload Image
          <input
            type="file"
            accept="image/*"
            onChange={handleUpdate}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </Button>
      </div>
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
};

export default ImageUploader;
