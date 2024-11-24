type Props = {
  teamMember?: {
    id: string;
    name: string;
    email: string;
  };
};

export const TeamMemberForm: React.FC<Props> = ({ teamMember }) => {
  console.log('TeamMemberForm', teamMember);
  return (
    <form>
      <h1>Team Member Form</h1>
    </form>
  );
};
