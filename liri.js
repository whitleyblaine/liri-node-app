console.log("Welcome to Liri!");

var Twitter = require('twitter');
var keys = require('./keys.js');
var argv2 = process.argv[2];
var argv3 = process.argv[3];

var fs = require('fs');
var request = require('request');
var spotify = require('spotify');

var T = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});

var randomTextFunction = function() {
  fs.readFile('random.txt', 'utf8', (err, data) => {
  if (err)
    throw err;
  else
    var splitText = data.split(',');
    argv2 = splitText[0];
    argv3 = splitText[1];
    if (argv2 == 'do-what-it-says') {
      randomTextFunction();
    } else if (argv2 == 'spotify-this-song') {
      spotifyFunction();
    } else if (argv2 == 'movie-this') {
      movieFunction();
    } else if (argv2 == "my-tweets") {
      twitterFunction();
    };
  });
}

var twitterFunction = function() {
  T.get('statuses/user_timeline', {count: 10}, function(error, tweets, response){
    if(error) throw error;
    for (var i = 0; i < tweets.length; i++) {
      console.log("Date Added: " + tweets[i].created_at);
      console.log("Tweet: " + tweets[i].text + '\n');
    }
  });
}


var spotifyFunction = function() {
  if (!argv3) {
    argv3 = 'what\'s my age again?';
  };
  spotify.search({ type: 'track', query: argv3 }, function(err, data) {
    if ( err ) {
      console.log('Error occurred: ' + err);
      return;
    } else {
      console.log('Artist: ' + data.tracks.items[0].artists[0].name);
      console.log('Song Name: ' + data.tracks.items[0].name);
      console.log('Album: ' + data.tracks.items[0].album.name);
      console.log('Preview Link: ' + data.tracks.items[0].preview_url );
    }
  });
}

var movieFunction = function() {
  if (argv3 == undefined) {argv3 = "Mr. Nobody"};
  var query_url = 'http://www.omdbapi.com/?t=' + argv3 + '&y=&plot=short&r=json';
  request(query_url, function (error, response, body) {
    if (!error) {
      console.log("Title: " + JSON.parse(body).Title +
      "\nYear: " + JSON.parse(body).Year +
      "\nIMDB Rating: " + JSON.parse(body).imdbRating +
      "\nCountry: " + JSON.parse(body).Country +
      "\nLanguage: " + JSON.parse(body).Language +
      "\nPlot: " + JSON.parse(body).Plot +
      "\nActors: " + JSON.parse(body).Actors +
      "\nMetascore: " + JSON.parse(body).Metascore +
      "\nCountry: " + JSON.parse(body).Country
      );
    }
  })
}

if (argv2 == 'do-what-it-says') {
  randomTextFunction();
}

if (argv2 == 'spotify-this-song') {
  spotifyFunction();
}

if (argv2 == 'movie-this') {
  movieFunction();
}

if (argv2 == "my-tweets") {
  twitterFunction();
}