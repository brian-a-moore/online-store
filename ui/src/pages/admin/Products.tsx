import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListProductsAdminBody, ListProductsAdminQuery, ListProductsAdminResponse } from '../../../../api/src/types/api';
import { Card, Container, Page, Table } from '../../components/container';
import { Loader } from '../../components/core';
import { EmptyText, H4 } from '../../components/typography';
import { HTTP_METHOD } from '../../constants';
import useApi from '../../hooks/useApi';

type ListProduct = ListProductsAdminResponse['products'][0];

export const ProductsAdmin: React.FC = () => {
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<ListProductsAdminBody, ListProductsAdminQuery, ListProductsAdminResponse>({
    url: `/admin/product/list`,
    method: HTTP_METHOD.GET,
    params: { page: '1' },
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  const getColumns = (item: ListProduct) => {
    const keys = Object.keys(item);
    return keys.map((key) => {
      return {
        key,
        label: key,
      };
    });
  };

  if (isLoading) return <Loader />;

  const products = response?.products;

  return (
    <Page>
      <Container>
        <Card>
          <H4>Products</H4>
        </Card>
        <Card>
          {products && products.length ? (<Table columns={getColumns(products[0])} data={products} />) : <EmptyText>No products found</EmptyText>}
        </Card>
      </Container>
    </Page>
  );
};
