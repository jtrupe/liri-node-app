require("dotenv").config();

var axios = require("axios");
var fs = require('fs');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var choice = function (arg2, arg3) {
    switch (arg2) {
        case "concert-this":
            concertThis(arg3);
            return;
        case "spotify-this-song":
            spotifiyThis(arg3)
            return;
        case "movie-this":
            movieThis(arg3);
            return;
        case "do-what-it-says":
            doThis(arg3);
            return;
    }
}

const spotifiyThis = function (song) {
    spotify.search({ type: "track", query: song }, function (err, data) {
        if (err) throw err;
        for (var i = 0; i < data.tracks.items.length; i++) {
            var songData = data.tracks.items[i];
            console.log("Title: " + songData.name);
            console.log("Artist: " + songData.artists[0].name);
            console.log("Album: " + songData.album.name);
            console.log("Preview: " + songData.preview_url);
            console.log("---------------------------------------");
        }
        console.log(keys.spotify.id);
        console.log(keys.spotify.secret);
    });
}

const concertThis = function (artist) {
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp" ;
    axios.get(queryURL).then(
        function(response){
            var concertData = response.data ;
            console.log(concertData);
            // console.log(response);
            // console.log(response.data.venue[name]);
            // console.log(response);
            // console.log(response);
        });
}

const movieThis = function (film) {
    var queryURL = "http://www.omdbapi.com/?t=" + film + "&y=&plot=short&apikey=trilogy";
    axios.get(queryURL).then(
        function(response){
            console.log("---------------------------------------------------------------------------");
            console.log("Title: " + response.data.Title);
            console.log("Release: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            // var movieRatings = resposne.data.Ratings ;
            // console.log("Rotten Tomatoes: " + movieRatings);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Cast: " + response.data.Actors);
            console.log("---------------------------------------------------------------------------");
        });
}
const doThis = function (thing) {
 fs.readFile('random.txt' , 'utf-8', function(err, data){
     if(err) throw err;
     console.log(data);
     var doThisArr = data.split(',');
     choice(doThisArr[0], doThisArr[1]);
 })
} 

choice(process.argv[2], process.argv[3]);
