import { mdiShieldAccount, mdiStoreEdit } from '@mdi/js';
import Icon from '@mdi/react';
import { ColDef, RowClickedEvent } from 'ag-grid-community';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GetStoreTeamDashboardBody,
  GetStoreTeamDashboardQuery,
  GetStoreTeamDashboardResponse,
} from '../../../../api/src/types/api';
import { HTTP_METHOD } from '../../constants';
import { ModalContext } from '../../context/ModalContext';
import useApi from '../../hooks/useApi';
import { AgGrid } from '../container';
import { TeamMemberForm } from '../form';
import { EmptyText } from '../typography';

type Props = {
  storeId: string;
  reload?: string;
};

type Row = GetStoreTeamDashboardResponse['team'][0];

const columns: ColDef[] = [
  {
    field: 'id',
    hide: true,
  },
  {
    field: 'name',
    headerName: 'Team Member',
    flex: 2,
  },
  {
    field: 'email',
    headerName: 'Member Email',
    flex: 2,
  },
  {
    field: 'store.roleId',
    headerName: 'Role',
    width: 100,
    cellRenderer: (params: any) => (
      <div className="flex h-full items-center justify-center">
        <div>
          <Icon
            path={params.value === 1 ? mdiShieldAccount : mdiStoreEdit}
            size={0.75}
            title={params.value === 1 ? 'Manager' : 'Editor'}
          />
        </div>
      </div>
    ),
  },
];

export const TeamList: React.FC<Props> = ({ storeId, reload: passedInReload }) => {
  const { openModal } = useContext(ModalContext);
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [reload, setReload] = useState<string>();

  const { error, isLoading, response } = useApi<
    GetStoreTeamDashboardBody,
    GetStoreTeamDashboardQuery,
    GetStoreTeamDashboardResponse
  >(
    {
      url: `/dashboard/store/${storeId}/team`,
      method: HTTP_METHOD.GET,
      params: { page: page.toString() },
    },
    { reTrigger: reload },
  );

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  useEffect(() => {
    if (passedInReload) setReload(passedInReload);
  }, [passedInReload]);

  const forceReload = () => setReload(new Date().toISOString());
  const openEditMemberForm = (teamMember: GetStoreTeamDashboardResponse['team'][0]) => {
    openModal(<TeamMemberForm storeId={storeId} existingMember={teamMember} forceReload={forceReload} />);
  };
  const onRowClicked = (e: RowClickedEvent<Row>) => openEditMemberForm(e.data!);

  if (isLoading) return <p>Loading...</p>;

  const team = response?.team;

  if (!team || team.length === 0) {
    return (
      <div className="flex justify-center">
        <EmptyText>No team members found</EmptyText>
      </div>
    );
  }

  return (
    <>
      {team && team.length ? (
        <AgGrid<Row> cols={columns} rows={team} onRowClicked={onRowClicked} />
      ) : (
        <EmptyText>No team members found</EmptyText>
      )}
    </>
  );
};
