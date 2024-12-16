import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api';
import { Card } from '../../components/container';
import { IconImage } from '../../components/display';
import { Link } from '../../components/interactive';
import { EmptyText, H2, H3 } from '../../components/typography';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const { error, isLoading, data } = useQuery({
    queryKey: ['list-stores-public'],
    queryFn: async () => api.store.listStoresPublic({ page: '1' }),
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <p>Loading...</p>;

  const stores = data?.stores;

  if (!stores || stores.length === 0) {
    return (
      <div className="flex flex-col gap-4 w-screen h-screen items-center justify-center">
        <H2>Not much going on right now...</H2>
        <EmptyText>
          There are no stores available, please check again later.
        </EmptyText>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full gap-4 p-4">
      {stores?.map((store) => <Store key={store.id} store={store} />)}
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
    <Card key={store.id} className="!flex-row items-center">
      <div>
        <IconImage
          image={store.image}
          name={store.name}
          rounded={false}
          size="xl"
        />
      </div>
      <div className="flex flex-col gap-4">
        <H3 className="line-clamp-2" title={store.name}>
          {store.name}
        </H3>
        {store.description ? (
          <p className="text-sm line-clamp-3 flex-1">{store.description}</p>
        ) : (
          <EmptyText>No description available for this store.</EmptyText>
        )}
        <Link href={`store/${store.id}`}>View Store</Link>
      </div>
    </Card>
  );
};
