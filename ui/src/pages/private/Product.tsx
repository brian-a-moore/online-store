import { useEffect } from 'react';
import { Outlet, Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { Card } from '../../components/container';
import { ButtonLink, Link } from '../../components/interactive';
import { HTTP_METHOD } from '../../constants';
import useApi from '../../hooks/useApi';

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
  const { storeId, productId } = useParams();
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<any, any, any>({
    url: `/admin/store/${storeId}/product/${productId}`,
    method: HTTP_METHOD.GET,
  }, true);

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <h1>Loading...</h1>;

  const product = response?.product;

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

  const { error, isLoading, response } = useApi<any, any, any>({
    url: `/admin/store/${storeId}/product/list`,
    method: HTTP_METHOD.GET,
    params: { page: 1 },
  }, true);

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <h1>Loading...</h1>;

  const products = response?.products;

  return (
    <div>
      <ButtonLink href="../product/new">New Product</ButtonLink>
      <div className="flex flex-col p-4 gap-4">
        {products?.map((product: any) => (
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
