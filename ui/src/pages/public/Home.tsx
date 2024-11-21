import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TStore } from '../../api';
import { Card, Grid } from '../../components/container';
import { ButtonLink } from '../../components/interactive';
import { HTTP_METHOD } from '../../constants';
import useApi from '../../hooks/useApi';

type Props = {};

export const Home: React.FC<Props> = () => {
  const navigate = useNavigate();
  
  const { error, isLoading, response } = useApi<any, any, any>({
    url: `/store/list`,
    method: HTTP_METHOD.GET,
    params: { page: 1 },
  }, true);

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <header className='bg-teal-600 flex items-center justify-between p-4'>
        <h1 className='text-white'>Online Store</h1>
        <ButtonLink href="login">Login</ButtonLink>
      </header>
      <Grid>{response?.stores?.map((store: any) => <Store key={store.id} store={store} />)}</Grid>
    </div>
  );
};

const Store: React.FC<{ store: TStore }> = ({ store }) => {
  return (
    <Card key={store.id}>
      {store.image ? (
        <img src={store.image} alt={store.name} className="w-full h-48 object-cover rounded" />
      ) : null}
      <h1 className="font-semibold line-clamp-2" title={store.name}>
        {store.name}
      </h1>
      <p className="text-sm line-clamp-5 flex-1" title={store.description}>
        {store.description}
      </p>
      <Link to={`store/${store.id}`}>View Store</Link>
    </Card>
  );
};
