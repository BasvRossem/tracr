import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook'
import { useDispatch } from 'react-redux';

import Button from '@mui/material/Button';

import { delLog } from '../../data/logSlice';
import store from '../../data/store';
import { logApiDate } from '../../utils/time';
import { CurrentDate } from './CurrentDate';
import { CreateLogModal, UpdateLogModal } from '../LogModal';
import { SpeedDial } from './SpeedDial';
import { LogGrid } from './LogGrid';

import "./Logs.css";

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

  useHotkeys('ctrl+a', () => setOpenCreate(true)); 
  
  return (
    <div>
      <CurrentDate />
      <LogGrid 
        updateLog={(log: any) => openUpdateModal(log)}
        deleteLog={(id: string) => handleDelete(id)}
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