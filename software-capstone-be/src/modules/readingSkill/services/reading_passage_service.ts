import {ReadingPassageDao} from "../datatypes/exam";
import {createReadingPassages as saveReadingPassages}  from "../daos/reading_passage_dao";

async function createReadingPassages(
        readingPassageDaos: ReadingPassageDao[]
    ): Promise<number[]> {
    
    //Map the Models into Entities
    const entityValues = readingPassageDaos.map((dao) => {
        return [
            dao.wallpaper ?? null,
            dao.title ?? null,
            dao.content ?? null,
        ]
    })

    const insertionIds: number[] = await saveReadingPassages(entityValues);
    
    return insertionIds;
}

export {
    createReadingPassages,
}