import { Repo, Struct, Json, Id } from "@thisisagile/easy";
import { v1 } from "uuid";
import { LogGateway } from "./Data";

export interface LogInterface extends Json {
  id: Id;
  documentId: string;
  date: string;
  startTime: string;
  stopTime: string;
  title: string;
  notes: string;
}

export class Log extends Struct {
  id = this.state.id ?? v1();
  documentId = this.state.documentId;
  date = this.state.date;
  startTime = this.state.startTime;
  stopTime = this.state.stopTime;
  title = this.state.title;
  notes = this.state.notes;

  update = (other: Json): Log => {
    this.id = other.id ?? this.id;
    this.documentId = other.documentId ?? this.documentId;
    this.date = other.date ?? this.date;
    this.startTime = other.startTime ?? this.startTime;
    this.stopTime = other.stopTime ?? this.stopTime;
    this.title = other.title ?? this.title;
    this.notes = other.notes ?? this.notes;
    return this;
  };

  toJSON = (): LogInterface => super.toJSON() as LogInterface;
}

export class LogRepository extends Repo<Log> {
  constructor(logs: LogGateway = new LogGateway()) {
    super(Log, logs);
  }
}
