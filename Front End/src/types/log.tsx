import { DateString } from "./alias";

export interface Log {
  id: string,
  title: string // This is the ticket id
  date: DateString, // The date of the log yyyy-mm-dd
  startTime: DateString,
  stopTime: DateString, 
  notes: string,
}