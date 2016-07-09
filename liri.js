console.log("Welcome to Liri!");

var Twitter = require('twitter');
var keys = require('./keys.js');
var argv2 = process.argv[2];
var argv3 = process.argv[3];

var T = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});

if (argv2 == "my-tweets") {
  T.get('statuses/user_timeline', {count: 10}, function(error, tweets, response){
    if(error) throw error;
    for (var i = 0; i < tweets.length; i++) {
      console.log("Date Added: " + tweets[i].created_at);
      console.log("Tweet: " + tweets[i].text + '\n');
    }
  });
}


var spotify = require('spotify');

if (argv2 == 'spotify-this-song') {
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

if (argv2 == 'movie-this') {
  
}


