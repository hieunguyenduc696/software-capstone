

import { TRoute } from "types/common";
import { RootPaths } from "constant";
import { Tests } from "./index";
import { NewTest } from "./new";
import NewReadingPart from "./new/reading_part";

export const TestLibraryPath: TRoute[] = [
    {
        path: RootPaths.TEST_LIBRARY,
        component: Tests,
        children: [],
    },
];

export const NewTestPath: TRoute[] = [
    {
        path: RootPaths.NEW_TEST,
        component: NewTest,
        children: [],
    },
]

export const NewReadingPath: TRoute[] = [
    {
        path: RootPaths.NEW_READING_PART,
        component: NewReadingPart,
        children: [],
    },
]