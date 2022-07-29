import * as React from 'react';
import TextField from '@mui/material/TextField';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';

import { useSelector, useDispatch } from 'react-redux';
import { setStartTime, setStopTime, setTitle, setNotes } from './../../data/selectedLogSlice';
import { tickets } from '../../constants';

import './LogModal.css';

export function LogModalBase(props) {
  const dispatch = useDispatch();

  const handleListItemClick = (_event, ticketTitle) => {
    dispatch(setTitle(ticketTitle));
  };

  const ticketItems = tickets.map(ticket => (
    <Tooltip title={ticket.tooltip} placement="right" key={ticket.title}>
      <ListItemButton 
        onClick={(event) => handleListItemClick(event, ticket.title)}
      >
        <ListItemText primary={ticket.title + " " + ticket.name} />
      </ListItemButton>
    </Tooltip>
  ));

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
            label="Standard"
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

          <List className='log-modal-tickets'>
            {ticketItems}
          </List>
        </Box>
      </Modal>
    </div>
  );
}