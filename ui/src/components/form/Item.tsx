import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetItemBody, GetItemParams, GetItemResponse } from '../../../../api/src/types/api';
import { HTTP_METHOD } from '../../constants';
import useApi from '../../hooks/useApi';
import { Loader } from '../core';

type Props = {
  storeId?: string;
  productId?: string;
  itemId?: string;
};

export const ItemForm: React.FC<Props> = ({ storeId, productId, itemId }) => {
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<GetItemBody, GetItemParams, GetItemResponse>(
    {
      method: HTTP_METHOD.GET,
      url: `/admin/store/${storeId}/product/${productId}/item/${itemId}`,
    },
    { isAutoTriggered: !!storeId && !!productId && !!itemId },
  );

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <Loader />;
  return (
    <form>
      <h1>Item Form</h1>
      <p>{JSON.stringify(response?.item)}</p>
    </form>
  );
};
