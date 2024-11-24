import { mdiDelete, mdiPencil, mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GetStorePrivateBody, GetStorePrivateQuery, GetStorePrivateResponse } from '../../../../api/src/types/api';
import { Card, Container, Page } from '../../components/container';
import { Loader } from '../../components/core';
import { BannerImage, IconImage, IsPublished } from '../../components/display';
import { ProductForm, StoreForm, TeamMemberForm } from '../../components/form';
import { Button, TextButton } from '../../components/interactive';
import { ProductList, TeamList } from '../../components/list';
import { H1 } from '../../components/typography';
import { HTTP_METHOD } from '../../constants';
import { ModalContext } from '../../context/ModalContext';
import useApi from '../../hooks/useApi';

export const StorePrivate: React.FC = () => {
  const { setModal } = useContext(ModalContext);
  const { storeId } = useParams();
  const navigate = useNavigate();
  const [activeList, setActiveList] = useState<'products' | 'team'>('products');

  const { error, isLoading, response } = useApi<GetStorePrivateBody, GetStorePrivateQuery, GetStorePrivateResponse>({
    url: `/admin/store/${storeId}`,
    method: HTTP_METHOD.GET,
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  const toggleList = (list: 'products' | 'team') => {
    setActiveList(list);
  };

  const goToAddPage = () => {
    if (activeList === 'products') {
      setModal({
        title: 'New Product',
        Body: <ProductForm />,
        ActionBar: [
          <Button variant="secondary" key="cancel" onClick={() => setModal(null)}>
            Cancel
          </Button>,
          <Button key="submit" onClick={() => setModal(null)}>
            Create Product
          </Button>,
        ],
      });
    } else {
      setModal({
        title: 'New Team Member',
        Body: <TeamMemberForm />,
        ActionBar: [
          <Button variant="secondary" key="cancel" onClick={() => setModal(null)}>
            Cancel
          </Button>,
          <Button key="submit" onClick={() => setModal(null)}>
            Create Team Member
          </Button>,
        ],
      });
    }
  };

  if (isLoading) return <Loader />;

  const store = response?.store;

  return (
    <Page>
      <Container>
        <Card className="!p-0">
          <div className="relative h-40">
            <BannerImage className="absolute top-0 left-0" image={store?.bannerImage} name={store!.name} />
            <IconImage className="absolute -bottom-12 left-8 z-10" image={store?.image} name={store!.name} />
            <div className="absolute top-4 right-4 flex gap-4 z-10">
              <Button
                variant="destructive"
                onClick={() => {
                  setModal({
                    title: 'Delete Store',
                    Body: <p>Are you sure you want to delete this store?</p>,
                    ActionBar: [
                      <Button variant="secondary" key="cancel" onClick={() => setModal(null)}>
                        Cancel
                      </Button>,
                      <Button
                        key="submit"
                        onClick={() => {
                          setModal(null);
                        }}
                      >
                        Delete Store
                      </Button>,
                    ],
                  });
                }}
              >
                <Icon path={mdiDelete} size={0.75} />
              </Button>
              <Button
                onClick={() =>
                  setModal({
                    title: 'Update Store',
                    Body: <StoreForm store={store} />,
                    ActionBar: [
                      <Button variant="secondary" key="cancel" onClick={() => setModal(null)}>
                        Cancel
                      </Button>,
                      <Button key="submit" onClick={() => setModal(null)}>
                        Update Store
                      </Button>,
                    ],
                  })
                }
              >
                <Icon path={mdiPencil} size={0.75} />
              </Button>
            </div>
            <div className="absolute bottom-4 right-0 px-4 pl-44 flex gap-4 items-end justify-between w-full z-10 !text-white">
              <H1 className="whitespace-nowrap text-ellipsis overflow-hidden text-shadow">{store!.name}</H1>
              <IsPublished isPublished={store!.isPublished} pathType="store" longForm invert />
            </div>
          </div>
          <div className="flex gap-4 p-4 pt-0 pl-44 items-center justify-between">
            <div className="flex items-center gap-4">
              <TextButton onClick={() => toggleList('products')} isActive={activeList === 'products'}>
                Edit Products
              </TextButton>
              |
              <TextButton onClick={() => toggleList('team')} isActive={activeList === 'team'}>
                Edit Team
              </TextButton>
            </div>
            <Button onClick={goToAddPage} title={`Create ${activeList === 'products' ? 'Product': 'Team Member'}`}>
              <Icon path={mdiPlus} size={1} />
            </Button>
          </div>
        </Card>
        {activeList === 'products' && <ProductList storeId={storeId!} />}
        {activeList === 'team' && <TeamList storeId={storeId!} />}
      </Container>
    </Page>
  );
};
