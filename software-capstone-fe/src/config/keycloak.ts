import Keycloak from "keycloak-js";
import { appConfig } from "config";

export const keycloakClient = new Keycloak({
  url: `${appConfig.REACT_APP_KEYCLOAK_URL}`,
  realm: appConfig.REACT_APP_KEYCLOAK_REALM,
  clientId: appConfig.REACT_APP_KEYCLOAK_CLIENT_ID,
});
