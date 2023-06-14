import React from "react";
import { DashboardRoutes, NotFoundRoutes, SignInRoutes } from "pages";
import { CustomNavigate } from "components";
import { MainLayout } from "./layout";
import { Route, Routes } from "react-router";
import { TRoute } from "types";
import { withAuthorization, withCustomErrorBoundary } from "HOC";
import { flatten } from "utils";
// import { PostTestRoutes } from "pages/PostTest";
// import { AddTestRoutes } from "pages/Create";
// import { TestRoutes } from "pages/Test";
import {
  TestLibraryPath,
  NewTestPath,
  NewReadingPath,
  EditReadingPath,
} from "pages/admin/tests/route";
import EditReadingPart from "pages/admin/tests/detail/reading_part_detail";
import type { KeycloakInstance, KeycloakTokenParsed } from "keycloak-js";

import { Navigate, useLocation } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import { Typography } from "antd";
import ROLE from "constant/role";

export const MainLayoutRoutes: TRoute = {
  component: MainLayout,
  path: "/",
  page: "accessible",
  children: [
    ...NotFoundRoutes,
    ...DashboardRoutes,
    ...TestLibraryPath,
    ...NewTestPath,
    ...NewReadingPath,
    ...EditReadingPath,
  ],
};

type ParsedToken = KeycloakTokenParsed & {
  email?: string;

  preferred_username?: string;

  given_name?: string;

  family_name?: string;
};

const PrivateRoute = ({
  children,
  roles,
}: {
  children: JSX.Element;
  roles: Array<string>;
}) => {
  let location = useLocation();
  // const { isAuthenticated, user, loading } = useSelector(state => state.auth);
  const { keycloak, initialized } = useKeycloak();
  const parsedToken: ParsedToken | undefined = keycloak?.tokenParsed;

  let role = "";

  if (keycloak.authenticated) {
    role =
    parsedToken?.realm_access?.roles?.includes("USER") === true
      ? "USER"
      : "ADMINISTRATOR";
  } else {
    return <Navigate to="*" state={{ from: location }} />;
  }

  const userHasRequiredRole = roles.includes(role) ? true : false;


  if (keycloak.authenticated && !userHasRequiredRole) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center"
        }}
      >
        <Typography.Title style={{color: "var(--mainColor)", fontWeight: "bold"}}>Error: 401 - Unauthorized</Typography.Title>
        <Typography.Text style={{fontWeight: "bold"}}>You are not authorized to access this page.</Typography.Text>
      </div>
    );
  }

  return children;
};

export const routes: TRoute[] = [SignInRoutes, MainLayoutRoutes];

export const flattenRoutes = flatten(routes);

const renderRoute = (routes: TRoute[]): React.ReactNode[] =>
  routes.map(
    ({ redirectTo, secured, children, component: Component, path, accessibleRoles }) => {
      const CustomComponent = withCustomErrorBoundary(
        path !== "*" ? /*withAuthorization(Component)*/ Component : Component
      );

      if (secured && secured === true && accessibleRoles) {
        return (
          <Route
            key={path}
            path={path}
            element={
              <PrivateRoute roles={accessibleRoles}>
                <CustomComponent />
              </PrivateRoute>
            }
          ></Route>
        );
      }

      if (children && children.length > 0) {
        return (
          <Route key={path} path={path} element={<CustomComponent />}>
            {redirectTo && (
              <Route
                index
                element={<CustomNavigate to={redirectTo} replace />}
              />
            )}
            {renderRoute(children)}
          </Route>
        );
      }

      return (
        <Route
          key={path}
          path={path}
          element={
            redirectTo ? (
              <CustomNavigate to={redirectTo} replace />
            ) : (
              <CustomComponent />
            )
          }
        />
      );
    }
  );

export const AppRoutes = () => {
  return <Routes>{renderRoute(routes)}</Routes>;
};
