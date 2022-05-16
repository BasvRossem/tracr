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

import './LogModal.css';

const tickets = [
  { title: "BLT-1817", name: "Rituals", tooltip: "Only the standups, the demo, the PoP and the end of the sprint" },
  { title: "BLT-1506", name: "Refinements", tooltip: "Only the refinement sessions" },
  { title: "BLT-139", name: "Meetings", tooltip: "Meetings that are not part of the Scrum/Kanban/Agile rituals or preparations. I.e. the Tech meetings or calls with other people not related to specific stories or bugs" },
  { title: "BLT-168", name: "Dev-Ops", tooltip: "For devops tasks, like setting the pipelines, buildmachine, Git" },
  { title: "BLT-1834", name: "Preparations", tooltip: "Everything that includes investigations, experimentations, and studies are unrelated to a specific ticket" },
  { title: "BLT-1877", name: "Tutoring", tooltip: "All of the time spent spreading the excellent way of coding" },
  { title: "BLT-1863", name: "Problem", tooltip: "Something that is blocking you from working. I.e. your development environment blew up and needs to be reinstalled" },
  { title: "BLT-1866", name: "Other", tooltip: "Checking the mail and planning the day " },
  { title: "BLT-208", name: "PlayHours", tooltip: "Make things that you think help out MendriX but you are not sure, a few hours a week" },
  { title: "BLT-221", name: "PoP", tooltip: "Working on your set goals and discussing them with your lead" },
  { title: "BLT-1832", name: "Reporting backlog", tooltip: "Reporting backlog" },
  { title: "BLT-159", name: "Reports", tooltip: "All communication customizations such as reports and XSLT's" },
  { title: "BLT-1878", name: "General R&D work", tooltip: "Everything related to research and development (usually what the MLT does) " },
  { title: "BLT-843", name: "Project WBSO", tooltip: "Story writing, hours automation, hours analysis, meetings/calls with Venderion or Robin" },
  { title: "BLT-842", name: "Stageproject", tooltip: "Tutoring the intern, working on intern recruitment incl. interviews and mail" },
  { title: "BLT-1608", name: "Recruitment", tooltip: "Mailing with recruiters, interviews with candidates" }
]

export function LogModalBase(props) {
  const dispatch = useDispatch();

  const handleListItemClick = (event, ticketTitle) => {
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
            id="standard-basic"
            label="Standard"
            value={useSelector((state) => state.selectedLog.title) ?? ""}
            variant="standard"
            className="log-modal-title"
            onChange={(data) => dispatch(setTitle(data.target.value))}
          />
          <div className="log-modal-times">
            <LocalizationProvider dateAdapter={AdapterDateFns} >
              <DateTimePicker
                ampm={false}
                label="Start time"
                value={useSelector((state) => state.selectedLog.startTime)}
                onChange={(data) => dispatch(setStartTime(data.toString()))}
                renderInput={(params) => <TextField {...params} />}
              />
              <DateTimePicker
                ampm={false}
                label="Stop time"
                value={useSelector((state) => state.selectedLog.stopTime)}
                onChange={(data) => dispatch(setStopTime(data.toString()))}
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
          </div>

          <List className='log-modal-tickets'>
            {ticketItems}
          </List>
        </Box>
      </Modal>
    </div>
  );
}