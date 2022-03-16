import { Database } from "@thisisagile/easy";
import { MongoGateway, MongoProvider, Collection } from "@thisisagile/easy-mongo";

const options = {
  cluster: process.env.MONGO_CLUSTER,
  user: process.env.MONGO_USERNAME,
  password: process.env.MONGO_PASSWORD,
};

class LogDatabase extends Database {
  static readonly Mongo = new LogDatabase("Tracr", MongoProvider, options);
}

class LogCollection extends Collection {
  get db(): Database {
    return LogDatabase.Mongo;
  } 
  
  readonly date = this.map.field("date");
  readonly startTime = this.map.field("startTime");
  readonly stopTime = this.map.field("stopTime");
  readonly title = this.map.field("title");
  readonly notes = this.map.field("notes");

  toString() {
    return "Logs";
  }
}

export class LogGateway extends MongoGateway {
  constructor(coll: LogCollection = new LogCollection()) {
    super(coll);
  }
}
