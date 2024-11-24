import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetTeamBody, GetTeamQuery, GetTeamResponse } from '../../../../api/src/types/api';
import { Loader } from '../../components/core';
import { HTTP_METHOD } from '../../constants';
import { ModalContext } from '../../context/ModalContext';
import useApi from '../../hooks/useApi';
import { ListItem } from '../container';
import { TeamMemberForm } from '../form';
import { Button } from '../interactive';

type Props = {
  storeId: string;
};

export const TeamList: React.FC<Props> = ({ storeId }) => {
  const { setModal } = useContext(ModalContext);
  const navigate = useNavigate();

  const { error, isLoading, response } = useApi<GetTeamBody, GetTeamQuery, GetTeamResponse>({
    url: `/admin/store/${storeId}/team/list`,
    method: HTTP_METHOD.GET,
    params: { page: '1' },
  });

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  if (isLoading) return <Loader />;

  const team = response?.team;

  return (
    <>
      {team?.map((member) => (
        <ListItem
          key={member.id}
          onClick={() => {
            setModal({
              title: 'Edit Team Member',
              Body: <TeamMemberForm teamMember={member} />,
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
          <p className="flex-1 whitespace-nowrap text-ellipsis overflow-hidden">{member.name}</p>
          <p className="text-sm opacity-60 whitespace-nowrap text-ellipsis overflow-hidden">{member.email}</p>
        </ListItem>
      ))}
    </>
  );
};
