import { UpsertResult, PoolConnection} from "mariadb";
import {pool} from "../../app/configs/database";

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

//Transaction wrapper higher order function
//  Wrap a query function with/without transaction
function queryExecutionWrapper(executorClosure: any, hasTransaction: boolean = true): any {

    return async (
        params: any, 
        defaultConnection: PoolConnection|null = null): Promise<any> => {
        
            let result: any = null;
        let connection: PoolConnection|null = defaultConnection;
        try {

            if (null === connection) {
                connection = await pool.getConnection();
            }
            if (hasTransaction) {connection?.beginTransaction()};
            result = executorClosure(params, connection);
            if (hasTransaction) {connection?.commit()};

        } catch (error) {
            if (hasTransaction) {
                if (connection) {
                    connection?.rollback();
                }
            }
            console.error(`Error: ${error}`);
        } finally {
            if (connection) {
                connection.release();
            }
        }
    
        return result;
    }
    
}


//Create an Univseral Find-something-by-key DAO
function getFindByKeyMethodQueryClosure(tableName: string, columnNames: string[], keyColumnName: string) {

    //The insertion dao method always return the array of the insertion entities' id
    return async (
        params: {
            keyValue: number[]
        }, connection: PoolConnection): Promise<any> => {
        
        let result: any = null;
        const {keyValue} = params;

        //Terminate if there is empty key value
        if (keyValue.length < 1) {
            return [];
        }

        const columnNameString: string = columnNames.join(', ');
            
        try {
            const query = [
                `SELECT ${columnNameString}`,
                `FROM ${tableName}`,
                `WHERE ${keyColumnName} IN (?)`,
            ].join(' ');

            result = await connection.query(query, [keyValue]);
        } catch (error) {
            throw error;
        } 

        return result;
    }
}

//Create an Univseral CREATE DAO
function getCreateMethodQueryClosure(tableName: string, columnNames: string[]) {

    //The insertion dao method always return the array of the insertion entities' id
    return async (
            params: {
                createDtos: any[]
            }, 
            connection: PoolConnection
        ): Promise<number[]> => {

        let result: number[] = [];
        const {createDtos} = params;
        const bindingValue: any[] = createDtos.map(
            createDto => columnNames.map(
                columnName => createDto[columnName]));
        
        try {
            const columnNameString: string = columnNames.join(', ');
            const bindValueString: string = columnNames
                .map(columnName => "?")
                .join(', ');

            const query: string = 
            [
                `INSERT INTO ${tableName} (`,
                    columnNameString,
                `)`, 
                `VALUES (${bindValueString})`,
            ].join(' ');

            let queryResult: null|UpsertResult|UpsertResult[] = null;
            queryResult = await connection.batch(query, bindingValue);
            result = getInsertionIdsFromQueryInsertion(queryResult as null|UpsertResult);
            
        } catch (error) {
            throw error;
        }

        return result;
    }
}

//Create an Univseral UPDATE DAO
function getUpdateMethodQueryClosure(tableName: string) {

    //The update dao method always return the update entities
    return async (
            params: {
                updateDto: {[key: string]: any}, 
                idColumnName: string, 
            },
            connection: PoolConnection
        ): Promise<Object> => {
        
        const {updateDto, idColumnName} = params;
        let result: Object = updateDto;

        try {
           
            //The value to bind to the query
            const bindingValues: any[] = [];

            //Build the SET statement, example:
            //  SET name = ?, class = ?
            //Note: the primary key column MUST BE exclude from this SET statement
            const stringBuilder: string[] = [];
            Object.keys(updateDto)
                .filter((columnName: string) => columnName !== idColumnName)
                .forEach((columnName: string) => {
                    bindingValues.push(updateDto[columnName]);
                    stringBuilder.push(`${columnName} = ?`);
                })
            const setStatement: string = `SET ${stringBuilder.join(", ")}`;

            //Add binder value for where statement
            bindingValues.push(updateDto[idColumnName]);
            const whereStatement: string = `WHERE ${idColumnName} = ?`

            const query: string = 
            [
                `UPDATE ${tableName}`,
                setStatement,
                whereStatement,
            ].join(' ');

            let queryResult: null|UpsertResult|UpsertResult[] = null;
            queryResult = await connection.query(query, bindingValues);
            
        } catch (error) {
            throw error;
        }
    
        return result;
    }
}


