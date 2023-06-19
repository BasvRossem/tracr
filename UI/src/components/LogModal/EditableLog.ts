import * as React from "react";

type ReactUseState = [any, React.Dispatch<any>];

export interface EditableLog {
  title: string;
  startTime: Date,
  stopTime: Date,
  notes: string,
  setTitle: React.Dispatch<string>,
  setStartTime: React.Dispatch<Date>,
  setStopTime: React.Dispatch<Date>,
  setNotes: React.Dispatch<string>,
}

export function createEditableLog(title: ReactUseState, startTime: ReactUseState, stopTime: ReactUseState, notes: ReactUseState): EditableLog {
  const [_title, setTitle] = title;
  const [_startTime, setStartTime] = startTime;
  const [_stopTime, setStopTime] = stopTime;
  const [_notes, setNotes] = notes;

  return {
    title: _title,
    startTime: _startTime,
    stopTime: _stopTime,
    notes: _notes,
    setTitle: setTitle,
    setStartTime: setStartTime,
    setStopTime: setStopTime,
    setNotes: setNotes,
  };
}