import { Separator } from '../../components/display';
import { Link } from '../../components/interactive';
import { H3 } from '../../components/typography';

export const PageNotFound: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen p-8 flex items-center justify-center">
      <div className="flex flex-col gap-4 max-w-96">
        <H3>It seems we've gotten lost...</H3>
        <p>The page you requested is either no longer available or doesn't exist.</p>
        <Separator />
        <Link href="/">Go Home</Link>
      </div>
    </div>
  );
};
