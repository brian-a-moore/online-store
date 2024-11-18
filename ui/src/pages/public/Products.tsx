import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProducts, TProduct } from '../../api';
import { Card, Grid } from '../../components/container';
import { Link } from '../../components/interactive';

type Props = {};

export const Products: React.FC<Props> = () => {
  const navigate = useNavigate();
  const { storeId } = useParams<{ storeId: string }>();
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<TProduct[] | null>(null);

  useEffect(() => {
    try {
      const fetchProducts = async () => {
        try {
          const { products } = await getProducts(storeId!);
          setProducts(products);
          setIsLoading(false);
        } catch (e: any | unknown) {
          setError(e.message);
        }
      };
      fetchProducts();
    } catch (e: any | unknown) {
      setError(e.message);
    }
  }, []);

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <h1>Loading...</h1>;

  return <Grid>{products?.map((product) => <Product key={product.id} product={product} />)}</Grid>;
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
