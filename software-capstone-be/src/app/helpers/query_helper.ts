import { UpsertResult, PoolConnection} from "mariadb";
import {pool} from "../configs/database";

//From the batch insertion result, try to get the id of all insertion entities
function getInsertionIdsFromQueryInsertion(queryResult: UpsertResult|null): number[] {

    let ids: number[] = [];
    if (null === queryResult) {
        return ids;
    }

    const size: number = queryResult.affectedRows;
    const firstId: number = Number(queryResult.insertId);
    const aboveMaxId: number = firstId + size;
    for (let i: number = firstId; i < aboveMaxId; i++) {
        ids.push(i);
    }

    return ids;
}


//Create an Univseral Find-something-by-key DAO
function getFindByKeyMethodQueryClosure(tableName: string, columnNames: string[], keyColumnName: string) {

    //The insertion dao method always return the array of the insertion entities' id
    return async (keyValue: number[]): Promise<any> => {
        let result: any = null;
        let connection: null | PoolConnection = null;

        const columnNameString: string = columnNames.join(', ');
            
        try {
            connection = await pool.getConnection();
            const query = [
                `SELECT ${columnNameString}`,
                `FROM ${tableName}`,
                `WHERE ${keyColumnName} IN (?)`,
            ].join(' ');

            result = await connection.query(query, keyValue);
        } catch (error) {
            console.error("SQL error in establishing a connection: ", error);
        } finally {
            if (connection) {
                connection.release();
            }
        }

        return result;
    }
}

//Create an Univseral CREATE DAO
function getCreateMethodQueryClosure(tableName: string, columnNames: string[]) {

    //The insertion dao method always return the array of the insertion entities' id
    return async (values: any[]): Promise<number[]> => {
        let result: number[] = [];
        let connection: null | PoolConnection = null;
    
        try {
            const columnNameString: string = columnNames.join(', ');
            const bindValueString: string = columnNames
                .map(columnName => "?")
                .join(', ');

            connection = await pool.getConnection();
            const query: string = 
            [
                `INSERT INTO ${tableName} (`,
                    columnNameString,
                `)`, 
                `VALUES (${bindValueString})`,
            ].join(' ');

            let queryResult: null|UpsertResult|UpsertResult[] = null;
            try {
                await connection.beginTransaction();
                queryResult = await connection.batch(query, values);
                await connection.commit();
            } catch (error) {
                connection.rollback();
                console.error("SQL error in executing transaction: ", error);
                throw error;
            }
    
            result = getInsertionIdsFromQueryInsertion(queryResult as null|UpsertResult);
            
        } catch (error) {
            connection?.rollback();
            console.error("SQL error in establishing a connection: ", error);
        } finally {
            if (connection) {
                connection.release();
            }
        }
    
        return result;
    }
}

export {
    getInsertionIdsFromQueryInsertion,
    getCreateMethodQueryClosure,
    getFindByKeyMethodQueryClosure,
}