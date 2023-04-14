import {Router} from 'express';
import fileUpload from 'express-fileupload';

import {saveFileToResourcePath} from '../../../../app/controllers/cdn_controllers'
import {checkFileSizeLimit, checkFileExtension} from '../../../../app/middlewares/upload_file_middleware'
import {
    PARAGRAPH_WALLPAPER_FILE_ALLOWED_EXTENSION,
    PARAGRAPH_WALLPAPER_RESOURCE_PATH
} from '../../constants/file_constants';


const router: Router = Router();
const ROOT_URL: string = "";

router.post(
    '/paragraph/wallpaper',
    fileUpload({createParentPath: true}),
    checkFileSizeLimit,
    checkFileExtension(PARAGRAPH_WALLPAPER_FILE_ALLOWED_EXTENSION),
    saveFileToResourcePath(PARAGRAPH_WALLPAPER_RESOURCE_PATH),
);

export {
    router,
}