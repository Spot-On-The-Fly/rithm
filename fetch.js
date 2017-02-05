var spotifyAPI = require('spotify-web-api-node');

var spotifyApi = new spotifyAPI();

var trackcount = 20;
var artistcount = 10;
//get user id
spotifyApi.getUser('BQA-VMlANGOMpR09g5nTMCTYtd5R78bpxueV08E8L5z20zge34gI8ujH8933Y2tsz7M2TDPyKf1oPp3wWsghIu2SIfyQEXAeOJY8U2AeqX6CHWr1ji7OE17mX247b_IFi9kdGQS_aLdKSTLhv4KRTQaxQaOWo1Jpv2o').then(function(data) {
    console.log('USER INFO', data.body);
  }, function(err) {
    console.log('Something went wrong!', err);
  });

//get top tracks
spotifyApi.getMyTopTracks('tracks', 'BQA-VMlANGOMpR09g5nTMCTYtd5R78bpxueV08E8L5z20zge34gI8ujH8933Y2tsz7M2TDPyKf1oPp3wWsghIu2SIfyQEXAeOJY8U2AeqX6CHWr1ji7OE17mX247b_IFi9kdGQS_aLdKSTLhv4KRTQaxQaOWo1Jpv2o', trackcount, 0, 'medium_term', 'GB').then(function(data) {
        console.log('TOP TRACKS', data.body);
        }, function(err) {
            console.log('Something went wrong!', err);
        });

//get top artists
spotifyApi.getMyTopArtists('artists', 'BQA-VMlANGOMpR09g5nTMCTYtd5R78bpxueV08E8L5z20zge34gI8ujH8933Y2tsz7M2TDPyKf1oPp3wWsghIu2SIfyQEXAeOJY8U2AeqX6CHWr1ji7OE17mX247b_IFi9kdGQS_aLdKSTLhv4KRTQaxQaOWo1Jpv2o', artistcount, 0, 'medium_term', 'GB').then(function(data) {
        console.log('TOP TRACKS', data.body);
        }, function(err) {
            console.log('Something went wrong!', err);
        });
