import {ReadingTestDto} from "../datatypes/test";
import {
    createReadingTests as saveReadingTests,
    pagingReadingTests as pageReadingTests,
    countPagingReadingTests,
}  from "../daos/test_daos";

import {
    DEFAULT_PAGING_INDEX,
    DEFAULT_PAGING_LIMIT,
} from '../../../app/constants/common_constants';

async function createReadingTests(readingTestDtos: ReadingTestDto[]): Promise<number[]> {
    const insertionIds: number[] = await saveReadingTests(readingTestDtos);
    return insertionIds;
}

async function pagingReadingTests(limit: number, pageIndex: number, options: null | {keyword?: string} = null): Promise<any> {


    //Validate input
    limit = (limit >= 0) ? limit :  DEFAULT_PAGING_LIMIT;
    pageIndex = (pageIndex >= 1) ? pageIndex : DEFAULT_PAGING_INDEX;

    //Convert the page offset in 1-indexing => record offset in database, in 0-indexing;
    const offset: number = (pageIndex - 1) * limit;

    const pagingParams = {
        limit,
        offset,
        keyword: options?.keyword
    }

    //Executing query

    let total: number = 0;
    let count: number = 0;
    let tests: any[] = [];

    try {
        const queryResult: any[] = await Promise.all([
            countPagingReadingTests(),
            pageReadingTests(pagingParams),
        ]);    

        total = Number(queryResult[0]);
        tests = queryResult[1];
        count = tests.length;

    } catch (errors) {
        console.log(errors);
    }

    
    //Building the result
    const result = {
        total,
        count,
        tests,
    };

    return result;
}

export {
    createReadingTests,
    pagingReadingTests,
}