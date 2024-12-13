import { Card, Container } from '../../components/container';
import { StoreList } from '../../components/list';

export const HomeDashboard: React.FC = () => {
  return (
    <Container>
      <Card>
        <StoreList />
      </Card>
    </Container>
  );
};
