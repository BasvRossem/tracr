import moment from 'moment';
import TextField from '@mui/material/TextField';
import TimePicker from '@mui/lab/TimePicker';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TicketList } from './TicketList';
import './LogModal.css';
import { EditableLog } from './EditableLog';
import store from '../../data/store';
import { Log } from '../../types';

interface LogModalProps {
  open: boolean;
  onClose?: () => void;
  selectedLog: EditableLog;
  setIsOpen: (val: boolean) => void;
  button: {
    onClick: (newLog: any) => void;
    label: string;
  }
}

function MinuteAdder({ log }) {
  const calculateTimeFromNumber = (amount: number) => {
    const newTime = isNaN(amount)
      ? moment(log.startTime).add(1, "hours")
      : moment(log.startTime).add(amount, "minutes");

    log.setStopTime(newTime.toDate());
  }

  return (
    <TextField
      label="Minutes"
      type="number"
      onChange={(data) => calculateTimeFromNumber(parseInt(data.target.value))}
    />
  )
}

export function LogModalBase(props: LogModalProps) {
  const handleClose = () => {
    props.setIsOpen(false)
    if (props.onClose) props.onClose();
  }

  const setStopTime = (endTime: Date) => {
    const newStopTime = moment(props.selectedLog.startTime)
      .set("hour", endTime.getHours())
      .set("minute", endTime.getMinutes())
      .toDate();
    props.selectedLog.setStopTime(newStopTime);
  }

  const setNotes = (logTitle: string) => {
    const sameLog: Log | undefined = store.getState().logger.value.filter((log: Log) => log.title.toLowerCase() === logTitle.toLowerCase())[0];
    if (sameLog) {
      const newNotes = sameLog.notes + "\n" + props.selectedLog.notes;
      console.log(newNotes);
      props.selectedLog.setNotes(newNotes);
    }
  }

  return (
    <div>
      <Modal
        onClick={event => event.stopPropagation()}
        onMouseDown={event => event.stopPropagation()}
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="log-modal">
          <TicketList
            value={props.selectedLog.title}
            onChange={(newTitle: string) => {
              props.selectedLog.setTitle(newTitle);
              setNotes(newTitle);
            }}
          />
          <div className="log-modal-times">
            <MinuteAdder log={props.selectedLog} />
            <LocalizationProvider dateAdapter={AdapterDateFns} >
              <TimePicker
                ampm={false}
                label="Start time"
                value={props.selectedLog.startTime}
                onChange={(data) => props.selectedLog.setStartTime(data)}
                renderInput={(params) => <TextField {...params} />}
              />
              <TimePicker
                ampm={false}
                label="Stop time"
                value={props.selectedLog.stopTime}
                onChange={(data) => setStopTime(data)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>

          <TextField
            id="outlined-multiline-static"
            label="Notes"
            value={props.selectedLog.notes}
            multiline
            rows={4}
            onChange={(data) => props.selectedLog.setNotes(data.target.value)}
            className="log-modal-notes"
          />
          <div>
            <Button variant="contained" className="log-modal-button" onClick={props.button.onClick}>{props.button.label}</Button>
            <Button variant="outlined" className="log-modal-button log-modal-button-cancel" onClick={handleClose}>Cancel</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}