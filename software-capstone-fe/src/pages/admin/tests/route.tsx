

import { TRoute } from "types/common";
import { RootPaths } from "constant";
import { Tests } from "./index";
import { NewTest } from "./new";
import NewReadingPart from "./new/reading_part";
import EditReadingPart from "./detail/reading_part_detail";

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

export const EditReadingPath: TRoute[] = [
    {
        path: RootPaths.EDIT_READING_PART,
        component: EditReadingPart,
        children: [],
    }
]

