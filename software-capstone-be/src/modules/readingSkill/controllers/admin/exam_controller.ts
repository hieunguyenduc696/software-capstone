import {Request, Response} from 'express';
import fileUpload from 'express-fileupload';

import {getReadingPassageByExamIds} from '../../daos/reading_passage_dao';
import {saveFile} from '../../../../app/helpers/upload_file_helper';

//Dummy version for testing database work correctly
export function getExam(request: Request, response: Response): Promise<any> {
    return new Promise((resolve, reject) => {
        getReadingPassageByExamIds([1]).then(passages => {
            response.status(200).json(passages);
        });;
    })
}

