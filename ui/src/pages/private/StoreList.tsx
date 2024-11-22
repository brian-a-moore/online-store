import { mdiStore, mdiStorefrontPlus, mdiStoreOff, mdiUpdate } from "@mdi/js";
import Icon from "@mdi/react";
import { useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ListStoresPrivateBody, ListStoresPrivateQuery, ListStoresPrivateResponse } from "../../../../api/src/types/api";
import { Container } from "../../components/container";
import { Loader } from "../../components/core";
import { FloatingActionButton } from "../../components/interactive";
import { HTTP_METHOD } from "../../constants";
import useApi from "../../hooks/useApi";

export const StoreList: React.FC = () => {
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<
    ListStoresPrivateBody,
    ListStoresPrivateQuery,
    ListStoresPrivateResponse
  >({
    url: `/admin/store/list`,
    method: HTTP_METHOD.GET,
    params: { page: '1' },
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <Loader />;

  const stores = response?.stores;

  return (
    <div className="w-full p-4">
      <Container>
        {stores?.map((store) => (
          <RouterLink
            className="flex gap-4 p-4 items-center bg-white hover:bg-slate-100 text-slate-800 border-[1px] rounded shadow-md"
            key={store.id}
            to={`../store/${store.id}`}
            title={`View store: ${store.name}`}
          >
            <p className="flex-1 whitespace-nowrap text-ellipsis overflow-hidden">{store.name}</p>
            <Icon
              path={store.isPublished ? mdiStore : mdiStoreOff}
              size={0.75}
              title={store.isPublished ? 'Public' : 'Unlisted'}
              color={store.isPublished ? '#64748B' : '#F87171'}
            />
            <div
              className="flex gap-2 items-center opacity-60"
              title={`Last Updated: ${new Date(store.updatedAt).toLocaleDateString()}`}
            >
              <Icon path={mdiUpdate} size={0.75} />
              <p className="text-sm">{new Date(store.updatedAt).toLocaleDateString()}</p>
            </div>
          </RouterLink>
        ))}
      </Container>
      <FloatingActionButton path={mdiStorefrontPlus} label="New Store" onClick={() => navigate('../store/new')} />
    </div>
  );
};