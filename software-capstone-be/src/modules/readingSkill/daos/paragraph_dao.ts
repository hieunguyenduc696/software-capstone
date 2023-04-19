import { PoolConnection } from "mariadb";

import {
    queryExecutionWrapper,

    //CRUD base closure
    getCreateMethodQueryClosure,
    getFindByKeyMethodQueryClosure,
    getUpdateMethodQueryClosure,
    getDeleteByKeyMethodQueryClosure,
} from "../../../app/helpers/query_helper";

import { ParagraphDto } from "../datatypes/test";

const tableName = "paragraph";

//Query closure, without transaction (for later use)
const getParagraphBySectionIdsClosure = getFindByKeyMethodQueryClosure(
    tableName, ['paragraph_id', 'wallpaper', 'title', 'content'], 'section_id'
);
const createParagraphsClosure = getCreateMethodQueryClosure(
    tableName, ['section_id', 'wallpaper', 'title', 'content']
);
const updateParagraphClosure = getUpdateMethodQueryClosure(tableName);
const deleteParagraphsClosure = getDeleteByKeyMethodQueryClosure(tableName, "paragraph_id");

//Wrap the query closure with/without transaction
const getParagraphBySectionIds = queryExecutionWrapper(getParagraphBySectionIdsClosure, false);
const createParagraphs = queryExecutionWrapper(createParagraphsClosure, true);
const updateParagraph = queryExecutionWrapper(updateParagraphClosure, true);
const deleteParagraphs = queryExecutionWrapper(deleteParagraphsClosure, true);

const createParagraphsProcess = async (dtos: ParagraphDto[], connection: PoolConnection): Promise<number[]> => {
    const paragraphDtos = {createDtos: dtos};
    const paragraphIds = await createParagraphsClosure(paragraphDtos, connection);
    return paragraphIds;
}


export {
    getParagraphBySectionIds,
    createParagraphs,
    updateParagraph,
    deleteParagraphs,

    createParagraphsProcess,
}