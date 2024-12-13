import { zodResolver } from '@hookform/resolvers/zod';
import { mdiClose, mdiDelete } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  AddStoreRelationDashboardBody,
  GetStoreTeamDashboardResponse,
  SearchUsersDashboardResponse,
} from '../../../../../api/src/types/api';
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
  existingMember?: GetStoreTeamDashboardResponse['team'][0];
  forceReload: () => void;
};

type TeamMember = SearchUsersDashboardResponse['users'][0];

export const TeamMemberForm: React.FC<Props> = ({ storeId, existingMember, forceReload }) => {
  const { closeModal, openModal } = useContext(ModalContext);
  const { setToast } = useContext(ToastContext);
  const navigate = useNavigate();
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

  useEffect(() => {
    if (existingMember) {
      setValue('userId', existingMember.id);
      setValue('roleId', existingMember.store.roleId);
      setTeamMember({ id: existingMember.id, name: existingMember.name, email: existingMember.email });
    }
  }, [existingMember]);

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
      if (existingMember) {
        await api.dashboard.updateStoreRelation(existingMember.store.id, relation.roleId);
        setToast({ type: 'success', message: 'Team member updated successfully' });
      } else {
        await api.dashboard.addStoreRelation({ ...relation, storeId });
        setToast({ type: 'success', message: 'Team member added successfully' });
      }
      closeModal();
      forceReload();
    } catch (error: any | unknown) {
      setFormError(error?.response?.data?.message || 'An unknown error occurred: Please try again later.');
    }
  };

  const openDeleteRelationshipDialog = (id: string) => {
    const onClick = async () => {
      try {
        await api.dashboard.deleteStoreRelation(id);
        closeModal();
        forceReload();
        setToast({ type: 'success', message: 'User removed from team successfully' });
      } catch (error: any | unknown) {
        navigate(`/500?error=${error.response?.data?.message || 'An unknown error occurred: Please try again later.'}`);
      }
    };
    openModal(
      <>
        <H3>Remove Team Member</H3>
        <p>Are you sure you want to remove this user from the team?</p>
        <div className="flex justify-between">
          <Button variant="tertiary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onClick}>
            Remove Team Member
          </Button>
        </div>
      </>,
    );
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between">
        <H3>{existingMember ? 'Edit' : 'Add'} Team Member</H3>
        {existingMember ? (
          <div className="flex gap-4">
            <Button
              variant="tertiary"
              title="Remove Team Member"
              onClick={() => openDeleteRelationshipDialog(existingMember.store.id)}
            >
              <Icon path={mdiDelete} size={0.75} />
            </Button>
          </div>
        ) : null}
      </div>
      <Separator />
      {teamMember ? (
        <div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col flex-1">
              <p className="text-lg font-semibold">{teamMember.name}</p>
              <p className="text-sm text-gray-500">{teamMember.email}</p>
            </div>
            {!existingMember ? (
              <Button variant="destructive" onClick={clearTeamMember}>
                <Icon path={mdiClose} size={0.5} />
              </Button>
            ) : null}
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
        <Button variant="tertiary" onClick={closeModal}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (existingMember ? 'Updating' : 'Adding') : existingMember ? 'Update' : 'Add'} Team Member
        </Button>
      </div>
    </form>
  );
};
