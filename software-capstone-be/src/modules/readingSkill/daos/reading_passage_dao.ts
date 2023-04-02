import {pool} from "../../../app/configs/database";
import {ReadingPassageDao} from "../datatypes/exam";

function getReadingPassageByExamIds(ids: number[]) {
	return new Promise(function (resolve, reject) {
		const query = [
			'SELECT id, wallpaper, title, content',
			'FROM reading_passage',
			'WHERE exam_id IN (?)',
		].join(' ');

		let passages = null;
		pool.query(query, [ids], (error, results) => {
			if (error) {
                console.log(error);
				reject(error);
				return;
			}
			passages = results;
			resolve(passages);
		});
	});
}


function createReadingPassages(
        readingPassageDaos: ReadingPassageDao[]
    ): Promise<number[]> {
    
    return new Promise((resolve, reject) => {

        const query: string = 
        [
            `INSERT INTO reading_passage (`,
				`wallpaper`, `title`, `content`,
			`)`, 
            'VALUES (',
				'?,?,?', 
			')',
        ].join(' ');

        const binderValues: (string|null)[][] = readingPassageDaos.map(dao => [
            dao?.wallpaper ?? null, 
            dao?.title ?? null, 
            dao?.content ?? null
        ]);

        //User bulk insertion for better optimization
        pool.query(query, [binderValues], (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            
            //Get the id of the created ones
            const size: number = result.affectedRows;
            const firstId: number = result.insertId;
            const aboveMaxId: number = firstId + size;
            let ids: number[] = [];
            for (let i: number = firstId; i < aboveMaxId; i++) {
                ids.push(i);
            }
            resolve(ids);
        });
    })
    
}

export {
    getReadingPassageByExamIds,
    createReadingPassages,
}