import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetStoreDashboardBody, GetStoreDashboardParams, GetStoreDashboardResponse } from '../../../../api/src/types/api';
import { HTTP_METHOD } from '../../constants';
import useApi from '../../hooks/useApi';
import { Loader } from '../core';

type Props = {
    storeId?: string;
};

export const StoreForm: React.FC<Props> = ({ storeId }) => {
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<GetStoreDashboardBody, GetStoreDashboardParams, GetStoreDashboardResponse>(
    {
      method: HTTP_METHOD.GET,
      url: `/dashboard/store/${storeId}`,
    },
    { isAutoTriggered: !!storeId },
  );

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <Loader />;

  return (
    <form>
      <h1>Store Form</h1>
      <p>{JSON.stringify(response?.store)}</p>
    </form>
  );
};
