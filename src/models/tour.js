const mysql = require('../lib/mysql');

const getAllTours = async () => {
    const statement = 'select * from tours;';
    const parameters = [];
    return await mysql.query(statement, parameters);
}

const getMatchesByTourName = async params => {
    const statement = `
    select
        m.id,m.name,m.tourId,m.status,m.format,m.startTime,m.endTime,m.recUpdatedAt,m.createdAt
    from
	    matches m
    inner join tours t on
	    m.tourId = t.id
    where
        t.name = ?
    ;`;
    const parameters = [params.name];
    return await mysql.query(statement, parameters);
}

module.exports = {
    getAllTours: getAllTours,
    getMatchesByTourName: getMatchesByTourName
}