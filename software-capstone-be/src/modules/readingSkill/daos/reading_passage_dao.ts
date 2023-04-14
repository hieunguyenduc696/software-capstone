import { PoolConnection, UpsertResult } from "mariadb";
import {
    getCreateMethodQueryClosure,
    getFindByKeyMethodQueryClosure,
} from "../../../app/helpers/query_helper";

const tableName = "reading_passage";
const getReadingPassageByExamIds = getFindByKeyMethodQueryClosure(tableName, ['id', 'wallpaper', 'title', 'content'], 'exam_id');
const createReadingPassages = getCreateMethodQueryClosure(tableName, ['wallpaper', 'title', 'content']);

export {
    getReadingPassageByExamIds,
    createReadingPassages,
}