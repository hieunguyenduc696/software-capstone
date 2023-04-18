import {TestDto} from "../datatypes/test";
import {
    createParagraphs as saveParagraphs,
    updateParagraph as editParagraph,
    deleteParagraphs as removeParagraphs,
}  from "../daos/paragraph_dao";

async function createTests(testDtos: TestDto[]): Promise<number[]> {
    
    

    // //Map the Models into Entities
    // const entityValues = paragraphDtos.map((dao) => {
    //     return [
    //         dao.wallpaper ?? null,
    //         dao.title ?? null,
    //         dao.content ?? null,
    //     ]
    // })

    // const insertionIds: number[] = await saveParagraphs({
    //     createDtos: entityValues,
    // });
    //TODO:
    return insertionIds;
}

export {
    createTest,
}