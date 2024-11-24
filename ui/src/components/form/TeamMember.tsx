import { SearchBox } from "../input";

type Props = {
  storeId: string;
  teamMember?: {
    id: string;
    name: string;
    email: string;
  };
};

export const TeamMemberForm: React.FC<Props> = ({ storeId, teamMember }) => {
  console.log('TeamMemberForm searchId', storeId);
  console.log('TeamMemberForm', teamMember);
  return (
    <form>
      <h1>Team Member Form</h1>
      <SearchBox storeId={storeId} />
    </form>
  );
};
