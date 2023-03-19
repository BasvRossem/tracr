import { Log } from "../types";

export function syncNotes(title, notes: string, allLogs: Log[]): Log[] {
  const newLogs: Log[] = [];

  allLogs.forEach(log => {
    const newLog = {...log};

    if(newLog.title.toLowerCase() === title.toLowerCase()) {
      newLog.notes = notes;
    }
    newLogs.push(newLog);
  });


  return newLogs;
}