//Create an Univseral DELETE DAO
function getDeleteByKeyMethodQueryClosure(tableName: string, keyColumnName: string) {

    //The delete dao method always return the number of record having been deleted
    return async (
            params: {
                keyValues:  number[],
            },
            connection: PoolConnection
        ): Promise<Object> => {
        
        const {keyValues} = params;
        let result: number = 0;
        try {
           
            const query: string = 
            [
                `DELETE FROM ${tableName}`,
                `WHERE ${keyColumnName} IN (?)`,
            ].join(' ');

            let queryResult: null|UpsertResult|UpsertResult[] = null;
            queryResult = await connection.query(query, [keyValues]);
            result = (queryResult as UpsertResult)?.affectedRows ?? 0;
        } catch (error) {
            throw error;
        }
    
        return result;
    }
}


//Create an Univseral Counting DAO
function getCountingMethodQueryClosure(tableName: string, options: null | {keywordColumn?: string} = null) {

    const keywordColumn: string|null = options?.keywordColumn ?? null;

    //The insertion dao method always return the array of the insertion entities' id
    return async (params: {keyword?: string}, connection: PoolConnection): Promise<number> => {
        
        let queryResult: any = null;
        let count: number = 0;
        let whereStatement: string = "WHERE 1=1";
        let bindingValues: any[] = [];
        
        //Keyword search
        if (params) {
            if (params.hasOwnProperty("keyword") && keywordColumn) {
                
                whereStatement = `${whereStatement} AND ${keywordColumn} LIKE ?`
                const keyword = params.keyword;
                bindingValues.push(`%${keyword}%`);
            } 
        }
        
        try {
            const query = [
                `SELECT COUNT(1)`,
                `FROM ${tableName}`,
                whereStatement,
            ].join(' ');

            queryResult = await connection.query(query, bindingValues);
            count = queryResult[0]['COUNT(1)'];

        } catch (error) {
            throw error;
        } 

        return count;
    }

}

function getPagingMethodQueryClosure(tableName: string, columnNames: string[], closureOptions: null | {keywordColumn?: string} = null) {
    
    const keywordColumn: string|null = closureOptions?.keywordColumn ?? null;
    const columnNameString: string = columnNames.join(', ');

    return async (
        params: {
            limit: number, 
            offset: number, 
            keyword?: null | string,
        },
        connection: PoolConnection): Promise<any> => {

        let result: any = [];
        let bindingValues: any[] = [];
        let selectStatement = `SELECT ${columnNameString}`;
        let fromStatement   = `FROM ${tableName}`;
        let whereStatement  = "WHERE 1=1";
        let limitStatement  = "LIMIT ? OFFSET ?";
        
        //Keyword search
        if (params.hasOwnProperty("keyword") && keywordColumn) {
            whereStatement = `${whereStatement} AND ${keywordColumn} LIKE ?`;
            const keyword = params.keyword;
            bindingValues.push(`%${keyword}%`);
        }

        //Paging properties
        const {limit, offset} = params; 
        bindingValues.push(limit, offset);
        try {
            const query = [
                selectStatement,
                fromStatement,
                whereStatement,
                limitStatement,
            ].join(' ');

            result = await connection.query(query, bindingValues);
        } catch (error) {
            throw error;
        } 

        return result;
    }   
}

export {
    getInsertionIdsFromQueryInsertion,
    queryExecutionWrapper,

    //Universal CRUD method
    getCreateMethodQueryClosure,
    getFindByKeyMethodQueryClosure,
    getUpdateMethodQueryClosure,
    getDeleteByKeyMethodQueryClosure,
    getCountingMethodQueryClosure,
    getPagingMethodQueryClosure,
}