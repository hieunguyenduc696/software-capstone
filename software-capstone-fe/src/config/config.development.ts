import { IEnvironment } from "types/common/env";

const config: IEnvironment = {
  APP_ENV: process.env.APP_ENV || "development",
  API_URL: process.env.API_URL || "",
  IMAGE_URL: process.env.IMAGE_URL || "",
  JWT_KEY_NAME: process.env.JWT_KEY_NAME || "UM_TOKEN_JWT",
  REALM_NAME: process.env.REALM_NAME || "",
  LIMIT_TABLE_SIZE: process.env.LIMIT_TABLE_SIZE
    ? Number(process.env.LIMIT_TABLE_SIZE)
    : 10,
  REACT_APP_KEYCLOAK_URL: process.env.REACT_APP_KEYCLOAK_URL || "",
  REACT_APP_KEYCLOAK_REALM: process.env.REACT_APP_KEYCLOAK_REALM || "",
  REACT_APP_KEYCLOAK_CLIENT_ID: process.env.REACT_APP_KEYCLOAK_CLIENT_ID || "",
};

export default config;
