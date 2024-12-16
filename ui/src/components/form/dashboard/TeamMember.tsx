import { zodResolver } from '@hookform/resolvers/zod';
import { mdiClose, mdiDelete } from '@mdi/js';
import Icon from '@mdi/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  AddStoreRelationDashboardBody,
  GetStoreTeamDashboardResponse,
  SearchUsersDashboardResponse,
} from '../../../../../api/src/types/api';
import { api } from '../../../api';
import {
  DEFAULT_FORM_VALUES,
  teamMemberDashboardFormSchema,
} from '../../../config/forms/team-member-dashboard-form';
import { userRoleOptions } from '../../../config/options';
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
};

type TeamMember = SearchUsersDashboardResponse['users'][0] & {
  relationId?: string;
};

export const TeamMemberForm: React.FC<Props> = ({
  storeId,
  existingMember,
}) => {
  const { closeModal, openModal } = useContext(ModalContext);
  const { setToast } = useContext(ToastContext);
  const navigate = useNavigate();
  const [teamMember, setTeamMember] = useState<TeamMember | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const queryClient = useQueryClient();

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
      setValue('userId', existingMember.userId);
      setValue('roleId', existingMember.roleId);
      setTeamMember({
        relationId: existingMember.relationId,
        id: existingMember.userId,
        name: existingMember.name,
        email: existingMember.email,
      });
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

  const createStoreRelationMutation = useMutation({
    mutationFn: api.relation.addStoreRelation,
    onError: (error) => {
      setFormError(error.message || 'An unknown error occurred');
    },
    onSuccess: () => {
      setToast({
        type: 'success',
        message: 'Team member added to store successfully',
      });
      queryClient.refetchQueries({
        queryKey: ['get-team-dashboard'],
      });
      closeModal();
    },
  });

  const updateStoreRelationMutation = useMutation({
    mutationFn: api.relation.updateStoreRelation,
    onError: (error) => {
      setFormError(error.message || 'An unknown error occurred');
    },
    onSuccess: () => {
      setToast({
        type: 'success',
        message: 'Team member role updated successfully',
      });
      queryClient.refetchQueries({ queryKey: ['list-relations-dashboard'] });
      queryClient.refetchQueries({
        queryKey: ['get-team-dashboard'],
      });
      closeModal();
    },
  });

  const deleteRelationMutation = useMutation({
    mutationFn: api.relation.deleteStoreRelation,
    onError: (error) => {
      setFormError(error.message || 'An unknown error occurred');
    },
    onSuccess: () => {
      setToast({
        type: 'success',
        message: 'User removed from store successfully',
      });
      queryClient.refetchQueries({ queryKey: ['get-team-dashboard'] });
      closeModal();
    },
  });

  const onSubmit = async (
    relation: Omit<AddStoreRelationDashboardBody, 'storeId'>,
  ) => {
    if (existingMember)
      return updateStoreRelationMutation.mutate({
        relationId: existingMember.relationId,
        roleId: relation.roleId,
      });
    return createStoreRelationMutation.mutate({
      ...relation,
      storeId,
    });
  };

  const openDeleteRelationshipDialog = (relationId: string) => {
    const onClick = () => deleteRelationMutation.mutate(relationId);
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
              onClick={() =>
                openDeleteRelationshipDialog(existingMember.relationId)
              }
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
            If you cannot find the user you are looking for, contact your
            administrator to have them added to the application.
          </Alert>
        </>
      )}
      {errors.userId && <ErrorText>Please search for a user</ErrorText>}
      <SelectInput
        name="roleId"
        control={control}
        label="Role"
        options={userRoleOptions}
        invalidText={errors.roleId?.message}
      />
      {formError && <ErrorText>{formError}</ErrorText>}
      {roleId === 1 ? (
        <p className="text-sm">
          <strong>Managers</strong> can add, change the role of and remove team
          members, update the store's information and create, update and delete
          products and items.
        </p>
      ) : (
        <p className="text-sm">
          <strong>Editors</strong> can create, update and delete products and
          items.
        </p>
      )}
      <Separator />
      <div className="flex justify-between">
        <Button variant="tertiary" onClick={closeModal}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? existingMember
              ? 'Updating'
              : 'Adding'
            : existingMember
              ? 'Update'
              : 'Add'}{' '}
          Team Member
        </Button>
      </div>
    </form>
  );
};
