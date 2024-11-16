import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getItems, TItem } from '../api';
import { Button, Stepper } from '../components/interactive';
import { CartContext } from '../context/CartContext';
import { formatCurrency } from '../utils';

type Props = {};

const Items: React.FC<Props> = () => {
  const { productId } = useParams<{ productId: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<TItem[] | null>(null);

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

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  return (
    <div className="grid gap-4 p-4 mx-auto w-full max-w-[960px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {items?.map((item) => <Item key={item.itemId} item={item} />)}
    </div>
  );
};

const Item: React.FC<{ item: TItem }> = ({ item }) => {
  const { addItem } = useContext(CartContext);
  const [quantity, setQuantity] = useState<number>(1);

  // @ts-ignore
  const handleQuantityChange = (itemId: number, dir: '-' | '+') => {
      if (dir === '-' && quantity > 1) {
        setQuantity(prevState => prevState - 1);
      }
      if (dir === '+' && quantity < item.maxQuantityPerOrder) {
        setQuantity(prevState => prevState + 1);
      }
  };

  const addItemToCart = (item: TItem, quantity: number) => {
    setQuantity(1);
    addItem({ ...item, quantity });
  };

  return (
    <div key={item.itemId} className="flex flex-col bg-white border-2 rounded shadow-md flex-1 gap-4 p-4">
      {item.itemImage ? (
        <img src={item.itemImage} alt={item.itemName} className="w-full h-48 object-cover rounded" />
      ) : null}
      <h1 className="font-semibold line-clamp-1" title={item.itemName}>
        {item.itemName}
      </h1>
      <p className="text-sm line-clamp-3 flex-1" title={item.itemDescription}>
        {item.itemDescription}
      </p>
      <div className="flex justify-between">
        <p className="font-semibold">{formatCurrency(item.itemPrice)}</p>
        <Stepper item={{...item, quantity }} handleQuantityChange={handleQuantityChange} />
      </div>
      <Button onClick={() => addItemToCart(item, quantity)}>Add to Cart</Button>
    </div>
  );
};

export default Items;
