import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ListItemsPublicBody, ListItemsPublicQuery, ListItemsPublicResponse } from '../../../../api/src/types/api';
import { Card, Grid } from '../../components/container';
import { Loader } from '../../components/core';
import { Separator } from '../../components/display';
import { Button } from '../../components/interactive';
import { FixedPriceItem, VariablePriceItem } from '../../components/store';
import { EmptyText, H2, H5 } from '../../components/typography';
import { HTTP_METHOD } from '../../constants';
import { CartContext, TCartItem } from '../../context/CartContext';
import useApi from '../../hooks/useApi';
import { StorePublicItem } from '../../types';

export const Items: React.FC = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<ListItemsPublicBody, ListItemsPublicQuery, ListItemsPublicResponse>(
    {
      url: `/public/item/list`,
      method: HTTP_METHOD.GET,
      params: { productId: productId!, page: '1' },
    },
    { isPrivateEndpoint: false },
  );

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <Loader />;

  const items = response?.items;

  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col flex-1 gap-4 w-full items-center justify-center">
        <H2>Not much going on right now...</H2>
        <EmptyText>There are no items available right now, please check again later.</EmptyText>
        <Button variant="transparent" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </div>
    );
  }

  return <Grid>{response?.items?.map((item) => <Item key={item.id} item={item} />)}</Grid>;
};

const Item: React.FC<{
  item: StorePublicItem;
}> = ({ item }) => {
  const { addItem } = useContext(CartContext);
  const addItemToCart = (item: TCartItem) => addItem(item);

  return (
    <Card key={item.id}>
      {item.image ? <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded" /> : null}
      <H5 className="line-clamp-2" title={item.name}>
        {item.name}
      </H5>
      <Separator />
      <p className="text-sm line-clamp-5 flex-1" title={item.description || 'No Description'}>
        {item.description}
      </p>
      {item.itemTypeId === 1 ? (
        <FixedPriceItem item={item} addItemToCart={addItemToCart} />
      ) : (
        <VariablePriceItem item={item} addItemToCart={addItemToCart} />
      )}
    </Card>
  );
};

