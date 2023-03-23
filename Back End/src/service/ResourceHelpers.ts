import { RequestHandler } from "express";
import { authError } from "@thisisagile/easy-express";
import { HttpStatus, meta } from "@thisisagile/easy";

const checkToken = (): RequestHandler => {
  return (req, _, next) => {
    // if (!req.headers.authorization || !(req.headers.authorization == process.env.ACCESS_TOKEN))
    //   throw authError(HttpStatus.Forbidden);
    next();
  };
};

export const correctToken = (): PropertyDecorator => {
  return (subject: unknown, property: string | symbol): void => {
    const middleware = meta(subject).property(property).get<RequestHandler[]>("middleware") ?? [];
    middleware.push(checkToken());
    meta(subject).property(property).set("middleware", middleware);
  };
};
