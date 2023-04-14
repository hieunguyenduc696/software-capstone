import {
    getCreateMethodQueryClosure,
    getFindByKeyMethodQueryClosure,
} from "../../../app/helpers/query_helper";

const tableName = "paragraph";
const getParagraphBySectionIds = getFindByKeyMethodQueryClosure(tableName, ['id', 'wallpaper', 'title', 'content'], 'section_id');
const createParagraphs = getCreateMethodQueryClosure(tableName, ['wallpaper', 'title', 'content']);

export {
    getParagraphBySectionIds,
    createParagraphs,
}