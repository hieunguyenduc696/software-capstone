import { RootPaths } from "constant";
import { TRoute } from "types/common";
import ReadingPart from "./reading_part";
import TestResult from "./result";
import { UserTests } from "./Tests";
import ROLE from "constant/role";

export const ReadingPath: TRoute[] = [
	{
		path: RootPaths.DO_READING_PART,
		component: ReadingPart,
		children: [],
		secured: true,
		accessibleRoles: [ROLE.USER],
	},
	{
		path: RootPaths.TEST_RESULT,
		component: TestResult,
		children: [],
		secured: true,
		accessibleRoles: [ROLE.USER],
	},
	{
		path: RootPaths.USER_TESTS,
		component: UserTests,
		children: [],
	},
];
