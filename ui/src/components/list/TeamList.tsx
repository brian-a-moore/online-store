import { zodResolver } from '@hookform/resolvers/zod';
import { mdiShieldAccount, mdiStoreEdit } from '@mdi/js';
import Icon from '@mdi/react';
import { ColDef, RowClickedEvent } from 'ag-grid-community';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  GetStoreTeamDashboardBody,
  GetStoreTeamDashboardQuery,
  GetStoreTeamDashboardResponse,
} from '../../../../api/src/types/api';
import {
  DEFAULT_FORM_VALUES,
  teamMemberDashboardParamsFormSchema,
} from '../../config/forms/team-member-dashboard-params-form';
import { userRoleOptions, userSearchOptions } from '../../config/options';
import { HTTP_METHOD } from '../../constants';
import { ModalContext } from '../../context/ModalContext';
import useApi from '../../hooks/useApi';
import useDebounce from '../../hooks/useDebounce';
import { AgGrid } from '../container';
import { TeamMemberForm } from '../form';
import { SelectInput, TextInput } from '../input';
import { EmptyText } from '../typography';

type Props = {
  storeId: string;
  reload?: string;
};

type Row = GetStoreTeamDashboardResponse['team'][0];

const columns: ColDef[] = [
  {
    field: 'id',
    hide: true,
  },
  {
    field: 'name',
    headerName: 'Team Member',
    flex: 2,
  },
  {
    field: 'email',
    headerName: 'Member Email',
    flex: 2,
  },
  {
    field: 'store.roleId',
    headerName: 'Role',
    width: 100,
    cellRenderer: (params: any) => (
      <div className="flex h-full items-center justify-center">
        <div>
          <Icon
            path={params.value === 1 ? mdiShieldAccount : mdiStoreEdit}
            size={0.75}
            title={params.value === 1 ? 'Manager' : 'Editor'}
          />
        </div>
      </div>
    ),
  },
];

export const TeamList: React.FC<Props> = ({
  storeId,
  reload: passedInReload,
}) => {
  const { openModal } = useContext(ModalContext);
  const navigate = useNavigate();
  const [params, setParams] =
    useState<GetStoreTeamDashboardQuery>(DEFAULT_FORM_VALUES);
  const [reload, setReload] = useState<string>();

  const { error, isLoading, response } = useApi<
    GetStoreTeamDashboardBody,
    GetStoreTeamDashboardQuery,
    GetStoreTeamDashboardResponse
  >(
    {
      url: `/dashboard/store/${storeId}/team`,
      method: HTTP_METHOD.GET,
      params,
    },
    { reTrigger: reload },
  );

  const {
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: zodResolver(teamMemberDashboardParamsFormSchema),
  });

  const form = watch();
  const debouncedSearch = useDebounce(form.search as string, 300);

  useEffect(() => {
    setParams(form);
  }, [form.page, form.searchKey, form.roleFilter, debouncedSearch]);

  useEffect(() => {
    if (error) navigate(`/500?error=${error}`);
  }, [error]);

  useEffect(() => {
    if (passedInReload) setReload(passedInReload);
  }, [passedInReload]);

  const openEditMemberForm = (
    teamMember: GetStoreTeamDashboardResponse['team'][0],
  ) => {
    openModal(<TeamMemberForm storeId={storeId} existingMember={teamMember} />);
  };
  const onRowClicked = (e: RowClickedEvent<Row>) => openEditMemberForm(e.data!);

  if (isLoading) return <p>Loading...</p>;

  const team = response?.team;

  return (
    <>
      <div className="flex gap-4">
        <TextInput
          type="search"
          name="search"
          label="Search Team"
          control={control}
          invalidText={errors?.search?.message}
        />
        <SelectInput
          name="searchKey"
          label="Search By"
          options={userSearchOptions}
          control={control}
          invalidText={errors?.searchKey?.message}
        />
        <SelectInput
          name="roleFilter"
          label="Role"
          options={userRoleOptions}
          control={control}
          invalidText={errors?.roleFilter?.message}
        />
      </div>
      {team && team.length ? (
        <AgGrid<Row> cols={columns} rows={team} onRowClicked={onRowClicked} />
      ) : (
        <EmptyText className="text-center">No team members found</EmptyText>
      )}
    </>
  );
};
