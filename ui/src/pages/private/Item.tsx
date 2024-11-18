import { useEffect, useState } from 'react';
import { Outlet, Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { getItems, TDisplayItem } from '../../api';
import { Card } from '../../components/container';
import { ButtonLink, Link } from '../../components/interactive';

type ItemLayoutProps = {};

export const ItemLayout: React.FC<ItemLayoutProps> = () => {
  return (
    <div>
      <nav className="bg-teal-900 flex gap-4 p-4">
        <Link href=".">About Item</Link>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

type ItemHomeProps = {};

export const ItemHome: React.FC<ItemHomeProps> = () => {
  return (
    <div>
      <h1>About Item</h1>
      <Link href="edit">Edit Item</Link>
      <Link href="..">Back</Link>
    </div>
  );
};

type ItemEditProps = {};

export const ItemEdit: React.FC<ItemEditProps> = () => {
  return (
    <div>
      <h1>Edit Item</h1>
      <Link href="..">Back</Link>
    </div>
  );
};

type ItemListProps = {};

export const ItemList: React.FC<ItemListProps> = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<TDisplayItem[] | null>(null);

  useEffect(() => {
    try {
      const fetchItems = async () => {
        try {
          const { items } = await getItems(productId!);
          setItems(items);
          setIsLoading(false);
        } catch (e: any | unknown) {
          setError(e.message);
        }
      };
      fetchItems();
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
      <ButtonLink href="../item/new">New Item</ButtonLink>
      <div className="flex flex-col p-4 gap-4">
        {items?.map((item) => (
          <RouterLink key={item.id} to={`../item/${item.id}`}>
            <Card>
              <p>{item.name}</p>
            </Card>
          </RouterLink>
        ))}
      </div>
    </div>
  );
};
