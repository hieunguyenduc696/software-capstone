import { Dashboard } from "./Dashboard";
import { TRoute } from "types";
import { RootPaths } from "constant";
import Home from "pages/user/home";

export const DashboardRoutes: TRoute[] = [
  {
    path: RootPaths.DASHBOARD,
    // component: Dashboard,
    component: Home,
    children: [],
  },
];
