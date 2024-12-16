import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../api';
import { Card } from '../../components/container';
import { IconImage } from '../../components/display';
import { Link } from '../../components/interactive';
import { EmptyText, H3 } from '../../components/typography';

export const Products: React.FC = () => {
  const navigate = useNavigate();
  const { storeId } = useParams<{ storeId: string }>();

  const { error, isLoading, data } = useQuery({
    queryKey: ['list-products-public', storeId],
    queryFn: async () =>
      api.product.listProductsPublic({ storeId: storeId!, page: '1' }),
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <p>Loading...</p>;

  const products = data?.products;

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <EmptyText>
          There are no products available right now, please check again later.
        </EmptyText>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full gap-4 p-4">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
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
    <Card key={product.id} className="!flex-row items-center">
      <div>
        <IconImage
          image={product.image}
          name={product.name}
          rounded={false}
          size="xl"
        />
      </div>
      <div className="flex flex-col gap-4">
        <H3 className="line-clamp-2" title={product.name}>
          {product.name}
        </H3>
        {product.description ? (
          <p className="text-sm line-clamp-3 flex-1">{product.description}</p>
        ) : (
          <EmptyText>No description available for this product.</EmptyText>
        )}
        <Link href={`product/${product.id}/items`}>View Items</Link>
      </div>
    </Card>
  );
};
