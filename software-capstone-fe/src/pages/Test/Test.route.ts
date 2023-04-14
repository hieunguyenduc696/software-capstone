import { Test } from "./Test";
import { TRoute } from "types";
import { RootPaths } from "constant";

export const TestRoutes: TRoute[] = [
    {
        path: RootPaths.TEST,
        component: Test,
        children: [],
    },
];
