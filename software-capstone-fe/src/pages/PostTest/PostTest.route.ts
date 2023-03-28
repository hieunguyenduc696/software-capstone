import { PostTest } from "./PostTest";
import { TRoute } from "types";
import { RootPaths } from "constant";

export const PostTestRoutes: TRoute[] = [
    {
        path: RootPaths.POST_TEST,
        component: PostTest,
        children: [],
    },
];
