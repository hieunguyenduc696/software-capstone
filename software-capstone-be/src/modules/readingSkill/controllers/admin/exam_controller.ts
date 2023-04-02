import {Request, Response} from 'express';
import {getReadingPassageByExamIds} from '../../daos/reading_passage_dao';

//Dummy version for testing database work correctly
export function getExam(request: Request, response: Response): Promise<any> {
    return new Promise((resolve, reject) => {
        getReadingPassageByExamIds([1]).then(passages => {
            response.status(200).json(passages);
        });;
    })
}

