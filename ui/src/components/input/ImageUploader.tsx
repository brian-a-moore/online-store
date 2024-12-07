import { mdiDelete, mdiImageSearch, mdiResize, mdiRotateRight } from '@mdi/js';
import Icon from '@mdi/react';
import { SIZE } from '@sunami/constants';
import { useCallback, useEffect, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { useDropzone } from 'react-dropzone';
import { Button } from '../interactive';
import { ErrorText } from '../typography';

type Props = {
  existingImage?: string;
  rounded?: boolean;
  onUpload: (file: File) => void;
  config?: 'image' | 'bannerImage';
};

const sizeConfigs = {
  image: {
    componentSize: 'w-[270px]',
    width: 250,
    height: 250,
  },
  bannerImage: {
    componentSize: 'w-[670px]',
    width: 650,
    height: 100,
  },
};

export const ImageUploader: React.FC<Props> = ({ existingImage, config = 'image', rounded = false, onUpload }) => {
  const [image, setImage] = useState<string | File | null>(null);
  const [scale, setScale] = useState(1);
  const [roatation, setRotation] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const ref = useRef();

  useEffect(() => {
    if (existingImage) setImage(existingImage);
  }, [existingImage]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImage(acceptedFiles[0]);
    setScale(1);
    setRotation(0);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file?.size > SIZE.MB * 2.5) {
      setError('File size should be less than 2.5MB');
      return;
    }
    if (file) {
      setImage(file);
      setScale(1);
      setRotation(0);
      setError(null);
    }
  };

  const updateScale = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScale(parseFloat(e.target.value));
  };

  const updateRotation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRotation(parseFloat(e.target.value));
  };

  const onClear = () => {
    setImage(null);
    setScale(1);
    setRotation(0);
    setError(null);
  };

  const onSave = () => {
    if (ref.current) {
      // @ts-ignore
      const canvas = ref.current.getImageScaledToCanvas();
      canvas.toBlob((blob: Blob | null) => {
        if (blob) {
          const file = new File([blob], 'avatar.png', { type: 'image/png' });
          onUpload(file);
        }
      });
    }
  };

  return (
    <div className={`flex flex-col gap-4 items-center ${sizeConfigs[config].componentSize}`} {...getRootProps()}>
      <div className="bg-slate-300">
        <AvatarEditor
          backgroundColor="#CBD5E1"
          width={sizeConfigs[config].width}
          height={sizeConfigs[config].height}
          border={10}
          color={[100, 116, 139, 0.6]}
          borderRadius={rounded && config === 'image' ? 125 : 0}
          image={image as File}
          scale={scale}
          rotate={roatation}
          // @ts-ignore
          ref={ref}
        />
      </div>
      <div className="flex gap-2 w-full max-w-96 items-center">
        <Icon path={mdiResize} size={1} color="#475569" />
        <input className="flex-1 slider" type="range" min={1} max={5} step={0.1} value={scale} onChange={updateScale} />
      </div>
      <div className="flex gap-2 w-full max-w-96 items-center">
        <Icon path={mdiRotateRight} size={1} color="#475569" />
        <input
          className="flex-1 slider"
          type="range"
          min={0}
          max={356}
          step={1}
          value={roatation}
          onChange={updateRotation}
          {...getInputProps}
        />
      </div>
      <div className="flex w-full justify-center gap-4">
        <Button variant="secondary" className="flex relative gap-4 text-sm">
          <Icon path={mdiImageSearch} size={0.75} color="#475569" />
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </Button>
        <Button disabled={!image} variant="destructive" className="text-sm" onClick={onClear}>
          <Icon path={mdiDelete} size={0.75} />
        </Button>
      </div>
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
};
