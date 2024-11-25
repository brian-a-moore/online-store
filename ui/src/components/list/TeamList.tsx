import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetStoreTeamDashboardBody, GetStoreTeamDashboardQuery, GetStoreTeamDashboardResponse } from '../../../../api/src/types/api';
import { Loader } from '../../components/core';
import { HTTP_METHOD } from '../../constants';
import { ModalContext } from '../../context/ModalContext';
import useApi from '../../hooks/useApi';
import { Grid, ListItem } from '../container';
import { TeamMemberForm } from '../form';
import { Button } from '../interactive';
import { EmptyText, H5 } from '../typography';

type Props = {
  storeId: string;
};

export const TeamList: React.FC<Props> = ({ storeId }) => {
  const { setModal } = useContext(ModalContext);
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<GetStoreTeamDashboardBody, GetStoreTeamDashboardQuery, GetStoreTeamDashboardResponse>({
    url: `/dashboard/store/${storeId}/team`,
    method: HTTP_METHOD.GET,
    params: { page: '1' },
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <Loader />;

  const team = response?.team;

  if(!team || team.length === 0) {
    return(
      <div className='flex justify-center'>
        <EmptyText>No team members found</EmptyText>
      </div>
    )
  };

  return (
    <Grid className='!p-0'>
      {team?.map((member) => (
        <ListItem
          key={member.id}
          onClick={() => {
            setModal({
              title: 'Edit Team Member',
              Body: <TeamMemberForm storeId={storeId} teamMember={member} />,
              ActionBar: [
                <Button variant="secondary" key="cancel" onClick={() => setModal(null)}>
                  Cancel
                </Button>,
                <Button key="submit" onClick={() => setModal(null)}>
                  Edit Team Member
                </Button>,
              ],
            })
          }}
          title={`Edit Member: ${member.name}`}
        >
          <H5 className="whitespace-nowrap text-ellipsis overflow-hidden">{member.name}</H5>
          <p className="text-sm opacity-60 whitespace-nowrap text-ellipsis overflow-hidden">{member.email}</p>
        </ListItem>
      ))}
    </Grid>
  );
};
