import { DateString } from "./alias";

export interface Log {
  id?: string,
  title: string // This is the ticket id
  startTime: DateString,
  stopTime: DateString, 
  notes: string,
}

export interface ILogDay {
  date: DateString; 
  logs: any[];
  lastLog: Log | undefined;

  removeLog: (id: string) => this;
  addLog: (log: Log) => this;
  syncNotes: (title: string, notes: string) => this
  getLogByTitle: (title: string) => Log | undefined;
}

export class LogDay implements ILogDay {
  constructor(public date: DateString, public logs: Log[]) {
  }

  removeLog(id: string): this {
    this.logs = this.logs.filter(log => log.id !== id);
    return this;
  }

  addLog(log: Log): this {
    this.logs.push(log);
    return this;
  }

  get lastLog(): Log | undefined {
    return this.logs[this.logs.length - 1];
  }

  syncNotes(title: string, notes: string): this {
    this.logs.forEach(log => {
      if(log.title.toLowerCase() === title.toLowerCase()) {
        log.notes = notes;
      }
    });
    return this;
  }

  getLogByTitle(title: string): Log | undefined {
    return this.logs.filter(log => log.title.toLowerCase() === title.toLowerCase())[0];
  }
}