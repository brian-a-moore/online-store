import { mdiAccountPlus, mdiStoreEdit, mdiTagPlus } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  GetStoreDashboardBody,
  GetStoreDashboardQuery,
  GetStoreDashboardResponse,
} from '../../../../api/src/types/api';
import { Card, Container } from '../../components/container';
import { IconImage, IsPublished, Separator } from '../../components/display';
import { StoreDashboardForm } from '../../components/form';
import { Button, TextButton } from '../../components/interactive';
import { ProductList, TeamList } from '../../components/list';
import { EmptyText, H2 } from '../../components/typography';
import { HTTP_METHOD } from '../../constants';
import { ModalContext } from '../../context/ModalContext';
import useApi from '../../hooks/useApi';

export const StoreDashboard: React.FC = () => {
  const { openModal } = useContext(ModalContext);
  const navigate = useNavigate();
  const { storeId } = useParams();
  const [tab, setTab] = useState<'product' | 'team'>('product');

  const { error, isLoading, response } = useApi<
    GetStoreDashboardBody,
    GetStoreDashboardQuery,
    GetStoreDashboardResponse
  >({
    url: `/dashboard/store/${storeId}`,
    method: HTTP_METHOD.GET,
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  const openStoreEditForm = () => openModal(<StoreDashboardForm storeId={storeId!} />);

  if (isLoading) return <p>Loading...</p>;

  const store = response?.store;

  return (
    <Container>
      <Card className="!flex-row">
        <IconImage image={store?.image} name="Store Icon" upload={{ storeId: storeId! }} />
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex items-center justify-between">
            <H2 className='line-clamp-1'>{store?.name}</H2>
            <div className="flex gap-4">
              <Button variant='tertiary' onClick={openStoreEditForm} title="Edit Store">
                <Icon path={mdiStoreEdit} size={0.75} />
              </Button>
            </div>
          </div>
          {store?.description ? (
            <p className="line-clamp-3">{store.description}</p>
          ) : (
            <EmptyText>This store does not have a description.</EmptyText>
          )}
          <Separator />
          <div className="flex items-center justify-between">
            <p className="text-sm">
              <strong>Last Updated:</strong> {new Date(store!.updatedAt).toLocaleDateString()}
            </p>
            <IsPublished pathType="store" isPublished={!!store?.isPublished} longForm />
          </div>
        </div>
      </Card>
      <Card>
        <div className='flex justify-between'>
          <div className="flex items-center gap-4">
            <TextButton onClick={() => setTab('product')} isActive={tab === 'product'}>
              Products
            </TextButton>
            |
            <TextButton onClick={() => setTab('team')} isActive={tab === 'team'}>
              Team Members
            </TextButton>
          </div>
          <Button onClick={() => {}}>
            <Icon path={tab === 'product' ? mdiTagPlus : mdiAccountPlus} size={0.75} title={tab === 'product' ? 'New Product' : 'New Team Member'} />
          </Button>
        </div>
        {tab === 'product' && <ProductList storeId={storeId!} />}
        {tab === 'team' && <TeamList storeId={storeId!} />}
      </Card>
    </Container>
  );
};
