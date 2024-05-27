const News = require('../controllers/news');
const ValidationError = require('../lib/validation-error');

module.exports = function(app) {
    app.route('/news').post(async (req, res, next) => {
        try {
            return res.json(await News.createNews(req.body));
        } catch (err) {
            if(err instanceof ValidationError){
                return res.status(422).json({
                    error: err.message
                })
            }
            return next(err);
        }
    });

    app.route('/news/match/:matchId').get(async (req, res, next) => {
        try {
            const { matchId } = req.params;
            return res.json(await News.getNewsByMatchId(matchId));
        } catch (err) {
            if(err instanceof ValidationError){
                return res.status(422).json({
                    error: err.message
                })
            }
            return next(err);
        }
    });

    app.route('/news/tour/:tourId').get(async (req, res, next) => {
        try {
            const { tourId } = req.params;
            return res.json(await News.getNewsByTourId(tourId));
        } catch (err) {
            if(err instanceof ValidationError){
                return res.status(422).json({
                    error: err.message
                })
            }
            return next(err);
        }
    });

    app.route('/news/sport/:sportId').get(async (req, res, next) => {
        try {
            const { sportId } = req.params;
            return res.json(await News.getNewsBySportId(sportId));
        } catch (err) {
            if(err instanceof ValidationError){
                return res.status(422).json({
                    error: err.message
                })
            }
            return next(err);
        }
    });
}