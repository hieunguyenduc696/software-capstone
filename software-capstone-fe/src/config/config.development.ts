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
  KEYCLOAK_URL: process.env.KEYCLOAK_URL || "",
  KEYCLOAK_REALM: process.env.KEYCLOAK_REALM || "",
  KEYCLOAK_CLIENT_ID: process.env.KEYCLOAK_CLIENT_ID || "",
};

export default config;
