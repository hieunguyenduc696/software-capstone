import {
    queryExecutionWrapper,

    //CRUD base closure
    getCreateMethodQueryClosure,
    getFindByKeyMethodQueryClosure,
    getUpdateMethodQueryClosure,
    getDeleteByKeyMethodQueryClosure,
} from "../../../app/helpers/query_helper";


const tableName = "paragraph";

//Query closure, without transaction (for later use)
const getParagraphBySectionIdsClosure = getFindByKeyMethodQueryClosure(
    tableName, ['paragraph_id', 'wallpaper', 'title', 'content'], 'section_id'
);
const createParagraphsClosure = getCreateMethodQueryClosure(
    tableName, ['wallpaper', 'title', 'content']
);
const updateParagraphClosure = getUpdateMethodQueryClosure(tableName);
const deleteParagraphsClosure = getDeleteByKeyMethodQueryClosure(tableName, "paragraph_id");

//Wrap the query closure with/without transaction
const getParagraphBySectionIds = queryExecutionWrapper(getParagraphBySectionIdsClosure, false);
const createParagraphs = queryExecutionWrapper(createParagraphsClosure, true);
const updateParagraph = queryExecutionWrapper(updateParagraphClosure, true);
const deleteParagraphs = queryExecutionWrapper(deleteParagraphsClosure, true);

export {
    getParagraphBySectionIds,
    createParagraphs,
    updateParagraph,
    deleteParagraphs,
}