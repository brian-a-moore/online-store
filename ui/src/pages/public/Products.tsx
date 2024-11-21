import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TProduct } from '../../api';
import { Card, Grid } from '../../components/container';
import { Link } from '../../components/interactive';
import { HTTP_METHOD } from '../../constants';
import useApi from '../../hooks/useApi';

type Props = {};

export const Products: React.FC<Props> = () => {
  const navigate = useNavigate();
  const { storeId } = useParams<{ storeId: string }>();
  
  const { error, isLoading, response } = useApi<any, any, any>({
    url: `/store/${storeId}/product/list`,
    method: HTTP_METHOD.GET,
    params: { page: 1 },
  }, true);

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <h1>Loading...</h1>;

  return <Grid>{response.products?.map((product: any) => <Product key={product.id} product={product} />)}</Grid>;
};

const Product: React.FC<{ product: TProduct }> = ({ product }) => {
  return (
    <Card key={product.id}>
      {product.image ? (
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
      ) : null}
      <h1 className="font-semibold line-clamp-2" title={product.name}>
        {product.name}
      </h1>
      <p className="text-sm line-clamp-5 flex-1" title={product.description}>
        {product.description}
      </p>
      <Link href={`product/${product.id}`}>View Items</Link>
    </Card>
  );
};

export default Products;
