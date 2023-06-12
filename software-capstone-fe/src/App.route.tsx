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
import { TestLibraryPath, NewTestPath, NewReadingPath, EditReadingPath } from "pages/admin/tests/route";
import EditReadingPart from "pages/admin/tests/detail/reading_part_detail";

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
    ...EditReadingPath
  ],
};

export const routes: TRoute[] = [SignInRoutes, MainLayoutRoutes];

export const flattenRoutes = flatten(routes);

const renderRoute = (routes: TRoute[]): React.ReactNode[] =>
  routes.map(({ redirectTo, children, component: Component, path }) => {
    const CustomComponent = withCustomErrorBoundary(
      path !== "*" ? /*withAuthorization(Component)*/ Component : Component
    );
    if (children && children.length > 0) {
      return (
        <Route key={path} path={path} element={<CustomComponent />}>
          {redirectTo && (
            <Route index element={<CustomNavigate to={redirectTo} replace />} />
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
  });

export const AppRoutes = () => {
  return <Routes>{renderRoute(routes)}</Routes>;
};
