require('dotenv').config({path: "../.env"});
import { LogService } from "./LogService";
import { LogResource } from "./LogResource"; 

const PORT = 8080;

console.log(process.env)
console.log("Staring service at port " + PORT);

LogService.Service
  .with(LogResource)
  .atPort(PORT)
  .start();
