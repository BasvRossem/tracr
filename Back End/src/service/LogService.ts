import express from "express";
import cors from "cors";
import { Service, HealthResource } from "@thisisagile/easy";
import { ExpressProvider, error, notFound } from "@thisisagile/easy-express";
import { errorHandler, notFoundHandler } from "./Handlers";

export class LogService extends Service {
  static readonly Service = new LogService("Tracr", new ExpressProvider());

  pre = () => [
    cors({ origin: true, preflightContinue: false, methods: 'GET,HEAD,PUT,PATCH,POST,DELETE' }),
    express.urlencoded({ extended: true }), 
    express.raw(), 
    express.json()
  ];
  post = () => [errorHandler, notFoundHandler, error, notFound];

  start(): void {
    this.with(HealthResource);
    super.start();
  }
}