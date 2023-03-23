import { EasyUri, post, Req, Resource, route, uri, get, del, patch, asJson } from "@thisisagile/easy";
import { correctToken } from "./ResourceHelpers";
import { LogRepository } from "./Domain";

class MyUri extends EasyUri {
  private static readonly logs = uri.segment('logs');

  static readonly Logs = new MyUri([MyUri.logs]);
}

@route(MyUri.Logs)
export class LogResource implements Resource {
  constructor(private logs: LogRepository = new LogRepository()) {}
 
  @post() @correctToken()
  upsert = async (req: Req): Promise<any> => {
    return this.logs.upsertDay(asJson(req.body as any));
  };

  @get() @correctToken()
  getByDate = async (req: Req): Promise<any> => {
    return this.logs.byDate(req.get("date"));
  };
}