import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useDispatch } from 'react-redux';

import Button from '@mui/material/Button';

import { Log } from '../../types';
import { CreateLogModal, UpdateLogModal } from '../LogModal';
import { LogGrid } from './LogGrid';

import { storage } from '../../data/Storage';
import { updateDay } from '../../data/daySlice';
import "./Logs.css";

export function Logs() {
  const dispatch = useDispatch();

  const [openCreate, setOpenCreate] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [newLog, setNewLog] = React.useState<Log | undefined>();
  const [logToUpdate, setLogToUpdate] = React.useState<Log>();

  const handleOpenCreate = () => {
    const lastLog = storage.day.lastLog;
    let newLog: any | undefined;
    if (storage.day.logs.length !== 0) {
      newLog = { startTime: lastLog.stopTime }
    }
    setNewLog(newLog);
    setOpenCreate(true);
  }

  const handleDelete = (id: string) => {
    const newState = storage.day.removeLog(id);
    dispatch(updateDay(newState));
  };

  const openUpdateModal = (row) => {
    setLogToUpdate(row)
    setOpenUpdate(true)
  };

  useHotkeys('ctrl+a', () => setOpenCreate(true));

  return (
    <>
      <LogGrid
        updateLog={(log: any) => openUpdateModal(log)}
        deleteLog={(id: string) => handleDelete(id)}
      />
      {openCreate ? <CreateLogModal log={newLog} open={openCreate} setIsOpen={(val: boolean) => setOpenCreate(val)} /> : ""}
      {openUpdate ? <UpdateLogModal log={logToUpdate} open={openUpdate} setIsOpen={(val: boolean) => setOpenUpdate(val)} /> : ""}
      <Button onClick={handleOpenCreate}>Add new log</Button>
    </>
  )
}