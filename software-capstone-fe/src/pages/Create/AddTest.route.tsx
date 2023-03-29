
import AddTest from "./AddTest";
import { TRoute } from "types";
import { RootPaths } from "constant";

export const AddTestRoutes: TRoute[] = [
    {
        path: RootPaths.ADD_TEST,
        component: AddTest,
        children: [],
    },
];
