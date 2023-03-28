import { useKeycloak } from "@react-keycloak/web";
import { AppHeader } from "components";

export const Dashboard = () => {
  // const { keycloak } = useKeycloak();

  // const onRedirectKeyCloak = () => {
  //   if (keycloak) {
  //     window.location.href = keycloak.createLoginUrl();
  //   }
  // };

  // console.log(keycloak.authenticated, keycloak.token);
  return (
    <div>
      {/* {!keycloak.authenticated ? (
        <button onClick={onRedirectKeyCloak}>login</button>
      ) : (
        "logged in"
      )} */}
    </div>
  );
};
