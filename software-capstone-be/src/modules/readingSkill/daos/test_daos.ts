import { PoolConnection } from "mariadb";
import {
    queryExecutionWrapper,

    //CRUD base closure
    getCreateMethodQueryClosure,
    getFindByKeyMethodQueryClosure,
    getUpdateMethodQueryClosure,
    getDeleteByKeyMethodQueryClosure,
    getPagingMethodQueryClosure,
    getCountingMethodQueryClosure,
} from "../../../app/helpers/query_helper";

import { ReadingTestDto, ReadingSectionDto } from "../datatypes/test";
import { 
    createReadingSectionsProcess,
    getReadingSectionsProcess,
} from "./section_daos";

const tableName = "test";

//Query closure, without transaction (for later use)
const getTestByIdsClosure = getFindByKeyMethodQueryClosure(
    tableName, ['test_id', 'title', 'test_type', 'test_level'], 'test_id'
);
const createTestsClosure = getCreateMethodQueryClosure(
    tableName, ['title', 'test_type', 'test_level']
);
const updateTestClosure = getUpdateMethodQueryClosure(tableName);
const deleteTestsClosure = getDeleteByKeyMethodQueryClosure(tableName, "test_id");
const pagingReadingTestsProcess = getPagingMethodQueryClosure(tableName, ['test_id', 'title', 'test_type', 'test_level']);
const countPagingReadingTestsProcess = getCountingMethodQueryClosure(tableName);

const createReadingTestsProcess = async (dtos: ReadingTestDto[], connection: PoolConnection): Promise<number[]> => {

    const sectionDtos: ReadingTestDto[] = dtos.map(dto => ({
        title: dto.title,
        test_type: dto.test_type,
        test_level: dto.test_level,
    }));

    const sectionParams = {
        createDtos: sectionDtos,
    }

    const readingTestIds = await createTestsClosure(sectionParams, connection);
    readingTestIds.forEach((readingTestId, readingTestIndex) => {
        dtos[readingTestIndex].test_id = readingTestId;
        dtos[readingTestIndex].sections?.forEach((_, sectionIndex) => {
            dtos[readingTestIndex].sections![sectionIndex].test_id = readingTestId;
        })
    });

    const readingSectionDtos: ReadingSectionDto[] = dtos.flatMap(readingTestDto => readingTestDto.sections ?? []);
    const readingSectionIds = await createReadingSectionsProcess(readingSectionDtos, connection);

    return readingTestIds;
}

const getTestByIdProcess = async(testIds: number[], connection: PoolConnection): Promise<any> => {

    let foundTests: any[] = [];

    try {
        foundTests = await getTestByIdsClosure({keyValue: testIds}, connection);
    } catch (error) {
        throw(error);
    }
    
    if (foundTests) {
        const testIds: number[] = foundTests.map(test => test.test_id);

        try {
            const readingSections: any[] = await getReadingSectionsProcess(testIds, connection);

            //Building the section with mapping: test's id => [test's section]
            const readingSectionMap = new Map();
            readingSections.forEach(section => {
                const testId: number = section.test_id;
                if (!readingSectionMap.has(testId)) {
                    readingSectionMap.set(testId, []);
                }

                readingSectionMap.get(testId).push(section);

            });        

            //Map the section value to the final result
            for (const foundTest of foundTests) {
                const testId = foundTest.test_id;
                if (!readingSectionMap.has(testId)) {
                    foundTest.sections = [];
                } else {
                    foundTest.sections = readingSectionMap.get(testId);
                }
            }

        } catch (error) {
            throw error;
        }

    }

    return foundTests;
}

//Wrap the query closure with/without transaction
const getTestByIds = queryExecutionWrapper(getTestByIdProcess, false);
const createReadingTests = queryExecutionWrapper(createReadingTestsProcess, true);
const updateTest = queryExecutionWrapper(updateTestClosure, true);
const deleteTests = queryExecutionWrapper(deleteTestsClosure, true);
const pagingReadingTests = queryExecutionWrapper(pagingReadingTestsProcess, false);
const countPagingReadingTests = queryExecutionWrapper(countPagingReadingTestsProcess, false);


export {
    getTestByIds,
    createReadingTests,
    updateTest,
    deleteTests,
    pagingReadingTests,
    countPagingReadingTests,
}