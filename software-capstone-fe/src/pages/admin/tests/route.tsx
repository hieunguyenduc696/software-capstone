

import { TRoute } from "types/common";
import { RootPaths } from "constant";
import { Tests } from "./index";
import { NewTest } from "./new";
import NewReadingPart from "./new/reading_part";
import EditReadingPart from "./detail/reading_part_detail";
import ROLE from "constant/role";

export const TestLibraryPath: TRoute[] = [
    {
        path: RootPaths.TEST_LIBRARY,
        component: Tests,
        children: [],
        secured: false,
        accessibleRoles: [ROLE.ADMIN],
    },
];

export const NewTestPath: TRoute[] = [
    {
        path: RootPaths.NEW_TEST,
        component: NewTest,
        children: [],

        secured: true,
        accessibleRoles: [ROLE.ADMIN],

    },
]

export const NewReadingPath: TRoute[] = [
    {
        path: RootPaths.NEW_READING_PART,
        component: NewReadingPart,
        children: [],
        secured: true,
        accessibleRoles: [ROLE.ADMIN],
    },
]

export const EditReadingPath: TRoute[] = [
    {
        path: RootPaths.EDIT_READING_PART,
        component: EditReadingPart,
        children: [],
        secured: true,
        accessibleRoles: [ROLE.ADMIN],
    }
]

