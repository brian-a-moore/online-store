import { useEffect, useState } from 'react';
import { Outlet, Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { getStore, getStores, TStore } from '../../api';
import { Card } from '../../components/container';
import { ButtonLink, Link } from '../../components/interactive';

type StoreLayoutProps = {};

export const StoreLayout: React.FC<StoreLayoutProps> = () => {
  return (
    <div>
      <nav className="bg-teal-700 flex gap-4 p-4">
        <Link href=".">About Store</Link>
        <Link href="product/list">View Products</Link>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

type StoreHomeProps = {};

export const StoreHome: React.FC<StoreHomeProps> = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [store, setStore] = useState<TStore | null>(null);

  useEffect(() => {
    try {
      const fetchStore = async () => {
        try {
          const { store } = await getStore(storeId!);
          if(!store) throw new Error('Store not found');
          setStore(store);
          setIsLoading(false);
        } catch (e: any | unknown) {
          setError(e.message);
        }
      };
      fetchStore();
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
      <h1>{store!.name}</h1>
      <Link href="edit">Edit Store</Link>
      <Link href="..">Back</Link>
    </div>
  );
};

type StoreEditProps = {};

export const StoreEdit: React.FC<StoreEditProps> = () => {
  return (
    <div>
      <h1>Edit Store</h1>
      <Link href="..">Back</Link>
    </div>
  );
};

type StoreListProps = {};

export const StoreList: React.FC<StoreListProps> = () => {
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
      <ButtonLink href="../store/new">New Store</ButtonLink>
      <div className="flex flex-col p-4 gap-4">
        {stores?.map((store) => (
          <RouterLink key={store.id} to={`../store/${store.id}`}>
            <Card>
              <p>{store.name}</p>
            </Card>
          </RouterLink>
        ))}
      </div>
    </div>
  );
};
