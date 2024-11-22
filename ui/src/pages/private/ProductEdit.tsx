import { useLocation, useNavigate } from "react-router-dom";
import { Card, Container, Page } from "../../components/container";
import { Button } from "../../components/interactive";
import { H2 } from "../../components/typography";

type ProductState = {
    id: string;
    storeId: string;
    name: string;
    description: string | null;
    image: string | null;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export const ProductEdit: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product: ProductState | undefined = location.state?.product;

  return (
    <Page>
      <Container>
        <Card>
          <H2>{product?.id ? 'Edit' : 'New'} Product</H2>
          <hr />
          <p>{JSON.stringify(product)}</p>
          <hr />
          <div className='flex justify-between'>
            <Button variant='secondary' onClick={() => navigate(-1)}>Back</Button>
          </div>
        </Card>
      </Container>
    </Page>
  );
};