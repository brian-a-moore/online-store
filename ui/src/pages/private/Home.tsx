import { Card, Container, Page } from '../../components/container';
import { StoreList } from '../../components/list';
import { H3 } from '../../components/typography';

export const HomePrivate: React.FC = () => {
  return (
    <Page>
      <Container>
        <Card>
          <H3>My Stores</H3>
        </Card>
        <StoreList />
      </Container>
    </Page>
  );
};
