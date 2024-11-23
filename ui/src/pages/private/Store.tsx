import { mdiDelete, mdiPencil, mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import { useContext, useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { GetStorePrivateBody, GetStorePrivateQuery, GetStorePrivateResponse } from "../../../../api/src/types/api";
import { Card, Container, Page } from "../../components/container";
import { Loader } from "../../components/core";
import { BannerImage, IconImage, IsPublished } from "../../components/display";
import { Button } from "../../components/interactive";
import { EmptyText, H1 } from "../../components/typography";
import { HTTP_METHOD } from "../../constants";
import { ModalContext } from "../../context/ModalContext";
import useApi from "../../hooks/useApi";

export const StoreLayout: React.FC = () => {
  const { setModal } = useContext(ModalContext);
  const { storeId } = useParams();
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<GetStorePrivateBody, GetStorePrivateQuery, GetStorePrivateResponse>({
    url: `/admin/store/${storeId}`,
    method: HTTP_METHOD.GET,
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <Loader />;

  const store = response?.store;

  return (
    <Page>
      <Container>
        <Card className="!p-0">
          <div className="relative h-40">
            <BannerImage className="absolute top-0 left-0" image={store?.bannerImage} name={store!.name} />
            <IconImage className="absolute top-20 left-8 z-10" image={store?.image} name={store!.name} />
            <div className="absolute top-4 right-4 flex gap-4 z-10">
              <Button
                variant="secondary"
                title="Delete Store"
                onClick={() =>
                  setModal({
                    title: 'Delete Store',
                    Body: (
                      <p>
                        Deleting a store will remove all the stores data, including its; products, items, sales and
                        history. This is immediate and unrecoverable. Are you sure you want to delete this store?
                      </p>
                    ),
                    ActionBar: [
                      <Button variant="secondary" onClick={() => setModal(null)}>
                        Cancel
                      </Button>,
                      <Button variant="destructive" onClick={() => {}}>
                        Delete Store
                      </Button>,
                    ],
                  })
                }
              >
                <Icon path={mdiDelete} size={0.75} />
              </Button>
              <Button variant="secondary" onClick={() => navigate('edit', { state: { store } })} title="Edit Store">
                <Icon path={mdiPencil} size={0.75} />
              </Button>
              <Button onClick={() => navigate('product/new')} title="New Product">
                <Icon path={mdiPlus} size={0.75} />
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-4 p-4 pt-0">
            <div className="flex pl-40 items-center justify-between">
              <H1>{store!.name}</H1>
              <IsPublished isPublished={store!.isPublished} pathType="store" longForm />
            </div>
            {store?.description ? <p>{store.description}</p> : <EmptyText>No Description</EmptyText>}
          </div>
        </Card>
        <Outlet />
      </Container>
    </Page>
  );
};