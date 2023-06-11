"use strict";

import express, { Express } from "express";
import { APP_PORT } from "./app/constants/config_constants";
import * as readingRoutes from "./modules/readingSkill/routes/route";
import cors from "cors";

const app: Express = express();
const port: string | undefined = APP_PORT; //default port is 8088
const myCors = (arrayOfOrigin?: Array<String>) => {
  return cors();
};

app.use(myCors());
//Middlewares registrations
app.use(express.json());
app.use(cors());

//Routes registrations
app.use("/reading-skill/admin/test", readingRoutes.adminTest.router);
app.use("/reading-skill/resource", readingRoutes.cdnRoute.router);

app.listen(port, () => {
  console.log(`[Server]: Server is serving at port: ${port}`);
});
