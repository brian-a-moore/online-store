import { mdiCart, mdiClose, mdiHome } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { GetStorePublicBody, GetStorePublicQuery, GetStorePublicResponse } from '../../../../api/src/types/api';
import { Cart } from '../../components/core';
import { IconImage } from '../../components/display';
import { Button, ButtonLink } from '../../components/interactive';
import { H4 } from '../../components/typography';
import { HTTP_METHOD } from '../../constants';
import { CartContext, CartProvider } from '../../context/CartContext';
import useApi from '../../hooks/useApi';
import { totalItems } from '../../utils';

export const Store: React.FC = () => {
  const { storeId } = useParams<{ storeId: string }>();
  const navigate = useNavigate();
  const [showCart, setShowCart] = useState(false);

  const toggleCart = () => setShowCart((prevState) => !prevState);

  const { error, isLoading, response } = useApi<GetStorePublicBody, GetStorePublicQuery, GetStorePublicResponse>(
    {
      url: `/public/store/${storeId}`,
      method: HTTP_METHOD.GET,
    },
    { isPrivateEndpoint: false },
  );

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <p>Loading...</p>;

  const store = response?.store;

  return (
    <CartProvider>
      <div className="fixed top-0 left-0 w-screen h-screen flex flex-col">
        <Header store={store} toggleCart={toggleCart} isCartVisible={showCart} />
        <div className="flex flex-1">
          <main className="flex flex-1 overflow-y-auto">
            <div className="w-full">
              <Outlet />
            </div>
          </main>
          <Cart isVisible={showCart} />
        </div>
      </div>
    </CartProvider>
  );
};

type HeaderProps = {
  store:
    | {
        id: string;
        name: string;
        description: string | null;
        image: string | null;
      }
    | undefined;
  isCartVisible: boolean;
  toggleCart: () => void;
};

const Header: React.FC<HeaderProps> = ({ store, isCartVisible, toggleCart }) => {
  const { items } = useContext(CartContext);

  return (
    <header className="relative flex p-4 gap-4 bg-slate-600 justify-between">
      <div className="flex gap-4 !text-white items-center">
        <ButtonLink href="/" title="Back to Home">
          <Icon path={mdiHome} size={1} color="white" />
        </ButtonLink>
        <ButtonLink href={`/store/${store?.id}`} title="Back to Store" className="flex flex-row items-center gap-4">
          <IconImage image={store?.image} name={store?.name || 'Store'} size="xs" />
          <H4>{store?.name}</H4>
        </ButtonLink>
      </div>
      <Button onClick={toggleCart} title={isCartVisible ? 'Close Cart' : 'Open Cart'} className="relative">
        <Icon path={isCartVisible ? mdiClose : mdiCart} size={0.75} color="white" />
        <span
          className={`absolute -top-2 -right-2 text-xs font-semibold ${items.length === 0 ? 'bg-slate-800' : 'bg-sky-600'} px-[10px] py-2 rounded-md scale-75 pointer-events-none`}
        >
          {totalItems(items)}
        </span>
      </Button>
    </header>
  );
};
