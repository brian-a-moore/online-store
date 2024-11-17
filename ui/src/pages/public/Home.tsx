import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getStores, TStore } from '../../api';
import { Card, Grid } from '../../components/container';

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

  if (isLoading) return <h1>Loading...</h1>;
  if (error) navigate(`/500?error=${error}`);

  return <Grid>{stores?.map((store) => <Store key={store.storeId} store={store} />)}</Grid>;
};

const Store: React.FC<{ store: TStore }> = ({ store }) => {
  return (
    <Card key={store.storeId}>
      {store.storeImage ? (
        <img src={store.storeImage} alt={store.storeName} className="w-full h-48 object-cover rounded" />
      ) : null}
      <h1 className="font-semibold line-clamp-2" title={store.storeName}>
        {store.storeName}
      </h1>
      <p className="text-sm line-clamp-5 flex-1" title={store.storeDescription}>
        {store.storeDescription}
      </p>
      <Link to={`store/${store.storeId}`}>View Store</Link>
    </Card>
  );
};
