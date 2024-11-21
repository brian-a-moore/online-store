import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TDisplayDonationItem, TDisplayItem, TDisplayMerchandiseItem, TDisplayTicketItem } from '../../api';
import { Card, Grid } from '../../components/container';
import { Button, Stepper } from '../../components/interactive';
import { HTTP_METHOD } from '../../constants';
import { CartContext, TCartItem } from '../../context/CartContext';
import useApi from '../../hooks/useApi';
import { formatCurrency } from '../../utils';

type Params = {
  storeId: string;
  productId: string;
};
type Props = {};

export const Items: React.FC<Props> = () => {
  const { storeId, productId } = useParams<Params>();
  const navigate = useNavigate();
  
  const { error, isLoading, response } = useApi<any, any, any>({
    url: `/store/${storeId}/product/${productId}/item/list`,
    method: HTTP_METHOD.GET,
    params: { page: 1 },
  }, true);

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <h1>Loading...</h1>;

  return <Grid>{response?.items?.map((item: any) => <ItemContainer key={item.id} item={item} />)}</Grid>;
};

const ItemContainer: React.FC<{ item: TDisplayItem }> = ({ item }) => {
  const { addItem } = useContext(CartContext);

  const addItemToCart = (item: TCartItem) => addItem(item);

  const showItemType = (item: TDisplayItem) => {
    switch(item.itemType) {
      case 'ticket':
        return <TicketItem item={item as TDisplayTicketItem} addItemToCart={addItemToCart} />;
      case 'merchandise':
        return <MerchandiseItem item={item as TDisplayMerchandiseItem} addItemToCart={addItemToCart} />;
      case 'donation':
        return <DonationItem item={item as TDisplayDonationItem} addItemToCart={addItemToCart} />;
      default:
        return null;
    };
  };
  return (
      <Card key={item.id}>
      {item.image ? (
        <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded" />
      ) : null}
      <h1 className="font-semibold line-clamp-2" title={item.name}>
        {item.name}
      </h1>
      <p className="text-sm line-clamp-5 flex-1" title={item.description}>
        {item.description}
      </p>
      {showItemType(item)}
    </Card>
  )
};

const TicketItem: React.FC<{ item: TDisplayTicketItem, addItemToCart: (item: TCartItem) => void }> = ({ item, addItemToCart }) => {
  const [quantity, setQuantity] = useState<number>(1);

  // @ts-ignore
  const handleQuantityChange = (itemId: string, dir: '-' | '+') => {
    if (dir === '-' && quantity > 1) {
      setQuantity((prevState) => prevState - 1);
    }
    if (dir === '+' && quantity < item.maxQuantityPerOrder) {
      setQuantity((prevState) => prevState + 1);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <p className="font-semibold">{formatCurrency(item.price)}</p>
        <Stepper item={{ ...item, quantity }} handleQuantityChange={handleQuantityChange} />
      </div>
      <Button onClick={() => {
        addItemToCart({
          id: item.id,
          name: item.name,
          product: item.product,
          price: item.price,
          quantity,
          maxQuantityPerOrder: item.maxQuantityPerOrder,
        });
        setQuantity(1);
      }}>Add to Cart</Button>
    </>
  );
};

const MerchandiseItem: React.FC<{ item: TDisplayMerchandiseItem, addItemToCart: (item: TCartItem) => void }> = ({ item, addItemToCart }) => {
  const [quantity, setQuantity] = useState<number>(1);

  // @ts-ignore
  const handleQuantityChange = (itemId: string, dir: '-' | '+') => {
    if (dir === '-' && quantity > 1) {
      setQuantity((prevState) => prevState - 1);
    }
    if (dir === '+' && quantity < item.maxQuantityPerOrder) {
      setQuantity((prevState) => prevState + 1);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <p className="font-semibold">{formatCurrency(item.price)}</p>
        <Stepper item={{ ...item, quantity }} handleQuantityChange={handleQuantityChange} />
      </div>
      <Button onClick={() => {
        addItemToCart({
          id: item.id,
          name: item.name,
          product: item.product,
          price: item.price,
          quantity,
          maxQuantityPerOrder: item.maxQuantityPerOrder,
        });
        setQuantity(1);
      }}>Add to Cart</Button>
    </>
  );
};

const DonationItem: React.FC<{ item: TDisplayDonationItem, addItemToCart: (item: TCartItem) => void  }> = ({ item, addItemToCart }) => {
  const [customAmount, setCustomAmount] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setCustomAmount(value < item.amountMin ? item.amountMin : value > item.amountMax ? item.amountMax : value);
  };
  return(
    <>
      {item.presetAmounts.length ? (
        <div className='flex flex-wrap gap-2'>
          {item.presetAmounts.map((amount) => <Button variant='secondary' key={amount} onClick={() => setCustomAmount(amount)}>{formatCurrency(amount)}</Button>)}
        </div>
      ) : null}
      <div className='flex justify-center'>
        {'$'}<input type="number" onChange={handleChange} min={item.amountMin} step={1} max={item.amountMax} value={customAmount} />{'.00'}
      </div>
      <Button disabled={customAmount < 1} onClick={() => {
        addItemToCart({
          id: item.id,
          name: item.name,
          product: item.product,
          price: customAmount,
          quantity: 1,
          maxQuantityPerOrder: item.maxQuantityPerOrder,
        });
        setCustomAmount(0);
      }}>Add to Cart</Button>
    </>
  )
};