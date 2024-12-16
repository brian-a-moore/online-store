import { useLocation } from 'react-router-dom';
import { Separator } from '../../components/display';
import { Link } from '../../components/interactive';
import { H3 } from '../../components/typography';

export const ServerError: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const error = queryParams.get('error');

  return (
    <div className="fixed top-0 left-0 w-screen h-screen p-8 flex items-center justify-center">
      <div className="flex flex-col gap-4 max-w-96">
        <H3>Something didn't quite go right...</H3>
        <p className="text-sm font-semibold text-sky-600 -mb-2">
          Error Message:
        </p>
        <p
          className="bg-sky-200 text-sky-600 px-4 py-2 rounded line-clamp-4"
          title={error || 'Unknown Error'}
        >
          {error}
        </p>
        <p>
          If you keep seeing messages like this, please contact the site
          administrator.
        </p>
        <Separator />
        <Link href="/">Go Home</Link>
      </div>
    </div>
  );
};
