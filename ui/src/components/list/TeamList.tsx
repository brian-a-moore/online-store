import { useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { GetTeamBody, GetTeamQuery, GetTeamResponse } from '../../../../api/src/types/api';
import { Loader } from '../../components/core';
import { HTTP_METHOD } from '../../constants';
import useApi from '../../hooks/useApi';

type Props = {
  storeId: string;
};

export const TeamList: React.FC<Props> = ({ storeId }) => {
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
        <RouterLink
          className="flex gap-4 p-4 items-center bg-white hover:bg-slate-100 text-slate-800 border-[1px] rounded shadow-md"
          key={member.id}
          to={`/admin/user/${member.id}`}
          title={`View user: ${member.name}`}
        >
          <p className="flex-1 whitespace-nowrap text-ellipsis overflow-hidden">{member.name}</p>
          <p className="text-sm opacity-60 whitespace-nowrap text-ellipsis overflow-hidden">{member.email}</p>
        </RouterLink>
      ))}
    </>
  );
};
