import * as React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { addLog } from './../../data/logSlice';
import { LogModalBase } from "./LogModal";
import store from '../../data/store';
import { createEditableLog } from './EditableLog';

export function CreateLogModal(props) {
  const dispatch = useDispatch();
  const selectedDay = new Date(store.getState().currentDate.value);

  const startTime = new Date(props.lastLog?.startTime ?? selectedDay.setHours(8, 0, 0, 0));
  const stopTime = new Date(props.lastLog?.stopTime ?? moment(startTime).add(1, "hours").toDate());
  const selectedLog = createEditableLog(
    React.useState(props.lastLog?.title ?? ""),
    React.useState(startTime),
    React.useState(stopTime),
    React.useState(props.lastLog?.notes ?? "")
  );

  const handleCreateLog = () => {  
    const data = {
      ...JSON.parse(JSON.stringify(selectedLog)),
      date: new Date(selectedLog.startTime).toISOString().split("T")[0],
    };

    dispatch(addLog(JSON.stringify(data)));

    props.setIsOpen(false);
  }

  const createButton = {label: "Create", onClick: handleCreateLog}
  return (
    <LogModalBase
      open={props.open}
      setIsOpen={props.setIsOpen}
      selectedLog={selectedLog}
      button={createButton}
    />
  );
}