import * as React from 'react';
import { Link } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef, GridColumns } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { CreateLogModal, UpdateLogModal } from '../LogModal';

import { useSelector, useDispatch } from 'react-redux';
import { delLog } from './../../data/logSlice';
import { reset, set, setLogId, setNotes, setStartTime, setStopTime, setTitle } from './../../data/selectedLogSlice';
import { CurrentDate } from './CurrentDate';
import { formatDateToHourMinute } from '../../utils';
import { JIRA_URL } from '../../constants';

import "./LogList.css";


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

export function LogList() {
  const [openCreate, setOpenCreate] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const handleOpenCreate = () => setOpenCreate(true);
  const handleOpenUpdate = () => setOpenUpdate(true);
  const handleCloseCreate = () => setOpenCreate(false);
  const handleCloseUpdate = () => setOpenUpdate(false);
  const todaysLogs = useSelector((state: any) => state.logger.value);
  const date = useSelector((state: any) => state.currentDate.value);
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
    
    if(todaysLogs.length > 0) {
      const lastLog = todaysLogs[todaysLogs.length - 1];
      const startTime = new Date(lastLog.stopTime);
      dispatch(setStartTime(startTime.toString()));
      startTime.setHours(startTime.getHours() + 1);
      dispatch(setStopTime(startTime.toString()));
    } else {
      const startTime = new Date(date);
      startTime.setHours(9);
      dispatch(setStartTime(startTime.toString()));
      startTime.setHours(startTime.getHours() + 1);
      dispatch(setStopTime(startTime.toString()));
    }
        
    handleOpenCreate();
  }

  const quickActions = [
    { 
      name: "Stand-up", 
      onClick: () => { 
        dispatch(reset());
        dispatch(setTitle("BLT-1817")); 
        dispatch(setStartTime(new Date(new Date().setHours(10, 0, 0, 0)))); 
        dispatch(setStopTime(new Date(new Date().setHours(10, 30, 0, 0))));  
        dispatch(setNotes("Stand-up"))
        handleOpenCreate();
      },
      icon: <AccessibilityNewIcon/> 
    }
  ]

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

  return (
    <div>
      <CurrentDate />
      <DataGrid
        rows={useSelector((state: any) => state.logger.value)}
        columns={columns}
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

      <SpeedDial
        ariaLabel="SpeedDial playground example"
        icon={<SpeedDialIcon />}
        sx={{position: "absolute", bottom: 16, right: 16}}
      >
          {quickActions.map((item) => {
            return (<SpeedDialAction
              key={item.name}
              icon={item.icon}
              tooltipTitle={item.name}
              onClick={item.onClick}
            />)
          })}
      </SpeedDial>
    </div>
  )
}