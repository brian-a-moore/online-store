export type ColumnConfig = {
  key: string;
  label: string;
  render: (value: any) => React.JSX.Element;
};

interface Props<T> {
  columns: ColumnConfig[];
  data: T[];
  onRowClick: (id: string) => void;
}

export const Table = <T,>({ columns, data, onRowClick }: Props<T>) => {
  return (
    <div className="flex w-full overflow-x-auto">
      <table className="w-full border-collapse min-w-[640px]">
        <thead>
          <tr className="flex">
            {columns.map((column) => (
              <th className="flex-1 border-b-[1px] border-slate-300 px-4 py-2 bg-slate-200 text-left" key={column.key}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              onClick={() => onRowClick((item as any).id)}
              className="flex flex-1 hover:bg-sky-200 !text-left hover:cursor-pointer"
            >
              {columns.map((column: ColumnConfig) => {
                const value = item[column.key as keyof T];
                return (
                  <td className="flex-1 border-b-[1px] border-slate-300 px-4 py-2" key={column.key}>
                    {column.render(value)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
