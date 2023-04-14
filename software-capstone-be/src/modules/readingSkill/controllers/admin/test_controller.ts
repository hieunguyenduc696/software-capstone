import {Request, Response} from 'express';
import {ParagraphDto} from "../../datatypes/test";
import {
    createParagraphs as saveParagraphs,
    updateParagraph as editParagraph,
    deleteParagraphs as removeParagraphs,
} from '../../services/paragraph_service';

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


function createTest(request: Request, response: Response): Promise<any> {
    return new Promise((resolve, reject) => {
        
    })
}

export {
    createTest,
    testCreateParagraphs,
    testUpdateParagraph,
    testDeleteParagraphs,
}
