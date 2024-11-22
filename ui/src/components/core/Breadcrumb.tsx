import { mdiBarcode, mdiChevronRight, mdiStorefront, mdiTag } from '@mdi/js';
import Icon from '@mdi/react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GetBreadcrumbBody, GetBreadcrumbQuery, GetBreadcrumbResponse } from '../../../../api/src/types/api';
import { HTTP_METHOD } from '../../constants';
import useApi from '../../hooks/useApi';
import { Link } from '../interactive';

export const BreadCrumb: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams() as unknown as GetBreadcrumbQuery;
  const { error, isLoading, response } = useApi<GetBreadcrumbBody, GetBreadcrumbQuery, GetBreadcrumbResponse>({
    url: '/admin/ui/breadcrumb',
    method: HTTP_METHOD.GET,
    params,
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  const crumbs = response?.crumbs || [];

  const LABELS = [
    'Go to store: ',
    'Go to product: ',
    'Go to item: ',
  ];

  const ICONS = [
    mdiStorefront,
    mdiTag,
    mdiBarcode
  ];

  const getCrumbLink = (index: number) => {
    if(index === 0) return `/admin/store/${crumbs[0].id}`;
    if(index === 1) return `/admin/store/${crumbs[0].id}/product/${crumbs[1].id}`;
    if(index === 2) return `/admin/store/${crumbs[0].id}/product/${crumbs[1].id}/item/${crumbs[2].id}`;
    else return '/admin';
  };

  return (
    <div>
      {isLoading ? <p>Loading...</p> : (
        <nav className='bg-sky-800 flex gap-4 px-4 py-2 items-center text-slate-100'>
        {crumbs.map((crumb, index) => (
            <>
                <Link className='text-slate-100' href={getCrumbLink(index)} title={`${LABELS[index]}${crumb.name}`}>
                    <div className='flex gap-2 items-center'>
                        <Icon path={ICONS[index]} size={0.75} color='#CBD5E1' />
                        <p className='text-sm'>{crumb.name}</p>
                    </div>
                </Link>
                {index !== crumbs.length - 1 && <Icon className='opacity-60' path={mdiChevronRight} size={0.75} />}
            </>
        ))}
        </nav>
      )}
    </div>
  );
};