import {Router} from 'express';
import fileUpload from 'express-fileupload';

import {saveFileToResourcePath} from '../../../../app/controllers/cdn_controllers'
import {checkFileSizeLimit, checkFileExtension} from '../../../../app/middlewares/upload_file_middleware'
import {
    PASSAGE_WALLPAPER_FILE_ALLOWED_EXTENSION,
    READING_PASSAGE_THUMBNAIL_RESOURCE_PATH
} from '../../constants/file_constants';


const router: Router = Router();
const ROOT_URL: string = "";

router.post(
    '/reading-passage/thumbnail',
    fileUpload({createParentPath: true}),
    checkFileSizeLimit,
    checkFileExtension(PASSAGE_WALLPAPER_FILE_ALLOWED_EXTENSION),
    saveFileToResourcePath(READING_PASSAGE_THUMBNAIL_RESOURCE_PATH),
);

export {
    router,
}