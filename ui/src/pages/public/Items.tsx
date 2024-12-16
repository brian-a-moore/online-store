import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../api';
import { Card } from '../../components/container';
import { IconImage } from '../../components/display';
import { FixedPriceItem, VariablePriceItem } from '../../components/store';
import { EmptyText } from '../../components/typography';
import { CartContext, TCartItem } from '../../context/CartContext';

export const Items: React.FC = () => {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();

  const { error, isLoading, data } = useQuery({
    queryKey: ['list-items-public', productId],
    queryFn: async () =>
      api.item.listItemsPublic({ productId: productId!, page: '1' }),
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <p>Loading...</p>;

  const items = data?.items;

  if (!items || items.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <EmptyText>
          There are no items available right now, please check again later.
        </EmptyText>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full gap-4 p-4">
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
};

const Item: React.FC<{
  item: {
    id: string;
    name: string;
    description: string | null;
    image: string | null;
    product: {
      name: string;
    };
    itemTypeId: number;
    maxQuantityPerOrder: number;
    config: any;
  };
}> = ({ item }) => {
  const { addItem } = useContext(CartContext);
  const addItemToCart = (item: TCartItem) => addItem(item);

  return (
    <Card key={item.id}>
      <div className="flex mx-auto">
        <IconImage
          image={item.image}
          name={item.product.name}
          rounded={false}
          size="xl"
        />
      </div>
      {item.itemTypeId === 1 ? (
        <FixedPriceItem item={item} addItemToCart={addItemToCart} />
      ) : (
        <VariablePriceItem item={item} addItemToCart={addItemToCart} />
      )}
    </Card>
  );
};
