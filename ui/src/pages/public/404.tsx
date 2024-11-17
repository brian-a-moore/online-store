import { Link } from "../../components/interactive";

type Props = {};

export const PageNotFound: React.FC<Props> = () => {
  return (
    <div>
      <h1>It seems we've gotten lost...</h1>
      <p>The page you requested is either no longer available or doesn't exist.</p>
      <hr />
      <Link href='/'>Go Home</Link>
    </div>
  );
};
