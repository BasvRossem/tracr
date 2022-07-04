import { LogCollection, LogDatabase, LogGateway } from '../src/Data';

describe("LogCollection", () => {
  let collection: LogCollection;
  
  beforeEach(() => {
    collection = new LogCollection();
  });
  
  test("db returns the mongo log database", () => {
    expect(collection.db).toBe(LogDatabase.Mongo);
  });

  test("toString returns the name of the collection", () => {
    expect(collection.toString()).toBe("Logs");
  });
});

describe("LogGateway", () => {
  test("gateway constrcuts with correct default collection", () => {
    const gateway = new LogGateway();
    expect(gateway.collection).toBeInstanceOf(LogCollection);
  });
});