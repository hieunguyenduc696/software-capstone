import {Request, Response} from 'express';
import fileUpload from 'express-fileupload';

import {saveFile} from '../helpers/upload_file_helper';
import {
    BACKEND_UNIVERSAL_SUCCESS_CODE,
    BACKEND_UNIVERSAL_ERROR_CODE,
    BACKEND_UNIVERSAL_ERROR_MSG,
} from '../../app/constants/message_constants';

/**
 * 
 * @param {string} resourcePath: path of the folder, where to put the file in
 * @returns {Closure} the function to handle the save file process
 */
export function saveFileToResourcePath(resourcePath: string) {
    return (request: Request, response: Response): Promise<any> => {
        return new Promise((resolve, reject) => {
            const uploadFiles: fileUpload.FileArray|null = request.files ?? null;
            return saveFile(uploadFiles, resourcePath)
                .catch(
                    errors => {
                        console.log(errors);
                        const message: string =  BACKEND_UNIVERSAL_ERROR_MSG;
                        const errorCode: number = BACKEND_UNIVERSAL_ERROR_CODE;
                        const responseJson = {
                            message,
                            errorCode,
                        }
        
                        response.status(500).json(responseJson);
                    }
                ).then(originalNameMapperData => {
                    const message: string = "The files has been saved successfully";
                    const errorCode: number = BACKEND_UNIVERSAL_SUCCESS_CODE;
                    const responseJson = {
                        message,
                        errorCode,
                        data: originalNameMapperData,
                    }
                    response.status(200).json(responseJson)
                });
        })
    }
}
