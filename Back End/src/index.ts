require('dotenv').config({path: "../.env"});
import { LogService } from "./service/LogService";
import { LogResource } from "./service/LogResource"; 

const PORT = 8080;

console.log(process.env)
console.log("Staring service at port 8001");

LogService.Service
  .with(LogResource)
  .atPort(PORT)
  .start();
