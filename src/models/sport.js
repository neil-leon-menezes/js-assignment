const mysql = require('../lib/mysql');

const getAllSportsToursAndMatches = async () => {
    const statement = `
    select
        s.name as sportName,t.name as tourName,m.name as matchName,m.id,m.startTime,m.format
    from
        matches m
    inner join tours t on
	    m.tourId = t.id
    inner join sports s on
	    t.sportId = s.id
    ;`;
    const parameters = [];
    return await mysql.query(statement, parameters);
}

const getSportAndTourByMatchId = async (matchId) => {
    const statement = `
    select
        s.id as sportId, t.id as tourId
    from
        sports s
    inner join tours t on
        s.id = t.sportId
    inner join matches m on
        t.id = m.tourId
    where
        m.id = ?
    ;`;
    const parameters = [matchId];
    const result = await mysql.query(statement, parameters);
    // Assuming that matchId is unique and can only belong to one sport and one tour
    return result[0] || {}; // Return the first element of the result array or empty object if empty
}

const getSportByTourId = async (tourId) => {
    const statement = `
    select
        s.id as sportId
    from
        sports s
    inner join tours t on
        s.id = t.sportId
    where
        t.id = ?
    ;`;
    const parameters = [tourId];
    const result = await mysql.query(statement, parameters);
    // Assuming that tourId is unique and can only belong to one sport
    return result[0] || {}; // Return the first element of the result array or empty object if empty
}

module.exports = {
    getAllSportsToursAndMatches: getAllSportsToursAndMatches,
    getSportAndTourByMatchId: getSportAndTourByMatchId,
    getSportByTourId: getSportByTourId
}