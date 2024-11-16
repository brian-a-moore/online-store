import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, TProduct } from '../api';

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

  return (
    <>
      <h2>Products</h2>
      <hr />
      <ul>
        {products?.map((product) => (
          <Link to={`product/${product.productId}`} key={product.productId}>
            {product.productName}
          </Link>
        ))}
      </ul>
    </>
  );
};

export default Products;
