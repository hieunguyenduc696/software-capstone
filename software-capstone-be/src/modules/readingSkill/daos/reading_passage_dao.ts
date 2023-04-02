import {pool} from '../../../app/configs/database';

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


function createReadingPassage(
        readingPassageDao: {wallpaper: string, title: string, content: string}
    ): Promise<number> {
    
    return new Promise((resolve, reject) => {

        const {wallpaper, title, content} = readingPassageDao;

        const query: string = 
        [
            `INSERT INTO reading_passage (`,
				`wallpaper`, `title`, `content`,
			`)`, 
            'VALUES (',
				'?,?,?', 
			')',
        ].join(' ');

        pool.query(query, [wallpaper, title, content], (error, result) => {
            if (error) {
                reject(error);
                return;
            }

            //Get the id of the created one
            const id = result.insertId;
            resolve(id);
        });
    })
    
}

export {
    getReadingPassageByExamIds,
    createReadingPassage,
}