import {Router} from 'express';
import {
    testCreateParagraphs,
    testUpdateParagraph,
    testDeleteParagraphs,
} from '../../controllers/admin/test_controller';

const router: Router = Router();
const ROOT_URL: string = "";

router.get(
    '/test-db',
    testCreateParagraphs
)

router.get(
    '/test-update',
    testUpdateParagraph,
)

router.get(
    '/test-delete',
    testDeleteParagraphs,
)

export {
    router,
}