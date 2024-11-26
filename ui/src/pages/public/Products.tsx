import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ListProductsPublicBody,
  ListProductsPublicQuery,
  ListProductsPublicResponse,
} from '../../../../api/src/types/api';
import { Card, Grid } from '../../components/container';
import { Loader } from '../../components/core';
import { Separator } from '../../components/display';
import { Button, Link } from '../../components/interactive';
import { EmptyText, H2, H4 } from '../../components/typography';
import { HTTP_METHOD } from '../../constants';
import useApi from '../../hooks/useApi';

type Props = {};

export const Products: React.FC<Props> = () => {
  const navigate = useNavigate();
  const { storeId } = useParams<{ storeId: string }>();

  const { error, isLoading, response } = useApi<
    ListProductsPublicBody,
    ListProductsPublicQuery,
    ListProductsPublicResponse
  >(
    {
      url: `/public/product/list`,
      method: HTTP_METHOD.GET,
      params: { storeId: storeId!, page: '1' },
    },
    { isPrivateEndpoint: false },
  );

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <Loader />;

  const products = response?.products;

  if(!products || products.length === 0) {
    return(
      <div className='flex flex-col flex-1 gap-4 w-full items-center justify-center'>
        <H2>Not much going on right now...</H2>
        <EmptyText>There are no products available right now, please check again later.</EmptyText>
        <Button variant='transparent' onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    )
  };

  return <Grid>{products?.map((product) => <Product key={product.id} product={product} />)}</Grid>;
};

const Product: React.FC<{
  product: {
    id: string;
    name: string;
    description: string | null;
    image: string | null;
  };
}> = ({ product }) => {
  return (
    <Card key={product.id}>
      {product.image ? (
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
      ) : null}
      <H4 className="line-clamp-2" title={product.name}>
        {product.name}
      </H4>
      <Separator />
      <p className="text-sm line-clamp-5 flex-1" title={product.description || 'No Description'}>
        {product.description}
      </p>
      <Link href={`product/${product.id}`}>View Items</Link>
    </Card>
  );
};

export default Products;
