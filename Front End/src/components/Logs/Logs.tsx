import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook'
import { Link } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef, GridColumns } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { CreateLogModal, UpdateLogModal } from '../LogModal';

import { useSelector, useDispatch } from 'react-redux';
import { delLog } from '../../data/logSlice';
import { CurrentDate } from './CurrentDate';
import { formatDateToHourMinute } from '../../utils';
import { JIRA_URL } from '../../constants';

import "./Logs.css";
import { logApiDate } from '../../utils/time';
import store from '../../data/store';
import { SpeedDial } from './SpeedDial';

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

export function Logs() {
  const dispatch = useDispatch();

  const [openCreate, setOpenCreate] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [lastLog, setLastLog] = React.useState({});
  const [logToUpdate, setLogToUpdate] = React.useState({});

  const handleOpenCreate = () => {
    const lastLog = store.getState().logger.value[store.getState().logger.value.length - 1];
    let newLog: any | undefined;
    if (store.getState().logger.value.length !== 0) {
      newLog = {startTime: lastLog.stopTime}
    }
    setLastLog(newLog);
    setOpenCreate(true);
  }

  const handleDelete = (id) => {
    const date = store.getState().currentDate.value;
    dispatch(delLog({id, date: logApiDate(new Date(date))}));
  };

  const openUpdateModal = (row) => {
    setLogToUpdate(row)
    setOpenUpdate(true)
  };

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
        <GridActionsCellItem icon={<EditIcon />} onClick={() => openUpdateModal(params.row)} label="View/edit" />,
        <GridActionsCellItem icon={<DeleteIcon />} onClick={() => handleDelete(params.id)} label="Delete" />,
      ]
    } as GridColDef
  ];

  useHotkeys('ctrl+a', () => setOpenCreate(true)); 
  
  return (
    <div>
      <CurrentDate />
      <DataGrid
        rows={useSelector((state: any) => state.logger.value)}
        columns={columns}
        disableSelectionOnClick
        autoHeight
        hideFooter
      />

      {openCreate ? <CreateLogModal lastLog={lastLog} open={openCreate} setIsOpen={(val: boolean) => setOpenCreate(val)}/> : ""}
      {openUpdate ? <UpdateLogModal log={logToUpdate} open={openUpdate} setIsOpen={(val: boolean) => setOpenUpdate(val)} /> : ""}
      <Button onClick={handleOpenCreate}>Add new log</Button>
      <SpeedDial
        setLog={setLastLog}
        openCreateModal={() => setOpenCreate(true)}
      />
    </div>
  )
}