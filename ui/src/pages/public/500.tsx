import { useParams } from 'react-router-dom';
import { Separator } from '../../components/display';
import { Link } from '../../components/interactive';

type Props = {};

export const ServerError: React.FC<Props> = () => {
  const { error } = useParams<{ error: string }>();
  return (
    <div>
      <h1>Something didn't quite go right...</h1>
      <p>{error}</p>
      <Separator />
      <Link href="/">Go Home</Link>
    </div>
  );
};
