import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getStores, TStore } from '../../api';
import { Card, Grid } from '../../components/container';
import { ButtonLink } from '../../components/interactive';

type Props = {};

export const Home: React.FC<Props> = () => {
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [stores, setStores] = useState<TStore[] | null>(null);

  useEffect(() => {
    try {
      const fetchStores = async () => {
        try {
          const { stores } = await getStores();
          setStores(stores);
          setIsLoading(false);
        } catch (e: any | unknown) {
          setError(e.message);
        }
      };
      fetchStores();
    } catch (e: any | unknown) {
      setError(e.message);
    }
  }, []);

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
      <Grid>{stores?.map((store) => <Store key={store.id} store={store} />)}</Grid>
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
