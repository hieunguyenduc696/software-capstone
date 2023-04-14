import {Request, Response} from 'express';
import {ReadingPassageDao} from "../../datatypes/exam";
import {createReadingPassages as saveReadingPassages} from '../../services/reading_passage_service';

//Dummy version for testing database work correctly
async function testCreateReadingPassages(request: Request, response: Response): Promise<any> {
    
    const size: number = 10;
    const saveReadingPassageValues: ReadingPassageDao[] = [];
    for (let i = 0; i < size; ++i) {
        saveReadingPassageValues.push(
            {
                wallpaper: `test_${i}`,
                title: `test_${i}`,
                content: `test_${i}`
            }
        );
    }

    const insertionIds = await saveReadingPassages(saveReadingPassageValues);
    response.status(200).json({
        insertionIds,
    })
}

function createExam(request: Request, response: Response): Promise<any> {
    return new Promise((resolve, reject) => {
        
    })
}

export {
    createExam,
    testCreateReadingPassages
}
