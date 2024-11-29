import { zodResolver } from '@hookform/resolvers/zod';
import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AddStoreRelationDashboardBody, SearchUsersDashboardResponse } from '../../../../../api/src/types/api';
import { api } from '../../../api';
import { DEFAULT_FORM_VALUES, teamMemberDashboardFormSchema } from '../../../config/forms/team-member-dashboard-form';
import { roleOptions } from '../../../config/options';
import { ModalContext } from '../../../context/ModalContext';
import { ToastContext } from '../../../context/ToastContext';
import { Alert } from '../../container';
import { Separator } from '../../display';
import { SearchBox, SelectInput } from '../../input';
import { Button } from '../../interactive';
import { ErrorText, H3 } from '../../typography';

type Props = {
  storeId: string;
  forceReload: () => void;
};

type TeamMember = SearchUsersDashboardResponse['users'][0];

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
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: zodResolver(teamMemberDashboardFormSchema),
  });

  const roleId = watch('roleId');

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
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <H3>Add Team Member</H3>
      <Separator />
      {teamMember ? (
        <div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col flex-1">
              <p className="text-lg font-semibold">{teamMember.name}</p>
              <p className="text-sm text-gray-500">{teamMember.email}</p>
            </div>
            <Button variant="destructive" onClick={clearTeamMember}>
              <Icon path={mdiClose} size={0.5} />
            </Button>
          </div>
        </div>
      ) : (
        <>
          <SearchBox selectTeamMember={selectTeamMember} />
          <Alert type="info">
            If you cannot find the user you are looking for, contact your administrator to have them added to the
            application.
          </Alert>
        </>
      )}
      {errors.userId && <ErrorText>Please search for a user</ErrorText>}
      <SelectInput
        name="roleId"
        control={control}
        label="Role"
        options={roleOptions}
        invalidText={errors.roleId?.message}
      />
      {formError && <ErrorText>{formError}</ErrorText>}
      {roleId === 1 ? (
        <p className="text-sm">
          <strong>Managers</strong> can add, change the role of and remove team members, update the store's information
          and create, update and delete products and items.
        </p>
      ) : (
        <p className="text-sm">
          <strong>Editors</strong> can create, update and delete products and items.
        </p>
      )}
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
