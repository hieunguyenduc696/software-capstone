import { Dashboard } from "./Dashboard";
import { TRoute } from "types";
import { RootPaths } from "constant";

export const DashboardRoutes: TRoute[] = [
  {
    path: RootPaths.DASHBOARD,
    component: Dashboard,
    children: [],
  },
];
