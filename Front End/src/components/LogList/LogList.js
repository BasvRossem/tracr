import * as React from 'react';
import { Link } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { CreateLogModal, UpdateLogModal } from '../LogModal';

import { useSelector, useDispatch } from 'react-redux';
import { getLogs, delLog } from './../../data/logSlice';
import { reset, set, setLogId, setStartTime, setStopTime } from './../../data/selectedLogSlice';


import "./LogList.css";

function createColumn(field, header, width, type, flex) {
  return {
    field: field,
    headerName: header,
    width: width > 0 ? width : undefined,
    type: type,
    editable: false,
    flex: flex,
  }
}

function formatDateToHourMinute(date) {
  const hour = new Date(date).getHours();
  const hourString = hour < 10 ? `0${hour}` : hour;
  const minutes = new Date(date).getMinutes();
  const minuteString = minutes < 10 ? `0${minutes}` : minutes;

  return `${hourString}:${minuteString}`;
}

function CurrentDate() {
  const date = useSelector((state) => state.currentDate.value);
  const myDate = new Date(date.toString());
  let day = myDate.getDate();
  let month = myDate.getMonth() + 1;
  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;
  const year = myDate.getFullYear();

  const dispatch = useDispatch();
  dispatch(getLogs(`${year}-${month}-${day}`));
  return (<h2>{date}</h2>)
}

export function LogList() {
  const [openCreate, setOpenCreate] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const handleOpenCreate = () => setOpenCreate(true);
  const handleOpenUpdate = () => setOpenUpdate(true);
  const handleCloseCreate = () => setOpenCreate(false);
  const handleCloseUpdate = () => setOpenUpdate(false);
  const todaysLogs = useSelector((state) => state.logger);

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(delLog(id));
  }

  const openUpdateModal = (row) => {
    const data = {
      ...row,
      logId: row.id,
      isUpdateModal: true
    }

    dispatch(set(data));
    dispatch(setLogId(row.id));
    handleOpenUpdate();
  }

  const openEmptyModal = () => {
    dispatch(reset());

    if(todaysLogs.value.length > 0) {
      const lastLog = todaysLogs.value[todaysLogs.value.length - 1];
      const startTime = new Date(lastLog.stopTime);
      dispatch(setStartTime(startTime.toString()));
      startTime.setHours(startTime.getHours() + 1);
      dispatch(setStopTime(startTime.toString()));
    }
        
    handleOpenCreate();
  }

  const columns = [
    {
      ...createColumn('startTime', 'Start', 100, 'string', 0),
      valueFormatter: (params) => formatDateToHourMinute(params.value)
    },
    {
      ...createColumn('stopTime', 'Stop', 100, 'string', 0),
      valueFormatter: (params) => formatDateToHourMinute(params.value)
    },
    {
      ...createColumn('title', 'Ticket ID', 100, 'string', 0),
      renderCell: (cellValues) => {
        return <Link color="black" underline={"none"} href={`https://mendrix.atlassian.net/browse/${cellValues.row.title}`}>{cellValues.row.title}</Link>;
      }
    },
    createColumn('notes', 'Notes', 0, 'string', 1),
    {
      ...createColumn('actions', '', 100, 'actions', 0),
      getActions: (params) => [
        <GridActionsCellItem icon={<EditIcon />} onClick={() => openUpdateModal(params.row)} label="View/edit" />,
        <GridActionsCellItem icon={<DeleteIcon />} onClick={() => handleDelete(params.id)} label="Delete" />,
      ]
    },
  ]

  return (
    <div>
      <CurrentDate />
      <DataGrid
        rows={useSelector((state) => state.logger.value)}
        columns={columns}
        checkboxSelection
        disableSelectionOnClick
        autoHeight
      />

      <Button onClick={openEmptyModal}>Add new log</Button>
      <CreateLogModal
        open={openCreate}
        handleClose={handleCloseCreate}
      />
      <UpdateLogModal
        open={openUpdate}
        handleClose={handleCloseUpdate}
      />
    </div>
  )
}