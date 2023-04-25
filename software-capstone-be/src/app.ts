"use strict"

import express, {Express} from 'express';
import { APP_PORT } from './app/constants/config_constants';
import * as readingRoutes from './modules/readingSkill/routes/route';

const app: Express = express();
const port: string | undefined = APP_PORT;    //default port is 8088

//Middlewares registrations
app.use(express.json()); 

//Routes registrations
app.use('/reading-skill/admin/test', readingRoutes.adminTest.router);
app.use('/reading-skill/resource', readingRoutes.cdnRoute.router);

app.listen(port, () => {
    console.log(`[Server]: Server is serving at port: ${port}`);
})