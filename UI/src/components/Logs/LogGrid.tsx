import { Link } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef, GridColumns } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { useSelector } from 'react-redux';
import { formatDateToHourMinute } from '../../utils';
import { JIRA_URL } from '../../constants';
import { RootState } from '../../data/store';

function createColumn(field: string, header: string, width: number, type: string, flex: number) {
  return {
    field: field,
    headerName: header,
    width: width > 0 ? width : undefined,
    type: type,
    editable: false,
    flex: flex,
  }
}

interface LogGridInterface {
  updateLog: (log: any) => void;
  deleteLog: (id: string) => void;
}

export function LogGrid(props: LogGridInterface) {
  const columns: GridColumns = [
    {
      ...createColumn('startTime', 'Time', 100, 'string', 0),
      renderCell: (cellValues) => {
        return <>{formatDateToHourMinute(cellValues.row.startTime)} - {formatDateToHourMinute(cellValues.row.stopTime)}</>
      }
    },
    {
      ...createColumn('title', 'Ticket ID', 100, 'string', 0),
      renderCell: (cellValues) => {
        return <Link color="black" underline={"none"} href={`${JIRA_URL}${cellValues.row.title}`}>{cellValues.row.title}</Link>;
      }
    },
    createColumn('notes', 'Notes', 0, 'string', 1),
    {
      ...createColumn('actions', '', 100, 'actions', 0),
      getActions: (params) => [
        <GridActionsCellItem icon={<EditIcon />} onClick={() => props.updateLog(params.row)} label="View/edit" />,
        <GridActionsCellItem icon={<DeleteIcon />} onClick={() => props.deleteLog(params.id)} label="Delete" />,
      ]
    } as GridColDef
  ];
  
  return (
    <DataGrid
      rows={useSelector((state: RootState) => state.logger.value.logs)}
      columns={columns}
      disableSelectionOnClick
      autoHeight
      hideFooter
    />
  );
}