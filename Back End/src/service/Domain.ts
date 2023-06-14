import { Exception, Json, List, toList } from "@thisisagile/easy";
import { DayGateway } from "./Data";

export class LogRepository {
  constructor(protected gateway: DayGateway = new DayGateway()) {}

  byDate(value: string): Promise<List<Json>> {
    return this.gateway
      .by("date", value)
      .then(days => days.length === 0 ? toList({date: value, logs: []}) : days)
      .then(days => days.map((day) => this.syncDateAndId(day)));
  }

  upsertDay(day: Json): Promise<Json> {
    return Promise.resolve(day)
      .then((d) => this.syncDateAndId(d))
      .then((d) => this.gateway.update(d))
      .catch(e => (Exception.DoesNotExist.equals(e) ? this.gateway.add(day) : Promise.reject(e)));
  }

  protected syncDateAndId(value: Json): Json {
    value.id = value.date;
    return value;
  }
}
