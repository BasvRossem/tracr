import * as React from 'react';

import Button from '@mui/material/Button'; 
import { useSelector, useDispatch } from 'react-redux';
import { addLog } from './../../data/logSlice';

import { LogModalBase } from "./LogModal";

export function CreateLogModal(props) {
  const dispatch = useDispatch();
  const selectedLog = useSelector((state) => state.selectedLog);
  
  const handleCreateLog = () => {  
    const data = {
      ...selectedLog,
      date: new Date(selectedLog.startTime).toISOString().split("T")[0],
    };

    delete data.id;

    dispatch(addLog(JSON.stringify(data)));
    props.handleClose();
  }

  const button = <Button variant="contained" className="log-modal-button" onClick={handleCreateLog}>Create</Button>;
  return (
    <LogModalBase
      open={props.open}
      handleClose={props.handleClose}
      actionButton={button}
    />
  );
}