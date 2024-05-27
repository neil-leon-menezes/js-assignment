const News = require('../models/news');
const Sport = require('../models/sport');
const ValidationError = require('../lib/validation-error')

const createNews = async body => {
    let { title, description, matchId, tourId } = body;

    if(!matchId & !tourId){
        throw new ValidationError('Missing required parameter: matchId or tourId'); 
    }
    if(matchId & tourId){
        throw new ValidationError('Invalid input: only one parameter is allowed from [matchId, tourId]'); 
    }

    let sportId;
    if(matchId){
        ({sportId, tourId} = await Sport.getSportAndTourByMatchId(matchId));
    } else {
        ({sportId} =  await Sport.getSportByTourId(tourId));
    }

    if(!sportId){
        let param = matchId?'matchId':'tourId'
        throw new ValidationError('Invalid input: provided value for '+param+' does not exist');
    }

    const result = await News.createNews({ title, description, matchId, tourId, sportId});
    return { message: 'News created successfully', newsId: result.insertId, sportId, tourId, matchId};
};

const getNewsByMatchId = async matchId => {
    return await News.getNewsByMatchId(matchId);
};

const getNewsByTourId = async tourId => {
    return await News.getNewsByTourId(tourId);
};

const getNewsBySportId = async sportId => {
    return await News.getNewsBySportId(sportId);
};

module.exports = {
    createNews,
    getNewsByMatchId,
    getNewsByTourId,
    getNewsBySportId
};