import { zodResolver } from '@hookform/resolvers/zod';
import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { AddStoreRelationDashboardBody, SearchUsersDashboardResponse } from '../../../../../api/src/types/api';
import { api } from '../../../api';
import { ModalContext } from '../../../context/ModalContext';
import { ToastContext } from '../../../context/ToastContext';
import { Alert } from '../../container';
import { Separator } from '../../display';
import { ErrorText, SearchBox, SelectInput } from '../../input';
import { Button } from '../../interactive';
import { H3 } from '../../typography';

type TeamMemberForm = {
  userId: string;
  roleId: number;
};

type Props = {
  storeId: string;
  forceReload: () => void;
};

type TeamMember = SearchUsersDashboardResponse['users'][0];

const EDIT_TEAM_MEMBER_FORM_INITIAL_VALUES: TeamMemberForm = {
  userId: '',
  roleId: 2,
};

const EditTeamMemberFormSchema = z.object({
  userId: z.string().uuid(),
  roleId: z.number().min(1).max(2),
}).strict();

export const TeamMemberForm: React.FC<Props> = ({ storeId, forceReload }) => {
  const { closeModal } = useContext(ModalContext);
  const { setToast } = useContext(ToastContext);
  const [teamMember, setTeamMember] = useState<TeamMember | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: EDIT_TEAM_MEMBER_FORM_INITIAL_VALUES,
    resolver: zodResolver(EditTeamMemberFormSchema),
  });

  const selectTeamMember = (teamMember: TeamMember) => {
    setValue('userId', teamMember.id);
    setTeamMember(teamMember);
    clearErrors('userId');
  };

  const clearTeamMember = () => {
    setValue('userId', '');
    setTeamMember(null);
  };

  const onSubmit = async (relation: Omit<AddStoreRelationDashboardBody, 'storeId'>) => {
      try {
      await api.dashboard.addStoreRelation({ ...relation, storeId });
      closeModal();
      forceReload();
      setToast({ type: 'success', message: 'Team member added successfully' });
    } catch (error: any | unknown) {
      setFormError(error?.response?.data?.message || 'An unknown error occurred: Please try again later.');
    }
  };

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
      <H3>Add Team Member</H3>
      <Separator />
      {teamMember ? (<div>
        <div className='flex items-center gap-4'>
          <div className='flex flex-col flex-1'>
            <p className='text-lg font-semibold'>{teamMember.name}</p>
            <p className='text-sm text-gray-500'>{teamMember.email}</p>
          </div>
          <Button variant='destructive' onClick={clearTeamMember}>
            <Icon path={mdiClose} size={0.5} />
          </Button>
        </div>
      </div>) : (<SearchBox storeId={storeId} selectTeamMember={selectTeamMember} />)}
      {errors.userId && <ErrorText className='mt-[-8px]'>Please search for a user</ErrorText>}
      <SelectInput name='roleId' control={control} label='Role' options={new Map([
        [1, 'Manager'],
        [2, 'Editor']
      ])} invalidText={errors.roleId?.message} />
      {formError && <ErrorText>{formError}</ErrorText>}
      <Alert type='warn'>If you cannot find the user you are looking for, contact your administrator to have them added to the application.</Alert>
      <Separator />
      <div className="flex justify-between">
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding Team Member...' : 'Add Team Member'}
        </Button>
      </div>
    </form>
  );
};
