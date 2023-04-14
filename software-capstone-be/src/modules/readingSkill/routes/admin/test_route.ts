import {Router} from 'express';
import {testCreateParagraphs} from '../../controllers/admin/test_controller';

const router: Router = Router();
const ROOT_URL: string = "";

router.get(
    '/test-db',
    testCreateParagraphs
)

export {
    router,
}