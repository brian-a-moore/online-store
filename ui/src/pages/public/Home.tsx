import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ListStoresPrivateQuery, ListStoresPublicBody, ListStoresPublicResponse } from '../../../../api/src/types/api';
import { Card, Grid } from '../../components/container';
import { Header, Loader } from '../../components/core';
import { H3 } from '../../components/typography';
import { HTTP_METHOD } from '../../constants';
import useApi from '../../hooks/useApi';

type Props = {};

export const Home: React.FC<Props> = () => {
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<ListStoresPublicBody, ListStoresPrivateQuery, ListStoresPublicResponse>(
    {
      url: `/store/list`,
      method: HTTP_METHOD.GET,
      params: { page: '1' },
    },
    { isPrivateEndpoint: false },
  );

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <Loader />;

  return (
    <div>
      <Header />
      <Grid>{response?.stores?.map((store) => <Store key={store.id} store={store} />)}</Grid>
    </div>
  );
};

const Store: React.FC<{
  store: {
    id: string;
    name: string;
    description: string | null;
    image: string | null;
  };
}> = ({ store }) => {
  return (
    <Card key={store.id}>
      {store.image ? <img src={store.image} alt={store.name} className="w-full h-48 object-cover rounded" /> : null}
      <H3 className="line-clamp-2" title={store.name}>
        {store.name}
      </H3>
      <p className="text-sm line-clamp-5 flex-1" title={store?.description || 'No Description'}>
        {store.description}
      </p>
      <Link to={`store/${store.id}`}>View Store</Link>
    </Card>
  );
};
