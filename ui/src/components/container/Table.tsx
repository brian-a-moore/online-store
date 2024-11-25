interface Column {
  key: string;
  label: string;
}

interface Props<T> {
  columns: Column[];
  data: T[];
  config?: {
    columnSorting: boolean;
    striped: boolean;
  };
}

export const Table = <T,>({ columns, data }: Props<T>) => {
  return (
    <div className="flex w-full overflow-x-auto">
      <table className="w-full border-collapse min-w-[640px]">
        <thead>
          <tr className="flex">
            {columns.map((column) => (
              <th className="flex-1 border-2 px-4 py-2 bg-slate-200 text-left" key={column.key}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="flex flex-1 hover:bg-sky-200 !text-left hover:cursor-pointer">
              {columns.map((column) => (
                <td key={column.key} className="flex-1 border-2 px-4 py-2 whitespace-nowrap line-clamp-1">
                  {(item as any)[column.key].toString().slice(0, 100)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
