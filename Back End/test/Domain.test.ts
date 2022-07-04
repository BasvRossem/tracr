import { LogGateway } from "../src/Data";
import { Log, LogRepository } from "../src/Domain";
import data from "./data.json";

describe("Log", () => {
  test("creation of en empty logs automatically gets new id", () => {
    const log = new Log();
    expect(log.id).not.toBeUndefined();
  });

  test("creation reads data from state", () => {
    const log = new Log(data[0]);
    expect(log.id).toBe(data[0].id);
    expect(log.date).toBe(data[0].date);
    expect(log.startTime).toBe(data[0].startTime);
    expect(log.stopTime).toBe(data[0].stopTime);
    expect(log.title).toBe(data[0].title);
    expect(log.notes).toBe(data[0].notes);
  });

  const updateCases = [
    [ "id", data[1].id],
    [ "title", data[1].title],
    [ "date", data[1].date],
    [ "startTime", data[1].startTime],
    [ "stopTime", data[1].stopTime],
    [ "notes", data[1].notes]
  ];
  test.each(updateCases)("update updates the specified fields", (key, value) => {
    const log = new Log(data[0]);
    const updateWith = {};
    (updateWith as any)[key] = value;
    const updated = log.update(updateWith);
    expect(updated[key as keyof Log]).toBe(value);
  });
});

describe("LogRepository", () => {
  test("repository constrcuts with correct default gateway", () => {
    const repos = new LogRepository();
    expect((repos as any).gateway).toBeInstanceOf(LogGateway);
  });
});