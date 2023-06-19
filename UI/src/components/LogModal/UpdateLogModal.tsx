import  * as React from 'react';
import { useDispatch } from 'react-redux';
import { updateDay } from '../../data/daySlice';
import { LogModalBase } from './LogModal';
import { createEditableLog } from './EditableLog';
import { Log } from '../../types';
import { storage } from '../../data/Storage';

interface UpdateLogModalProps { 
  log: Log; 
  setIsOpen: (val: boolean) => void; 
  open: boolean; 
}

export function UpdateLogModal(props: UpdateLogModalProps) {
  const dispatch = useDispatch();

  const selectedLog = createEditableLog(
    React.useState(props.log.title),
    React.useState(new Date(props.log.startTime)),
    React.useState(new Date(props.log.stopTime)),
    React.useState(props.log.notes)
  );

  const handleUpdateLog = () => {
    const data = {
      id: props.log.id,
      title: selectedLog.title,
      notes: selectedLog.notes,
      startTime: selectedLog.startTime.toISOString(),
      stopTime: selectedLog.stopTime.toISOString(),
      date: new Date(selectedLog.startTime).toISOString().split("T")[0],
    };

    console.log(data);

    const newState = storage.day
      .updateLog(data)
      .syncNotes(data.title, data.notes);
    dispatch(updateDay(newState));
    props.setIsOpen(false);
  }

  const button = {label: "Update", onClick: handleUpdateLog};
  return (
    <LogModalBase
      open={props.open}
      setIsOpen={props.setIsOpen}
      button={button}
      selectedLog={selectedLog}
    />
  );
}