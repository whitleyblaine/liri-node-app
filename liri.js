console.log("Welcome to Liri!");

var Twitter = require('twitter');
var keys = require('./keys.js');
var command = process.argv[2];

var T = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});

if (command == "my-tweets") {
  T.get('statuses/user_timeline', {count: 10}, function(error, tweets, response){
    if(error) throw error;
    for (var i = 0; i < tweets.length; i++) {
      console.log("Date Added: " + tweets[i].created_at);
      console.log("Tweet: " + tweets[i].text + '\n');
    }
  });
}



