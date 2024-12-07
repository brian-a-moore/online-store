import { mdiShieldAccount, mdiStoreEdit } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GetStoreTeamDashboardBody,
  GetStoreTeamDashboardQuery,
  GetStoreTeamDashboardResponse,
} from '../../../../api/src/types/api';
import { Loader } from '../../components/core';
import { HTTP_METHOD } from '../../constants';
import { ModalContext } from '../../context/ModalContext';
import useApi from '../../hooks/useApi';
import { Grid, ListItem } from '../container';
import { TeamMemberForm } from '../form';
import { EmptyText, H5 } from '../typography';

type Props = {
  storeId: string;
  reload?: string;
};

export const TeamList: React.FC<Props> = ({ storeId, reload: passedInReload }) => {
  const { openModal } = useContext(ModalContext);
  const navigate = useNavigate();
  const [reload, setReload] = useState<string>();

  const { error, isLoading, response } = useApi<
    GetStoreTeamDashboardBody,
    GetStoreTeamDashboardQuery,
    GetStoreTeamDashboardResponse
  >(
    {
      url: `/dashboard/store/${storeId}/team`,
      method: HTTP_METHOD.GET,
      params: { page: '1' },
    },
    { reTrigger: reload },
  );

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  useEffect(() => {
    if(passedInReload) setReload(passedInReload);
  }, [passedInReload]);

  const forceReload = () => setReload(new Date().toISOString());
  const openEditMemberForm = (teamMember: GetStoreTeamDashboardResponse['team'][0]) => {
    openModal(<TeamMemberForm storeId={storeId} existingMember={teamMember} forceReload={forceReload} />)
  }

  if (isLoading) return <Loader />;

  const team = response?.team;

  if (!team || team.length === 0) {
    return (
      <div className="flex justify-center">
        <EmptyText>No team members found</EmptyText>
      </div>
    );
  }

  return (
    <Grid className="!p-0">
      {team?.map((member) => (
        <ListItem key={member.id} onClick={() => openEditMemberForm(member)} title={`Edit Member: ${member.name}`}>
          <div className="flex gap-4 w-full items-center justify-between">
            <H5 className="whitespace-nowrap text-ellipsis overflow-hidden">{member.name}</H5>
            <div className="flex items-center gap-2">
              <Icon
                path={member.store.roleId === 1 ? mdiShieldAccount : mdiStoreEdit}
                size={0.75}
                title={member.store.roleId === 1 ? 'Manager' : 'Editor'}
                color={'#64748B'}
              />
            </div>
          </div>
          <p className="text-sm opacity-60 whitespace-nowrap text-ellipsis overflow-hidden">{member.email}</p>
        </ListItem>
      ))}
    </Grid>
  );
};
