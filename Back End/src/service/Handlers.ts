import express from "express";
import { Exception, toOriginatedError } from "@thisisagile/easy";
import { error } from "@thisisagile/easy-express";

export const notFoundHandler = (
  req: express.Request, 
  res: express.Response, 
  next: express.NextFunction): void => 
{
  next(toOriginatedError(Exception.DoesNotExist.because(`no endpoint for ${req.originalUrl}`)));
};

export const errorHandler = (
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction): void => 
{
  error(err, req, res, next);
  console.error(res.statusCode?.toString(), err);
};