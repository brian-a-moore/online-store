import { useContext, useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { GetStorePrivateBody, GetStorePrivateQuery, GetStorePrivateResponse } from "../../../../api/src/types/api";
import { Card, Container, Page } from "../../components/container";
import { Loader } from "../../components/core";
import { BannerImage, IconImage, IsPublished } from "../../components/display";
import { H1 } from "../../components/typography";
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
            <IconImage className="absolute -bottom-16 left-8 z-10" image={store?.image} name={store!.name} />
            
            <div className='absolute bottom-4 right-0 px-4 pl-44 flex gap-4 items-end justify-between w-full z-10 !text-white'>
              <H1 className='whitespace-nowrap text-ellipsis overflow-hidden text-shadow'>{store!.name}</H1>
              <IsPublished isPublished={store!.isPublished} pathType="store" longForm invert />
            </div>
          </div>
          <div className='h-16'>

          </div>
        </Card>
        <Outlet />
      </Container>
    </Page>
  );
};