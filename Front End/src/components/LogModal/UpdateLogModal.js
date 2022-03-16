import * as React from 'react';

import Button from '@mui/material/Button'; 
import { useSelector, useDispatch } from 'react-redux';
import { updateLog } from './../../data/logSlice';

import { LogModalBase } from "./LogModal";

export function UpdateLogModal(props) {
  const dispatch = useDispatch();
  const selectedLog = useSelector((state) => state.selectedLog);

  const handleUpdateLog = () => {
    const data = JSON.stringify({
      ...selectedLog,
      date: new Date(selectedLog.startTime).toISOString().split("T")[0],
    });

    dispatch(updateLog(data));
    props.handleClose();
  }

  const button = <Button variant="contained" className="log-modal-button" onClick={handleUpdateLog}>Update</Button>;
  return (
    <LogModalBase
      open={props.open}
      handleClose={props.handleClose}
      actionButton={button}
    />
  );
}