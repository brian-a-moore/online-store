import {
  mdiClose,
  mdiDelete,
  mdiImageSearch,
  mdiResize,
  mdiRotateRight,
} from '@mdi/js';
import Icon from '@mdi/react';
import { SIZE } from '@sunami/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../api';
import { ModalContext } from '../../../context/ModalContext';
import { ToastContext } from '../../../context/ToastContext';
import { Separator } from '../../display';
import { Button } from '../../interactive';
import { ErrorText, H3 } from '../../typography';

type Props = {
  existingImage?: Blob | null;
  existingFilePath?: string | null;
  upload?: {
    storeId?: string;
    productId?: string;
    itemId?: string;
  };
  forceReload: () => void;
  rounded?: boolean;
};

export const UploadImageDashboardForm: React.FC<Props> = ({
  existingImage,
  existingFilePath,
  upload,
  rounded = false,
  forceReload,
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImage(acceptedFiles[0]);
    setScale(1);
    setRotation(0);
  }, []);
  const { closeModal, openModal } = useContext(ModalContext);
  const { setToast } = useContext(ToastContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Reference
  const ref = useRef<AvatarEditor | null>();

  // Dropzone
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  // Form State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Image State
  const [image, setImage] = useState<File | null>(null);
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (existingImage) {
      const file = new File([existingImage], 'avatar.png', {
        type: 'image/png',
      });
      setImage(file);
      onClear();
    }
  }, [existingImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file?.size > SIZE.MB * 2.5) {
      setError('File size should be less than 2.5MB');
      return;
    }
    if (file) {
      setImage(file);
      onClear();
    }
  };

  const updateRotation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRotation(parseFloat(e.target.value));
  };

  const updateScale = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScale(parseFloat(e.target.value));
  };

  const onClear = () => {
    setScale(1);
    setRotation(0);
    setError(null);
  };

  const updateImageMutation = useMutation({
    mutationFn: api.media.updateImageMedia,
    onError: (error) => {
      setError(error.message || 'An unknown error occurred');
      setIsSubmitting(false);
    },
    onSuccess: () => {
      setToast({
        type: 'success',
        message: `Image ${existingImage ? 'updated' : 'uploaded'} successfully`,
      });
      queryClient.refetchQueries({
        queryKey: ['get-image-media'],
      });
      closeModal();
      setIsSubmitting(false);
    },
  });

  const deleteImageMutation = useMutation({
    mutationFn: api.media.deleteImageMedia,
    onError: (error) => {
      setError(error.message || 'An unknown error occurred');
    },
    onSuccess: () => {
      setToast({
        type: 'success',
        message: 'Image removed successfully',
      });
      queryClient.refetchQueries({ queryKey: ['get-image-media'] });
      closeModal();
    },
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (ref.current) {
      const canvas = ref.current.getImage();
      canvas.toBlob(async (blob: Blob | null) => {
        if (blob) {
          const blobFile = new File([blob], 'image.png', {
            type: 'image/png',
          });
          updateImageMutation.mutate({ upload: upload!, image: blobFile });
        }
      });
    }
  };

  const openDeleteImageDialog = (filePath: string) => {
    const onClick = () => deleteImageMutation.mutate(filePath);
    openModal(
      <>
        <H3>Remove Image</H3>
        <p>Are you sure you want to remove this image?</p>
        <div className="flex justify-between">
          <Button variant="tertiary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onClick}>
            Remove Image
          </Button>
        </div>
      </>,
    );
  };

  return (
    <form
      className="flex flex-col flex-1 gap-4 overflow-hidden"
      onSubmit={onSubmit}
    >
      <div className="flex justify-between">
        <H3>Update Image</H3>
        {existingImage && existingFilePath ? (
          <div className="flex gap-4">
            <Button
              variant="tertiary"
              title="Remove Image"
              onClick={() => openDeleteImageDialog(existingFilePath)}
            >
              <Icon path={mdiDelete} size={0.75} />
            </Button>
          </div>
        ) : null}
      </div>
      <Separator />
      <div className="flex items-center justify-center">
        <div className={`flex flex-col gap-4 items-center`} {...getRootProps()}>
          <div className="bg-slate-200">
            <AvatarEditor
              backgroundColor="#CBD5E1"
              width={192}
              height={192}
              border={10}
              color={[100, 116, 139, 0.6]}
              borderRadius={rounded ? 125 : 0}
              image={image as File}
              scale={scale}
              rotate={rotation}
              // @ts-ignore
              ref={ref}
            />
          </div>
          {image && (
            <>
              <div className="flex gap-2 w-full max-w-[192px] items-center">
                <Icon path={mdiResize} size={1} color="#475569" />
                <input
                  className="flex-1 slider"
                  type="range"
                  min={1}
                  max={5}
                  step={0.1}
                  value={scale}
                  onChange={updateScale}
                />
              </div>
              <div className="flex gap-2 w-full max-w-[192px] items-center">
                <Icon path={mdiRotateRight} size={1} color="#475569" />
                <input
                  className="flex-1 slider"
                  type="range"
                  min={0}
                  max={356}
                  step={1}
                  value={rotation}
                  onChange={updateRotation}
                  {...getInputProps}
                />
              </div>
            </>
          )}
          <div className="flex w-full justify-center gap-4">
            <Button variant="tertiary" className="flex relative gap-4 text-sm">
              <Icon path={mdiImageSearch} size={0.75} color="#475569" />
              <p>Select Image</p>
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </Button>
            <Button
              disabled={!image}
              variant="destructive"
              className="text-sm"
              onClick={() => {
                setImage(null);
                onClear();
              }}
            >
              <Icon path={mdiClose} size={0.75} />
              <p>Clear Image</p>
            </Button>
          </div>
        </div>
      </div>
      {error && (
        <div className="flex justify-center">
          <ErrorText>{error}</ErrorText>
        </div>
      )}
      <Separator />
      <div className="flex justify-between">
        <Button variant="tertiary" onClick={closeModal}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting || !image}>
          {isSubmitting ? 'Updating Image...' : 'Update Image'}
        </Button>
      </div>
    </form>
  );
};
