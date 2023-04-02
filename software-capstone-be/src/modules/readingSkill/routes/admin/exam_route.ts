import {Router} from 'express';
import {getExam} from '../../controllers/admin/exam_controller';

const router: Router = Router();
const ROOT_URL: string = "";

router.get(
    '/index', 
    getExam
);

export {
    router,
}