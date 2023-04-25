import {ReadingTestDto} from "../datatypes/test";
import {
    createReadingTests as saveReadingTests,
}  from "../daos/test_daos";

async function createReadingTests(readingTestDtos: ReadingTestDto[]): Promise<number[]> {
    const insertionIds: number[] = await saveReadingTests(readingTestDtos);
    return insertionIds;
}

export {
    createReadingTests,
}