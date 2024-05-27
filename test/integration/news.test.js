const request = require('supertest');
const { app } = require('../../index');

describe('News Integration Tests', () => {
    let server;

    beforeAll((done) => {
        server = app.listen(done);
    });

    afterAll((done) => {
        server.close(done);
    });

    describe('POST /news', () => {
        it('should create news for a match and return success message', async () => {
            const response = await request(server)
                .post('/news')
                .send({
                    title: 'Gujrat Titans suffer injury',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in eros urna. Maecenas ut neque urna. Donec pellentesque vel leo eget eleifend. Vivamus sagittis mi sem, vitae scelerisque ligula euismod nec. Donec non urna non ante sagittis scelerisque. Nulla ultricies neque ac tortor dictum pulvinar. Sed pellentesque, sem a accumsan eleifend, leo quam luctus ipsum, a semper enim eros ac orci. Proin fringilla sem eget erat euismod fermentum ac eleifend metus. Duis at congue ante, a tempus sem. Vivamus a eros eget neque cursus ornare.',
                    matchId: 1
                });
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('News created successfully');
            expect(response.body.matchId).toBe(1);
            expect(response.body.tourId).toBe(1);
            expect(response.body.sportId).toBe(1);
        });

        it('should create news for a tour and return success message', async () => {
            const response = await request(server)
                .post('/news')
                .send({
                    title: 'IPL to be held in South Africa this year.',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in eros urna. Maecenas ut neque urna. Donec pellentesque vel leo eget eleifend. Vivamus sagittis mi sem, vitae scelerisque ligula euismod nec. Donec non urna non ante sagittis scelerisque. Nulla ultricies neque ac tortor dictum pulvinar. Sed pellentesque, sem a accumsan eleifend, leo quam luctus ipsum, a semper enim eros ac orci. Proin fringilla sem eget erat euismod fermentum ac eleifend metus. Duis at congue ante, a tempus sem. Vivamus a eros eget neque cursus ornare.',
                    tourId: 1
                });
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('News created successfully');
            expect(response.body).not.toHaveProperty('matchId');
            expect(response.body.tourId).toBe(1);
            expect(response.body.sportId).toBe(1);
        });

        it('should return validation error when matchId and tourId is not provided', async () => {
            const response = await request(server)
                .post('/news')
                .send({
                    title: 'Lok sabha election poll results',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in eros urna. Maecenas ut neque urna. Donec pellentesque vel leo eget eleifend. Vivamus sagittis mi sem, vitae scelerisque ligula euismod nec. Donec non urna non ante sagittis scelerisque. Nulla ultricies neque ac tortor dictum pulvinar. Sed pellentesque, sem a accumsan eleifend, leo quam luctus ipsum, a semper enim eros ac orci. Proin fringilla sem eget erat euismod fermentum ac eleifend metus. Duis at congue ante, a tempus sem. Vivamus a eros eget neque cursus ornare.',
                });
            expect(response.status).toBe(422);
            expect(response.body.error).toBe('Missing required parameter: matchId or tourId');
        })

        it('should return validation error when both matchId and tourId are provided', async () => {
            const response = await request(server)
                .post('/news')
                .send({
                    title: 'Messi to join Miami FC.',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in eros urna. Maecenas ut neque urna. Donec pellentesque vel leo eget eleifend. Vivamus sagittis mi sem, vitae scelerisque ligula euismod nec. Donec non urna non ante sagittis scelerisque. Nulla ultricies neque ac tortor dictum pulvinar. Sed pellentesque, sem a accumsan eleifend, leo quam luctus ipsum, a semper enim eros ac orci. Proin fringilla sem eget erat euismod fermentum ac eleifend metus. Duis at congue ante, a tempus sem. Vivamus a eros eget neque cursus ornare.',
                    matchId: 1,
                    tourId: 1
                });
            expect(response.status).toBe(422);
            expect(response.body.error).toBe('Invalid input: only one parameter is allowed from [matchId, tourId]');
        })

        it('should return validation error when matchId is not found', async () => {
            const response = await request(server)
                .post('/news')
                .send({
                    title: 'Record turnout for match.',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in eros urna. Maecenas ut neque urna. Donec pellentesque vel leo eget eleifend. Vivamus sagittis mi sem, vitae scelerisque ligula euismod nec. Donec non urna non ante sagittis scelerisque. Nulla ultricies neque ac tortor dictum pulvinar. Sed pellentesque, sem a accumsan eleifend, leo quam luctus ipsum, a semper enim eros ac orci. Proin fringilla sem eget erat euismod fermentum ac eleifend metus. Duis at congue ante, a tempus sem. Vivamus a eros eget neque cursus ornare.',
                    matchId: 111
                });
            expect(response.status).toBe(422);
            expect(response.body.error).toBe('Invalid input: provided value for matchId does not exist');
        })

        it('should return validation error when tourId is not found', async () => {
            const response = await request(server)
                .post('/news')
                .send({
                    title: 'This tour could be cancelled.',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in eros urna. Maecenas ut neque urna. Donec pellentesque vel leo eget eleifend. Vivamus sagittis mi sem, vitae scelerisque ligula euismod nec. Donec non urna non ante sagittis scelerisque. Nulla ultricies neque ac tortor dictum pulvinar. Sed pellentesque, sem a accumsan eleifend, leo quam luctus ipsum, a semper enim eros ac orci. Proin fringilla sem eget erat euismod fermentum ac eleifend metus. Duis at congue ante, a tempus sem. Vivamus a eros eget neque cursus ornare.',
                    tourId: 111
                });
            expect(response.status).toBe(422);
            expect(response.body.error).toBe('Invalid input: provided value for tourId does not exist');
        })
    });

    describe('GET /news/match/:matchId', () => {
        it('should return news for the given matchId', async () => {
            const matchId = 1;
            const response = await request(server).get(`/news/match/${matchId}`);
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });

        it('should return empy list for non existing matchId', async () => {
            const matchId = 111;
            const response = await request(server).get(`/news/match/${matchId}`);
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBeTruthy();
            expect(response.body.length).toBe(0);
        })

    });

    describe('GET /news/tour/:tourId', () => {
        it('should return news for the given tourId', async () => {
            const tourId = 1;
            const response = await request(server).get(`/news/tour/${tourId}`);
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });

        it('should return empy list for non existing tourId', async () => {
            const tourId = 111;
            const response = await request(server).get(`/news/match/${tourId}`);
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBeTruthy();
            expect(response.body.length).toBe(0);
        })

    });

    describe('GET /news/sport/:sportId', () => {
        it('should return news for the given sportId', async () => {
            const sportId = 1;
            const response = await request(server).get(`/news/sport/${sportId}`);
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });

        it('should return empy list for non existing sportId', async () => {
            const sportId = 111;
            const response = await request(server).get(`/news/match/${sportId}`);
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBeTruthy();
            expect(response.body.length).toBe(0);
        })

    });
});
