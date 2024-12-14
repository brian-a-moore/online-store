import {
  mdiBarcode,
  mdiBarcodeOff,
  mdiStore,
  mdiStoreOff,
  mdiTag,
  mdiTagOff,
} from '@mdi/js';
import Icon from '@mdi/react';

type PathType = 'store' | 'product' | 'item';

type Props = {
  pathType: PathType;
  isPublished: boolean;
  longForm?: boolean;
  invert?: boolean;
};

const pathMap = new Map<PathType, [string, string]>([
  ['store', [mdiStore, mdiStoreOff]],
  ['product', [mdiTag, mdiTagOff]],
  ['item', [mdiBarcode, mdiBarcodeOff]],
]);

export const IsPublished: React.FC<Props> = ({
  pathType,
  isPublished,
  longForm = false,
  invert = false,
}) => {
  return (
    <div
      className={`flex items-center gap-2 ${isPublished ? '' : 'text-red-400'}`}
    >
      <Icon
        path={pathMap.get(pathType)![isPublished ? 0 : 1]}
        size={0.75}
        title={isPublished ? 'Public' : 'Unlisted'}
      />
      {longForm && (
        <p className={invert ? ' text-white' : ''}>
          {isPublished ? 'Public' : 'Unlisted'}
        </p>
      )}
    </div>
  );
};
