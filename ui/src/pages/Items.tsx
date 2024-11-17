import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getItems, TItem } from '../api';
import { Card, Grid } from '../components/container';
import { Button, Stepper } from '../components/interactive';
import { CartContext } from '../context/CartContext';
import { formatCurrency } from '../utils';

type Props = {};

const Items: React.FC<Props> = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  
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
  if (error) navigate(`/500?error=${error}`);

  return <Grid>{items?.map((item) => <Item key={item.itemId} item={item} />)}</Grid>;
};

const Item: React.FC<{ item: TItem }> = ({ item }) => {
  const { addItem } = useContext(CartContext);
  const [quantity, setQuantity] = useState<number>(1);

  // @ts-ignore
  const handleQuantityChange = (itemId: number, dir: '-' | '+') => {
    if (dir === '-' && quantity > 1) {
      setQuantity((prevState) => prevState - 1);
    }
    if (dir === '+' && quantity < item.maxQuantityPerOrder) {
      setQuantity((prevState) => prevState + 1);
    }
  };

  const addItemToCart = (item: TItem, quantity: number) => {
    setQuantity(1);
    addItem({ ...item, quantity });
  };

  return (
    <Card key={item.itemId}>
      {item.itemImage ? (
        <img src={item.itemImage} alt={item.itemName} className="w-full h-48 object-cover rounded" />
      ) : null}
      <h1 className="font-semibold line-clamp-2" title={item.itemName}>
        {item.itemName}
      </h1>
      <p className="text-sm line-clamp-5 flex-1" title={item.itemDescription}>
        {item.itemDescription}
      </p>
      <div className="flex justify-between">
        <p className="font-semibold">{formatCurrency(item.itemPrice)}</p>
        <Stepper item={{ ...item, quantity }} handleQuantityChange={handleQuantityChange} />
      </div>
      <Button onClick={() => addItemToCart(item, quantity)}>Add to Cart</Button>
    </Card>
  );
};

export default Items;
