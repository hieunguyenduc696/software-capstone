"use strict";

import express, { Express } from "express";
import cors from "cors";
import { APP_PORT } from "./app/constants/config_constants";
import * as readingRoutes from "./modules/readingSkill/routes/route";
// import cors from 'cors';

const app: Express = express();
const port: string | undefined = APP_PORT; //default port is 8088
// const myCors = (arrayOfOrigin?: Array<String>) => {
//   return cors();
// };

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

// app.use(myCors(corsOptions));
//Middlewares registrations
app.use(express.json());

const myCors = (arrayOfOrigin: any) => {
    if (!arrayOfOrigin) {
        return cors();
    }
    return cors({
        origin: arrayOfOrigin || [],
        optionsSuccessStatus: 200,
    });
};
app.use(cors());
app.use(express.json());


//Routes registrations
app.use("/reading-skill/admin/test", readingRoutes.adminTest.router);
app.use("/reading-skill/resource", readingRoutes.cdnRoute.router);

app.listen(port, () => {
  console.log(`[Server]: Server is serving at port: ${port}`);
});
