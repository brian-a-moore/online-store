import { useContext, useState } from 'react';
import { ModalContext } from '../../../context/ModalContext';
import { ToastContext } from '../../../context/ToastContext';
import { Separator } from '../../display';
import { ImageUploader } from '../../input';
import { Button } from '../../interactive';
import { ErrorText, H3 } from '../../typography';
// import { api } from '../../../api';

type Props = {
  existingImage?: string;
  imageType?: 'image' | 'bannerImage';
  upload?: {
    storeId: string;
    productId?: string;
    itemId?: string;
  };
  forceReload: () => void;
};

export const UploadImageDashboardForm: React.FC<Props> = ({ existingImage, imageType = 'image', forceReload }) => {
  const { closeModal } = useContext(ModalContext);
  const { setToast } = useContext(ToastContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [_, setImage] = useState<File | null>(null);

  const onUpload = async (file: File) => {
    setImage(file);
  };

  const onSubmit = async () => {
    try {
      //   await api.dashboard.updateImage(upload, image);
      closeModal();
      forceReload();
      setToast({ type: 'success', message: `Image ${existingImage ? 'updated' : 'uploaded'} successfully` });
    } catch (error: any | unknown) {
      setFormError(error?.response?.data?.message || 'An unknown error occurred: Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="flex flex-col flex-1 gap-4 overflow-hidden" onSubmit={() => onSubmit()}>
      <H3>{existingImage ? 'Update' : 'Upload'} Image</H3>
      <Separator />
      <div className="flex items-center justify-center">
        {/* TODO: The image uploader is too big for the form in banner style */}
        <ImageUploader
          existingImage={existingImage}
          config={imageType}
          rounded={imageType === 'image'}
          onUpload={onUpload}
        />
      </div>
      {formError && <ErrorText>{formError}</ErrorText>}
      <Separator />
      <div className="flex justify-between">
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (existingImage ? 'Updating' : 'Uploading') : existingImage ? 'Update' : 'Upload'} Image
        </Button>
      </div>
    </form>
  );
};
