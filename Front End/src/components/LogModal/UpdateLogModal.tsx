import  * as React from 'react';
import { useDispatch } from 'react-redux';
import { updateLog } from './../../data/logSlice';
import { LogModalBase } from './LogModal';
import { createEditableLog } from './EditableLog';
import { Log } from '../../types';

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
    const data = JSON.stringify({
      id:props.log.id,
      ...selectedLog,
      date: new Date(selectedLog.startTime).toISOString().split("T")[0],
    });

    dispatch(updateLog(data));
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