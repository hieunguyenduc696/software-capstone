import {FileArray, UploadedFile} from "express-fileupload";
import {RESOURCE_PATH} from "../constants/config_constants";
import * as path from "path";
import {v4 as uuid} from "uuid";
/**
 * 
 * @param files //multiple file to save
 * @param resourcePath //the folder, where to save the files
 * @param id //optional paramter, to add to the save files' name
 * @returns 
 */
export function saveFile(
    files: FileArray | null = null, 
    resourcePath: string = RESOURCE_PATH, 
    id: string = ""): Promise<any> {
    
    return new Promise((resolve, reject) => {

        //If the user doesn't send the files => do nothing
        if (null === files) {
            resolve(null);
            return;
        }
        
        //Handling to save each file to the path
        const dirPath: string = resourcePath;
        const errors: any[] = [];
        const fileNames: string[] = [];
        Object.keys(files).forEach(key => {

            //using uuid to generate an unique file name
            const uuidv4: string = uuid();
            const fileName: string = ("" !== id)
                ? [id, uuidv4].join("_")
                : uuidv4;  
            
            const filePath = path.join(dirPath, fileName);
            fileNames.push(fileName);
            (files[key] as UploadedFile).mv(filePath, (error) => {
                errors.push(error);
                fileNames.pop();    //remove the already add name
            })
        })

        //Reject, if saving process to filesystem has error
        if (errors.length) {
            reject(errors);
        }

    })
}
