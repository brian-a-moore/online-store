type Props = {
    teamMember?: any;
};

export const TeamMemberForm: React.FC<Props> = ({ teamMember }) => {
    console.log('TeamMemberForm', teamMember);
    return(
        <form>
            <h1>Team Member Form</h1>
        </form>
    )
};