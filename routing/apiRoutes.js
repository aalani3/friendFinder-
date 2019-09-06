var path = require("path");
var friends = require("../data/friends.js");

module.exports = function (app) {

    // list friends 
    app.get("/api/friends", function (request, response) {
        response.json(friends);
    });

    // add new friend to /api/friends ... takes in JSON input
    app.post("/api/friends", function (request, response) {
        friends.push(request.body);
        response.json(true);
        // get match
        var newUserScores = request.body.scores;
        var bestMatch = 0;
        var scoresArray = [];
        //run through friends  array
        for (var i = 0; i < friends.length; i++) {
            var scoresDifference = 0;
            for (var j = 0; j < newUserScores.length; j++) {
                scoresDifference += (Math.abs(parseInt(friends[i].scores[j] - parseInt(newUserScores[j]))));

            }
            scoresArray.push(scoresDifference);
            console.log(scoresArray);
        }

        for (var i = 0; i < scoresArray.length; i++) {
            if (scoresArray[i] <= scoresArray[bestMatch]) {
                bestMatch = i;
            }
            var bestFriendMatch = friends[bestMatch];
            response.json(bestFriendMatch);
        }
    });
}