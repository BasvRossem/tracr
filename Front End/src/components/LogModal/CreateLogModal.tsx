import * as React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { addLog } from './../../data/logSlice';
import { LogModalBase } from "./LogModal";
import store from '../../data/store';
import { createEditableLog } from './EditableLog';
import { Log } from '../../types';

interface CreateLogModalProps { 
  log: Log | undefined; 
  setIsOpen: (val: boolean) => void;
  open: boolean; 
}

export function CreateLogModal(props: CreateLogModalProps) {
  const dispatch = useDispatch();
  const selectedDay = new Date(store.getState().currentDate.value);

  const startTime = new Date(props.log?.startTime ?? selectedDay.setHours(8, 0, 0, 0));
  const stopTime = new Date(props.log?.stopTime ?? moment(startTime).add(1, "hours").toDate());
  const selectedLog = createEditableLog(
    React.useState(props.log?.title ?? ""),
    React.useState(startTime),
    React.useState(stopTime),
    React.useState(props.log?.notes ?? "")
  );

  const handleCreateLog = () => {
    const data = {
      ...JSON.parse(JSON.stringify(selectedLog)),
      date: new Date(selectedLog.startTime).toISOString().split("T")[0],
    };

    dispatch(addLog(JSON.stringify(data)));

    props.setIsOpen(false);
  }

  const createButton = { label: "Create", onClick: handleCreateLog }
  return (
    <LogModalBase
      open={props.open}
      setIsOpen={props.setIsOpen}
      selectedLog={selectedLog}
      button={createButton}
    />
  );
}