
//".env" file is always place at ./software-capstone-be/
const ENV_DEFAULT_PATH: string = `${__dirname}/../../../.env`; 

import dotenv from 'dotenv';
dotenv.config({
    path: ENV_DEFAULT_PATH,
});

const DEFAULT_APP_PORT: string = "8088";
const APP_PORT: string = process.env.APP_PORT ?? DEFAULT_APP_PORT;

export {
    APP_PORT,
};