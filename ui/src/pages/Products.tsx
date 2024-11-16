import { useEffect, useState } from 'react';
import { getProducts, TProduct } from '../api';
import { Card, Grid } from '../components/container';
import { Link } from '../components/interactive';

const Products: React.FC<{ storeId: string }> = ({ storeId }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<TProduct[] | null>(null);

  useEffect(() => {
    try {
      const fetchProducts = async () => {
        try {
          const { products } = await getProducts(storeId);
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

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  return <Grid>{products?.map((product) => <Product key={product.productId} product={product} />)}</Grid>;
};

const Product: React.FC<{ product: TProduct }> = ({ product }) => {
  return (
    <Card key={product.productId}>
      {product.productImage ? (
        <img src={product.productImage} alt={product.productName} className="w-full h-48 object-cover rounded" />
      ) : null}
      <h1 className="font-semibold line-clamp-2" title={product.productName}>
        {product.productName}
      </h1>
      <p className="text-sm line-clamp-5 flex-1" title={product.productDescription}>
        {product.productDescription}
      </p>
      <Link href={`product/${product.productId}`}>View Items</Link>
    </Card>
  );
};

export default Products;
