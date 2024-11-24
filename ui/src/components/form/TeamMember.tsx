import { useState } from 'react';
import { SearchBox } from '../input';

type Props = {
  storeId: string;
  teamMember?: {
    id: string;
    name: string;
    email: string;
  };
};

export const TeamMemberForm: React.FC<Props> = ({ storeId }) => {
  const [teamMember, setTeamMember] = useState<Props['teamMember'] | null>(null);

  const selectTeamMember = (teamMember: Props['teamMember']) => {
    setTeamMember(teamMember);
  };

  return (
    <form>
      <SearchBox storeId={storeId} selectTeamMember={selectTeamMember} />
      {teamMember && (
        <div>
          <h2>Selected Team Member</h2>
          <p>{teamMember.name}</p>
          <p>{teamMember.email}</p>
        </div>
      )}
    </form>
  );
};
