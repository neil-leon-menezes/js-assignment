# js-assignment
````
instructions.txt has the instructions to run the service
guidelines.txt has the guidelines to be followed while solving and submitting the assignment
problem-statement.txt has the problems statements to be solved
````

````
Problem 1:
Endpoint /tour/matches returns all the matches for a given tour name.
The endpoint latency increases linearly with the number of tours. Modify the endpoint to increase the performance.

Solution:
Index the name field in db for tours table.
Assuming MySQL uses a B-Tree like data structure, now a lookup for name in tours table will be O(log(n)) where n is the number of tours. The trade off here is insertions will be slower (also O(log(n))) but given that for any significant user base, the number of lookups is going to greatly outweigh the addition of a new tour, this should be an easy tradeoff.
````

````
Problem 2
Modify the endpoint /sport/tour/match to also return match's id, startTime and format

Solution:
Added the required fields in model query and controller logic.
````

````
Problem 3
Requirement: News Support for Matches and Tours
Functional Requirements:
    1. News can be created for a match or a tour.
    2. Each news created for a match also belongs to the corresponding tour.
    3. Each news created for a tour also belongs to the corresponding sport.
Technical Requirements:
    1. Create an endpoint to create news.
    2. Create an endpoint to fetch news by match id
    3. Create an endpoint to fetch news by tour id
    4. Create an endpoint to fetch news by sport id
News Model
{
    title: string,
    description: string
}

Solution:
Added news table to the db and various layers - route, controller and model. Also added some validations as required. Added test cases as well. I've added an Insomnia collection 'js-app.json' to project root for example usage.
````