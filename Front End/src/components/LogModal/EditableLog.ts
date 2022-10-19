import * as React from "react";

type ReactUseState = [any, React.Dispatch<any>];
export function createEditableLog(title: ReactUseState, startTime: ReactUseState, stopTime: ReactUseState,  notes: ReactUseState) {
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