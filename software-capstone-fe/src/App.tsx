import React, { Suspense } from "react";
import { AppRoutes } from "./App.route";
import { AuthProvider } from "hooks/useAuth";
import { SuspenseRouter } from "HOC";

const App: React.FC = () => {
  return (
    <Suspense>
      <SuspenseRouter>
        <AuthProvider>{AppRoutes()}</AuthProvider>
      </SuspenseRouter>
    </Suspense>
  );
};

export default App;
