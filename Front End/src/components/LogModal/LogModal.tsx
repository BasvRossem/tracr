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
import { TicketList } from './TicketList';

interface LogModalProps {
  open: boolean;
  onClose?: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
  actionButton: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal;
  handleClose: React.MouseEventHandler<HTMLButtonElement>;
}

export function LogModalBase(props: LogModalProps) {
  const dispatch = useDispatch();

  const handleListItemClick = (ticketTitle: string) => {
    dispatch(setTitle(ticketTitle));
  };

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="log-modal">
          <div>

          <TextField
            autoFocus
            id="standard-basic"
            label="Title"
            value={useSelector((state: any) => state.selectedLog.title) ?? ""}
            variant="standard"
            className="log-modal-title"
            onChange={(data) => dispatch(setTitle(data.target.value))}
          />
          <div className="log-modal-times">
            <LocalizationProvider dateAdapter={AdapterDateFns} >
              <DateTimePicker
                ampm={false}
                label="Start time"
                value={useSelector((state: any) => state.selectedLog.startTime)}
                onChange={(data) => dispatch(setStartTime(data.toString()))}
                renderInput={(params) => <TextField {...params} />}
              />
              <DateTimePicker
                ampm={false}
                label="Stop time"
                value={useSelector((state: any) => state.selectedLog.stopTime)}
                onChange={(data) => dispatch(setStopTime(data.toString()))}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>

          <TextField
            id="outlined-multiline-static"
            label="Notes"
            defaultValue={useSelector((state: any) => state.selectedLog.notes)}
            multiline
            rows={4}
            onChange={(data) => dispatch(setNotes(data.target.value))}
            className="log-modal-notes"
          />
          {
            props.actionButton
          }
          <Button variant="outlined" className="log-modal-button log-modal-button-cancel" onClick={props.handleClose}>Cancel</Button>
          </div>
          <TicketList 
            onItemClick={handleListItemClick}
          />
        </Box>
      </Modal>
    </div>
  );
}