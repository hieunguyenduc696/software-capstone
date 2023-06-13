import React, { Suspense } from "react";
import { AppRoutes } from "./App.route";
import { AuthProvider } from "hooks/useAuth";
import { SuspenseRouter } from "HOC";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import { keycloakClient } from "config/keycloak";
import keycloak from "Keycloak";
import "./App.css";
// import AddingTestPage from "pages/Create/AddTest";

const App: React.FC = () => {
  console.log(window.location.origin + "/silent-check-sso.html");
  return (
    <ReactKeycloakProvider authClient={keycloak}>
      <Suspense>
        <SuspenseRouter>
          <AuthProvider>{AppRoutes()}</AuthProvider>
        </SuspenseRouter>
      </Suspense>
    </ReactKeycloakProvider>
  );
  // return (<AddingTestPage/>);
};

export default App;
