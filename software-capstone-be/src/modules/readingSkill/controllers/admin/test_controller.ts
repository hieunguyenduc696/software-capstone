import {Request, Response} from 'express';
import {ParagraphDto} from "../../datatypes/test";
import {createParagraphs as saveParagraphs} from '../../services/paragraph_service';

//Dummy version for testing database work correctly
async function testCreateParagraphs(request: Request, response: Response): Promise<any> {
    
    const size: number = 10;
    const saveParagraphValues: ParagraphDto[] = [];
    for (let i = 0; i < size; ++i) {
        saveParagraphValues.push(
            {
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

function createTest(request: Request, response: Response): Promise<any> {
    return new Promise((resolve, reject) => {
        
    })
}

export {
    createTest,
    testCreateParagraphs
}
