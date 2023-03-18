"use strict"

import express, {Express} from 'express';
import { APP_PORT } from './app/constants/configConstants';

const app: Express = express();
const port: string | undefined = APP_PORT;    //default port is 8088

//Middlewares registrations
app.use(express.json()); 

//Routes registrations

app.listen(port, () => {
    console.log(`[Server]: Server is serving at port: ${port}`);
})