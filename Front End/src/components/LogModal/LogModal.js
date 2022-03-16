import * as React from 'react';
import TextField from '@mui/material/TextField';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'; 
import Modal from '@mui/material/Modal';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import { useSelector, useDispatch } from 'react-redux';
import { setStartTime, setStopTime, setTitle, setNotes } from './../../data/selectedLogSlice';

import './LogModal.css';

export function LogModalBase(props) {
  const dispatch = useDispatch()

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="log-modal">
          <TextField
            id="standard-basic"
            label="Standard"
            defaultValue={useSelector((state) => state.selectedLog.title)}
            variant="standard"
            className="log-modal-title"
            onChange={(data) => dispatch(setTitle(data.target.value))}
          />
          <div className="log-modal-times">
            <LocalizationProvider dateAdapter={AdapterDateFns} >
              <DateTimePicker
                label="Start time"
                value={useSelector((state) => state.selectedLog.startTime)}
                onChange={(data) => dispatch(setStartTime(data))}
                renderInput={(params) => <TextField {...params} />}
              />
              <DateTimePicker
                label="Stop time"
                value={useSelector((state) => state.selectedLog.stopTime)}
                onChange={(data) => dispatch(setStopTime(data))}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>

          <TextField
            id="outlined-multiline-static"
            label="Notes"
            defaultValue={useSelector((state) => state.selectedLog.notes)}
            multiline
            rows={4}
            onChange={(data) => dispatch(setNotes(data.target.value))}
            className="log-modal-notes"
          />
          {
            props.actionButton
          }
          <Button variant="outlined" className="log-modal-button log-modal-button-cancel" onClick={props.handleClose}>Cancel</Button>
        </Box>
      </Modal>
    </div>
  );
}