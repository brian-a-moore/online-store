import { iconSetMaterial, themeQuartz } from '@ag-grid-community/theming';
import { ColDef, RowClickedEvent } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useEffect, useState } from 'react';
import '../../styles/ag-grid.css';

const myTheme = themeQuartz.withPart(iconSetMaterial).withParams({
  accentColor: '#64748B',
  backgroundColor: '#FFFFFF',
  chromeBackgroundColor: {
    ref: 'foregroundColor',
    mix: 0.07,
    onto: 'backgroundColor',
  },
  headerBackgroundColor: '#F1F5F9',
  columnBorder: false,
  fontFamily: 'inherit',
  rowHeight: 50,
  fontSize: '16px',
  foregroundColor: '#1E293B',
  headerFontSize: 14,
  rowHoverColor: '#64748B',
  wrapperBorder: false,
  oddRowBackgroundColor: '#F1F5F9',
  rowBorder: false,
  sidePanelBorder: false,
});

type Props<Row> = {
  cols: ColDef[];
  rows: Row[];
  onRowClicked: (e: RowClickedEvent<Row>) => void;
};

export const AgGrid = <Row,>({ cols, rows, onRowClicked }: Props<Row>) => {
  const [columnDefs, setColumnDefs] = useState<ColDef[]>(cols);
  const [rowData, setRowData] = useState<Row[]>(rows);

  useEffect(() => {
    if (cols !== columnDefs) {
      setColumnDefs(cols);
    }
    if (rows !== rowData) {
      setRowData(rows);
    }
  }, [cols, rows]);

  return (
    <div>
      <AgGridReact<Row>
        columnDefs={columnDefs}
        rowData={rowData}
        onRowClicked={onRowClicked}
        theme={myTheme}
        domLayout="autoHeight"
      />
    </div>
  );
};
