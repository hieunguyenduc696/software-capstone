import * as path from "path";
import {Request, Response} from "express";
import {FileArray, UploadedFile} from "express-fileupload";

import {Next} from "../datatypes/middleware";

import {
    FILE_SIZE_LIMIT,
    FILE_SIZE_IN_MB,
} from "../constants/file_constants";

import {
    SAVED_OVERLIMIT_FILE_SIZE_CODE,
    SAVED_INVALID_EXTENSIONS_FILE_CODE,
} from "../constants/message_constants";

//Middleware to check the file size limit of an uploaded file
export function checkFileSizeLimit(request: Request, response: Response, next: Next) {
    const files: FileArray | null = request.files ?? null;

    //If the user didn't send files
    if (null === files) {
        next();
        return;
    }

    const overlimitFiles: string[] = [];

    //Which files are over the limit?
    Object.keys(files).forEach(key => {
        const file = files[key] as UploadedFile;

        if (file.size > FILE_SIZE_LIMIT) {
            overlimitFiles.push(file.name);
        }
    })

    if (overlimitFiles.length) {
        const properVerb = overlimitFiles.length > 1 ? 'are' : 'is';
        const sentence = 
            `Upload failed. ${overlimitFiles.toString()} ${properVerb} over the file size limit of ${FILE_SIZE_IN_MB} MB`
            .replaceAll(",", ", ");
        const message = overlimitFiles.length < 3
            ? sentence.replace(",", ", ")   //if there is 2 object => replace the "," with "and"
            : sentence.replace(/,(?=[^,]*$)/, " and") // if else, replace the last "," with "and"
    
        const responseJSON = {
            code: SAVED_OVERLIMIT_FILE_SIZE_CODE,
            message: message,
        }

        response
            .status(413)
            .json(responseJSON);
        return;
    }

    next();
 }


//Middleware to check if the files has the allowed extension
export function checkFileExtension(allowedExtensions: string[]) {
    return (request: Request, response: Response, next: Next) => {
        const files = request.files ?? null;
        if (null === files) {
            next();
            return;
        }

        //Get all the extensions of the upload files
        const fileExtensions: string[] = []
        Object.keys(files).forEach(key => {
            let fileArray: UploadedFile|UploadedFile[] = files[key];

            if (Array.isArray(fileArray)) {
                fileArray.forEach(file => {
                    fileExtensions.push(path.extname(file.name));
                })
            } else {
                fileExtensions.push(path.extname(fileArray.name));
            }
        })

        //Are the file extension allowed ?
        const allowed = fileExtensions
            .every(extension => allowedExtensions.includes(extension));
        if (!allowed) {
            const message = 
                `Upload failed. Only ${allowedExtensions.toString()} files allowed`
                .replaceAll(",", ", ");

            const responseJson = {
                code: SAVED_INVALID_EXTENSIONS_FILE_CODE,
                message: message,
            }

            return response
                .status(422)
                .json(responseJson);
        }

        next();
    }
}
