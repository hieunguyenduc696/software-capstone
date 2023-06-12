import { RootPaths } from "constant";
import { TRoute } from "types/common";
import ReadingPart from "./reading_part";
import TestResult from "./result";
import { UserTests } from "./Tests";

export const ReadingPath: TRoute[] = [
    {
        path: RootPaths.DO_READING_PART,
        component: ReadingPart,
        children: [],
    },
    {
        path: RootPaths.TEST_RESULT,
        component: TestResult,
        children: []
    },
    {
        path: RootPaths.USER_TESTS,
        component: UserTests,
        children: []
    }
]
