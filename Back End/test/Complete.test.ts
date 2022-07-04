import { Log, LogRepository } from "../src/Domain";
import { LogCollection, LogGateway } from "../src/Data";
import { LogResource } from '../src/LogResource';
import { Req, Json, List, asJson } from '@thisisagile/easy';
import { mock } from "@thisisagile/easy-test";
import data from "./data.json";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";

describe("Front to back test", () => {
  let collection: LogCollection;
  let gateway: LogGateway;
  let repos: LogRepository;
  let resource: LogResource;

  function mockData(date: string): List<Json> {
    return new List<Json>(...data.filter(d => d.date == date));
  }

  beforeEach(() => {
    collection = mock.empty();
    gateway = new LogGateway(collection);
    repos = new LogRepository(gateway);
    resource = new LogResource(repos);
  });

  test("Read of specific day makes request for specific day and returns them", async () => {
    const date = "2022-03-03";
    const req: Req = mock.req.query({date});
    gateway.by = mock.resolve(mockData(date));
    const expected = mockData(date).map(json => new Log(json));
    await expect(resource.getByDate(req)).resolves.toMatchObject(expected.toJSON());
    expect(gateway.by).toHaveBeenCalledWith("date", date);
  });

  test("Create adds a new log to the collection", async () => {
    const req: Req = mock.req.body(data[0]);
    const log = new Log(data[0]);
    gateway.add = mock.resolve(log);
    await expect(resource.add(req)).resolves.toMatchObject(log.toJSON());
    expect(gateway.add).toHaveBeenCalledWith(data[0]);
  });

  test("Update changes an already existing log", async () => {
    gateway.byId = mock.resolve(data[0]);
    gateway.update = mock.impl((input: Json) => Promise.resolve(input)); 
    const change = {id: data[0].id, title: "something new"};
    const req = mock.req.body(change);
    await expect(resource.update(req)).resolves.toMatchObject({...data[0], title: "something new"});
    expect(gateway.byId).toHaveBeenCalledWith(data[0].id);
    expect(gateway.update).toHaveBeenCalledWith({...data[0], title: "something new"});
  });
  
});

