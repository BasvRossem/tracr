import { Database, Exception, Json, isDefined } from "@thisisagile/easy";
import { MongoGateway, MongoProvider, Collection } from "@thisisagile/easy-mongo";

const options = {
  cluster: process.env.MONGO_CLUSTER,
  user: process.env.MONGO_USERNAME,
  password: process.env.MONGO_PASSWORD,
};

class LogProvider extends MongoProvider {
  update(item: Json): Promise<Json> {
    return this.collection()
      .then(c => c.updateOne({ date: item.date }, { $set: item }))
      .then(() => this.by("date", item.date))
      .then(day => day[0] ?? Promise.reject(Exception.DoesNotExist));
  }
}

class LogDatabase extends Database {
  static readonly Mongo = new LogDatabase("Tracr", LogProvider, options);
}

class DayCollection extends Collection {
  get db(): Database {
    return LogDatabase.Mongo;
  } 
  
  readonly date = this.map.field("date");
  readonly logs = this.map.field("logs");

  toString() {
    return "DayTest";
  }
}

export class DayGateway extends MongoGateway {
  constructor(coll: DayCollection = new DayCollection()) {
    super(coll, new LogProvider(coll));
  }
}
