import * as React from 'react';
import { useDispatch } from 'react-redux';
import { addLog } from './../../data/logSlice';
import { LogModalBase } from "./LogModal";
import store from '../../data/store';
import { createEditableLog } from './EditableLog';

export function CreateLogModal(props) {
  const dispatch = useDispatch();
  const selectedDay = new Date(store.getState().currentDate.value);

  const startTime = new Date(props.lastLog?.stopTime ?? selectedDay.setHours(8, 0, 0, 0))
  const selectedLog = createEditableLog(
    React.useState(""),
    React.useState(startTime),
    React.useState(new Date(new Date(startTime).setHours(startTime.getHours() + 1))),
    React.useState("")
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
  console.log("rerender Base", selectedLog)
  return (
    <LogModalBase
      open={props.open}
      setIsOpen={props.setIsOpen}
      selectedLog={selectedLog}
      button={createButton}
    />
  );
}