
//".env" file is always place at ./software-capstone-be/
const ENV_DEFAULT_PATH: string = `${__dirname}/../../../.env`; 

import dotenv from 'dotenv';
dotenv.config({
    path: ENV_DEFAULT_PATH,
});

//App configuration
const DEFAULT_APP_PORT: string = "8088";
const DEFAULT_APP_HOST: string = "localhost";
const DEFAULT_RESOURCE_PATH: string = "public/resource";
const APP_PORT: string = process.env.APP_PORT ?? DEFAULT_APP_PORT;
const RESOURCE_PATH: string = process.env.RESOURCE_PATH ?? `${__dirname}/../../../${DEFAULT_RESOURCE_PATH}`;

//DB configuration
const DEFAULT_DB_PORT: string = "3306";
const DEFAULT_DB_CONNECTION_LIMIT: string = "10";
const DB_PORT: number = +(process.env.DB_PORT?? DEFAULT_DB_PORT); 
const DB_HOST: string | undefined = process.env.DB_HOST;
const DB_USER: string | undefined = process.env.DB_USER;
const DB_PASSWORD: string | undefined = process.env.DB_PASSWORD;
const DB_NAME: string | undefined = process.env.DB_NAME;
const DB_CONNECTION_LIMIT: number = +(process.env.DB_CONNECTION_LIMIT?? DEFAULT_DB_CONNECTION_LIMIT);

export {
    APP_PORT,
    RESOURCE_PATH,

    DB_PORT,
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_CONNECTION_LIMIT,
};