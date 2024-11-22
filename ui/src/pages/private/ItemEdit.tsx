import { mdiDelete } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    GetItemBody,
    GetItemQuery,
    GetItemResponse
} from '../../../../api/src/types/api';
import { Card, Container, Page } from '../../components/container';
import { Loader } from '../../components/core';
import { Button } from '../../components/interactive';
import { H2 } from '../../components/typography';
import { HTTP_METHOD } from '../../constants';
import { ModalContext } from '../../context/ModalContext';
import useApi from '../../hooks/useApi';

export const ItemEdit: React.FC = () => {
  const { setModal } = useContext(ModalContext);
  const { storeId, productId, itemId } = useParams();
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<GetItemBody, GetItemQuery, GetItemResponse>({
    url: `/admin/store/${storeId}/product/${productId}/item/${itemId}`,
    method: HTTP_METHOD.GET,
  }, { isAutoTriggered: !!itemId });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <Loader />;

  const item = response?.item;

  return (
    <Page>
      <Container>
        <Card>
          
          <div className="flex justify-between">
            <H2>{itemId ? 'Edit' : 'New'} Item</H2>
            {itemId ? (
<Button
              variant="destructive"
              title="Delete Item"
              onClick={() =>
                setModal({
                  title: 'Delete Item',
                  Body: <p>Deleting an item will remove all the items data, including its sales and history. This is immediate and unrecoverable. Are you sure you want to delete this item?</p>,
                  ActionBar: [
                    <Button variant="secondary" onClick={() => setModal(null)}>
                      Cancel
                    </Button>,
                    <Button variant="destructive" onClick={() => {}}>
                      Delete Item
                    </Button>,
                  ],
                })
              }
            >
              <Icon path={mdiDelete} size={0.75} />
            </Button>
            ) : null}
          </div>
          <hr />
          <p>{JSON.stringify(item)}</p>
          <hr />
          <div className="flex justify-between">
            <Button variant='secondary' onClick={() => navigate(-1)}>Back</Button>
          </div>
        </Card>
      </Container>
    </Page>
  );
};
