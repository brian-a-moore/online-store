import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Container, Page } from '../../components/container';
import { Button } from '../../components/interactive';
import { H2 } from '../../components/typography';

type StoreState = {
  id: string;
  name: string;
  website: string | null;
  description: string | null;
  image: string | null;
  bannerImage: string | null;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export const StoreEdit: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const store: StoreState | undefined = location.state?.store;

  return (
    <Page>
      <Container>
        <Card>
          <H2>{store?.id ? 'Edit' : 'New'} Store</H2>
          <hr />
          <p>{JSON.stringify(store)}</p>
          <hr />
          <div className="flex justify-between">
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Back
            </Button>
          </div>
        </Card>
      </Container>
    </Page>
  );
};
