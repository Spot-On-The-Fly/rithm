if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}
var spotifyAPI = require('spotify-web-api-node');
var spotifyApi = new spotifyAPI();

var request = require('request');
var request = new request();
var access_token ='BQA-VMlANGOMpR09g5nTMCTYtd5R78bpxueV08E8L5z20zge34gI8ujH8933Y2tsz7M2TDPyKf1oPp3wWsghIu2SIfyQEXAeOJY8U2AeqX6CHWr1ji7OE17mX247b_IFi9kdGQS_aLdKSTLhv4KRTQaxQaOWo1Jpv2o';

spotifyApi.getUser(access_token).then(function(data) {
    console.log('USER INFO', data.body);
}, function(err) {
    console.log('Something went wrong!', err);
});

var options = {
    url: 'https://api.spotify.com/v1/me/top/artists',
    headers: { 'Authorization': 'Bearer ' + access_token },
    json: true
};

// use the access token to access the Spotify Web API
request.get(options, function(error, response, body) {
    var top_tracks = body.items
    localStorage.setItem('yopartists.json', JSON.stringify(top_tracks));

    ;
});
var options = {
    url: 'https://api.spotify.com/v1/me/top/tracks',
    headers: { 'Authorization': 'Bearer ' + access_token },
    json: true
};

// use the access token to access the Spotify Web API
request.get(options, function(error, response, body) {
    var top_tracks = body.items
    localStorage.setItem('toptracks.json', JSON.stringify(top_tracks));

    ;
});
