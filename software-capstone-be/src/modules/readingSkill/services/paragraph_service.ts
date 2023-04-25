import {ParagraphDto} from "../datatypes/test";
import {
    createParagraphs as saveParagraphs,
    updateParagraph as editParagraph,
    deleteParagraphs as removeParagraphs,
}  from "../daos/paragraph_dao";

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

    const insertionIds: number[] = await saveParagraphs({
        createDtos: entityValues,
    });
    
    return insertionIds;
}

async function updateParagraph(paragraphDto: ParagraphDto): Promise<ParagraphDto> {

    const updateEntity: ParagraphDto = await editParagraph({
        updateDto: paragraphDto,
        idColumnName: "paragraph_id",
    });

    return updateEntity;
}

async function deleteParagraphs(paragraphIds: number[]): Promise<number> {

    const deleteCount: number = await removeParagraphs({
        keyValues: paragraphIds,
    });

    return deleteCount;
}

export {
    createParagraphs,
    updateParagraph,
    deleteParagraphs,
}