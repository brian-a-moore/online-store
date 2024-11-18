import { useEffect, useState } from 'react';
import { Outlet, Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { getProduct, getProducts, TProduct } from '../../api';
import { Card } from '../../components/container';
import { ButtonLink, Link } from '../../components/interactive';

type ProductLayoutProps = {};

export const ProductLayout: React.FC<ProductLayoutProps> = () => {
  return (
    <div>
      <nav className="bg-teal-800 flex gap-4 p-4">
        <Link href=".">About Product</Link>
        <Link href="item/list">View Items</Link>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

type ProductHomeProps = {};

export const ProductHome: React.FC<ProductHomeProps> = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<TProduct | null>(null);

  useEffect(() => {
    try {
      const fetchProduct = async () => {
        try {
          const { product } = await getProduct(productId!);
          if(!product) throw new Error('Product not found');
          setProduct(product);
          setIsLoading(false);
        } catch (e: any | unknown) {
          setError(e.message);
        }
      };
      fetchProduct();
    } catch (e: any | unknown) {
      setError(e.message);
    }
  }, []);

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>{product!.name}</h1>
      <Link href="edit">Edit Product</Link>
      <Link href="..">Back</Link>
    </div>
  );
};

type ProductEditProps = {};

export const ProductEdit: React.FC<ProductEditProps> = () => {
  return (
    <div>
      <h1>Edit Product</h1>
      <Link href="..">Back</Link>
    </div>
  );
};

type ProductListProps = {};

export const ProductList: React.FC<ProductListProps> = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();

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
  return (
    <div>
      <ButtonLink href="../product/new">New Product</ButtonLink>
      <div className="flex flex-col p-4 gap-4">
        {products?.map((product) => (
          <RouterLink key={product.id} to={`../product/${product.id}`}>
            <Card>
              <p>{product.name}</p>
            </Card>
          </RouterLink>
        ))}
      </div>
    </div>
  );
};
