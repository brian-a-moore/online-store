import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getItems, TItem } from '../api';
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
    <div>
      <h2>{'Product > Items'}</h2>
      <hr />
      <ul>{items?.map((item) => <Item key={item.itemId} item={item} />)}</ul>
    </div>
  );
};

const Item: React.FC<{ item: TItem }> = ({ item }) => {
  const { addItem } = useContext(CartContext);
  const [quantity, setQuantity] = useState<number>(1);

  const updateQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  const addItemToCart = (item: TItem, quantity: number) => {
    addItem({ ...item, quantity });
  };

  return (
    <div key={item.itemId}>
      <h1>{item.itemName}</h1>
      <p>{item.itemDescription}</p>
      <p>{formatCurrency(item.itemPrice)}</p>
      <hr />
      <label>Qty.</label>
      <input type="number" name="quantity" value={quantity} onChange={updateQuantity} />
      <button onClick={() => addItemToCart(item, quantity)}>Add to Cart</button>
    </div>
  );
};

export default Items;
