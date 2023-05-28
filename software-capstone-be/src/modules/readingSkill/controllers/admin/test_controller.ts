import {Request, Response} from 'express';
import {ParagraphDto} from "../../datatypes/test";
import {
    createParagraphs as saveParagraphs,
    updateParagraph as editParagraph,
    deleteParagraphs as removeParagraphs,
} from '../../services/paragraph_service';

import {
    BACKEND_UNIVERSAL_SUCCESS_CODE,
    BACKEND_UNIVERSAL_ERROR_CODE,
    BACKEND_UNIVERSAL_ERROR_MSG,
} from '../../../../app/constants/message_constants';
import { 
    createReadingTests as saveReadingTests,
    pagingReadingTests as pagingTests,
} from '../../services/test_services';

import {
    DEFAULT_PAGING_INDEX,
    DEFAULT_PAGING_LIMIT,
} from '../../../../app/constants/common_constants';

//Dummy version for testing database work correctly
async function testCreateParagraphs(request: Request, response: Response): Promise<any> {
    
    const size: number = 10;
    const saveParagraphValues: ParagraphDto[] = [];
    for (let i = 0; i < size; ++i) {
        saveParagraphValues.push(
            {
                paragraph_id: null,
                section_id: null,
                wallpaper: `test_${i}`,
                title: `test_${i}`,
                content: `test_${i}`
            }
        );
    }

    const insertionIds = await saveParagraphs(saveParagraphValues);
    response.status(200).json({
        insertionIds,
    })
}

//Dummy version for testing database work correctly
async function testUpdateParagraph(request: Request, response: Response): Promise<any> {
    
    const updateParagraph: ParagraphDto = {
        paragraph_id: 23,
        section_id: null,
        wallpaper: `test_update`,
        title: `test_update`,
        content: `test_update`
    };

    const updateParagraphEntity = await editParagraph(updateParagraph);
    response.status(200).json({
        updateParagraphEntity,
    })
}

//Dummy version for testing database work correctly
async function testDeleteParagraphs(request: Request, response: Response): Promise<any> {
    
    const startId = 0;
    const size = 10;
    const threshold = startId + size;
    const deleteParagraphIds: number[] = [];
    for (let i = startId; i < threshold; ++i) {
        deleteParagraphIds.push(i);
    }

    const deleteCount = await removeParagraphs(deleteParagraphIds);
    response.status(200).json({
        deleteCount
    })
}


async function createReadingTests(request: Request, response: Response): Promise<any> {
    const {data} = request.body;

    //Default message is error message
    let statusCode = 500;
    let responseJson: any = {
        message: BACKEND_UNIVERSAL_ERROR_MSG,
        errorCode: BACKEND_UNIVERSAL_ERROR_CODE,
    }
    
    try {
        const readingTestIds = await saveReadingTests(data);
        if (readingTestIds) {
            statusCode = 200;
            responseJson = {
                message: "The test(s) are saved successfully",
                code: BACKEND_UNIVERSAL_SUCCESS_CODE,
                data: readingTestIds.map(id => ({createTestId: id})),
            }
        }

    } catch (error) {
        console.log(error);
    } finally {
        response.status(statusCode).json(responseJson);
    }
}


async function pagingReadingTests(request: Request, response: Response) {

    //Paging input
    const limit: number = request.query.limit ? parseInt(String(request.query.limit)) : DEFAULT_PAGING_LIMIT;
    const pageIndex: number = request.query.page ? parseInt(String(request.query.page)) : DEFAULT_PAGING_INDEX;

    //Default message is error message
    let statusCode = 500;
    let responseJson: any = {
        message: BACKEND_UNIVERSAL_ERROR_MSG,
        errorCode: BACKEND_UNIVERSAL_ERROR_CODE,
    }

    try {
        const pagingResult: any = await pagingTests(limit, pageIndex);
        if (pagingResult) {
            statusCode = 200;
            responseJson = {
                message: `Found ${pagingResult.count} test(s)`,
                code: BACKEND_UNIVERSAL_SUCCESS_CODE,
                data: pagingResult,
            }

        }

    } catch (error) {
        console.log(error);
    } finally {
        response.status(statusCode).json(responseJson);
    }
    
}

export {
    createReadingTests,
    pagingReadingTests,

    testCreateParagraphs,
    testUpdateParagraph,
    testDeleteParagraphs,
}
