import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getStores, Store } from '../api';

type Props = {};

const Home: React.FC<Props> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [stores, setStores] = useState<Store[] | null>(null);

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
  if (error) return <h1>Error: {error}</h1>;

  return (
    <div>
      <h1>Home</h1>
      <hr />
      <h2>Stores</h2>
      <hr />
      <ul>
        {stores?.map((store) => (
          <Link to={`/store/${store.storeId}`} key={store.storeId}>
            {store.storeName}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Home;
