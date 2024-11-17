import { useParams } from "react-router-dom";
import { Link } from "../components/interactive";

type Props = {};

const ServerError: React.FC<Props> = () => {
  const { error } = useParams<{ error: string }>();
  return (
    <div>
      <h1>Something didn't quite go right...</h1>
      <p>{error}</p>
      <hr />
      <Link href='/'>Go Home</Link>
    </div>
  );
};

export default ServerError;
