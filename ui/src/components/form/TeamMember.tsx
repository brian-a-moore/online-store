import { SearchBox } from "../input";

type Props = {
  storeId: string;
  teamMember?: {
    id: string;
    name: string;
    email: string;
  };
};

export const TeamMemberForm: React.FC<Props> = ({ storeId }) => {
  return (
    <form>
      <h1>Team Member Form</h1>
      <SearchBox storeId={storeId} />
    </form>
  );
};
