import {Router} from 'express';
import {testCreateReadingPassages} from '../../controllers/admin/exam_controller';

const router: Router = Router();
const ROOT_URL: string = "";

router.get(
    '/test-db',
    testCreateReadingPassages
)

export {
    router,
}