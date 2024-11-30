import { mdiAccountPlus, mdiPencil, mdiTagPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  GetStoreDashboardBody,
  GetStoreDashboardQuery,
  GetStoreDashboardResponse,
  GetStoreLoggedInUserRelationDashboardBody,
  GetStoreLoggedInUserRelationDashboardQuery,
  GetStoreLoggeDInUserRelationDashboardResponse,
} from '../../../../api/src/types/api';
import { Card, Container, Page } from '../../components/container';
import { Loader } from '../../components/core';
import { BannerImage, IconImage, IsPublished } from '../../components/display';
import { ProductDashboardForm, StoreDashboardForm, TeamMemberForm } from '../../components/form';
import { Button, TextButton } from '../../components/interactive';
import { ProductList, TeamList } from '../../components/list';
import { H1 } from '../../components/typography';
import { HTTP_METHOD } from '../../constants';
import { ModalContext } from '../../context/ModalContext';
import useApi from '../../hooks/useApi';

export const StoreDashboard: React.FC = () => {
  const { openModal } = useContext(ModalContext);
  const { storeId } = useParams();
  const navigate = useNavigate();
  const [activeList, setActiveList] = useState<'products' | 'team'>('products');
  const [reload, setReload] = useState<string | undefined>();

  const getLoggedInUserRelationResponse = useApi<GetStoreLoggedInUserRelationDashboardBody, GetStoreLoggedInUserRelationDashboardQuery, GetStoreLoggeDInUserRelationDashboardResponse>({
    url: `/dashboard/store/${storeId}/relation`,
    method: HTTP_METHOD.GET,
  });

  const getStoreResponse = useApi<
    GetStoreDashboardBody,
    GetStoreDashboardQuery,
    GetStoreDashboardResponse
  >(
    {
      url: `/dashboard/store/${storeId}`,
      method: HTTP_METHOD.GET,
    },
    { reTrigger: reload },
  );

  useEffect(() => {
    if (getLoggedInUserRelationResponse.error || getStoreResponse.error) navigate(`/500?error=${getLoggedInUserRelationResponse.error || getStoreResponse.error}`);
  }, [getLoggedInUserRelationResponse.error || getStoreResponse.error]);

  const toggleList = (list: 'products' | 'team') => {
    setActiveList(list);
  };

  const goToAddPage = () => {
    if (activeList === 'products') {
      openModal(<ProductDashboardForm storeId={storeId} forceReload={forceReload} />);
    } else {
      openModal(<TeamMemberForm storeId={storeId!} forceReload={forceReload} />);
    }
  };

  const forceReload = () => setReload(new Date().toISOString());
  const openEditStore = () => {
    openModal(<StoreDashboardForm storeId={storeId} forceReload={forceReload} />);
  };

  if (getLoggedInUserRelationResponse.isLoading || getStoreResponse.isLoading) return <Loader />;

  const store = getStoreResponse.response?.store;
  const isManager = getLoggedInUserRelationResponse.response?.relation.roleId === 1;

  return (
    <Page>
      <Container>
        <Card className="!p-0">
          <div className="relative h-40 md:h-52">
            <BannerImage className="absolute top-0 left-0" image={store?.bannerImage} name={store!.name} upload={{ storeId: storeId! }} />
            <IconImage className="absolute -bottom-20 md:-bottom-32 left-8 z-20" image={store?.image} name={store!.name} upload={{ storeId: storeId! }} />
            <div className="absolute top-4 right-4 flex gap-4 z-30">
              <Button variant="secondary" onClick={openEditStore} title="Edit Store">
                <Icon path={mdiPencil} size={0.75} />
              </Button>
            </div>
            <div className="absolute bottom-4 right-0 px-4 pl-44 flex gap-4 items-end justify-between w-full z-10 !text-white">
              <H1 className="whitespace-nowrap text-ellipsis overflow-hidden text-shadow">{store!.name}</H1>
              <IsPublished isPublished={store!.isPublished} pathType="store" longForm invert />
            </div>
          </div>
          <div className="flex gap-4 p-4 pt-0 pl-44 items-center justify-between">
            {isManager ? (
              <div className="flex items-center gap-4">
              <TextButton onClick={() => toggleList('products')} isActive={activeList === 'products'}>
                Edit Products
              </TextButton>
              |
              <TextButton onClick={() => toggleList('team')} isActive={activeList === 'team'}>
                Edit Team
              </TextButton>
            </div>
            ) : <div />}
            <Button onClick={goToAddPage} title={`New ${activeList === 'products' ? 'Product' : 'Team Member'}`}>
              <Icon path={activeList === 'products' ? mdiTagPlus : mdiAccountPlus} size={1} />
            </Button>
          </div>
        </Card>
        {activeList === 'products' && <ProductList storeId={storeId!} reload={reload} />}
        {(activeList === 'team' && isManager) && <TeamList storeId={storeId!} reload={reload} />}
      </Container>
    </Page>
  );
};
