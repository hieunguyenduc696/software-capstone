import {ReadingPassageDao} from "../datatypes/exam";
import {createReadingPassages as saveReadingPassages}  from "../daos/reading_passage_dao";

function createReadingPassages(
        readingPassageDaos: ReadingPassageDao[]
    ): Promise<number[]> {
    
    return new Promise((resolve, reject) => {
        return saveReadingPassages(readingPassageDaos)
            .catch(error => {
                console.log(error);
                reject(false);
            })
            .then((ids) => {
                resolve(ids as number[]);
            });
    })
    
}

export {
    createReadingPassages,
}