import {ParagraphDto} from "../datatypes/test";
import {createParagraphs as saveParagraphs}  from "../daos/paragraph_dao";

async function createParagraphs(
        paragraphDtos: ParagraphDto[]
    ): Promise<number[]> {
    
    //Map the Models into Entities
    const entityValues = paragraphDtos.map((dao) => {
        return [
            dao.wallpaper ?? null,
            dao.title ?? null,
            dao.content ?? null,
        ]
    })

    const insertionIds: number[] = await saveParagraphs(entityValues);
    
    return insertionIds;
}

export {
    createParagraphs,
}