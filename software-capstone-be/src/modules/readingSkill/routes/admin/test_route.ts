import {Router} from 'express';
import {
    testCreateParagraphs,
    testUpdateParagraph,
    testDeleteParagraphs,
    createReadingTests,
    pagingReadingTests,
    getReadingTestById,
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

router.post(
    '/create',
    createReadingTests
)

router.get(
    '/',
    pagingReadingTests,
)

router.get(
    '/:testId',
    getReadingTestById,
)

export {
    router,
}