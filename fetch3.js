/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
 

var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var client_id = '699ac9b6c8ca43e5836a932daf9dac75'; // Your client id
var client_secret = '8be380a8daf04f708c941a4d0f8eb6ad'; // Your secret
var redirect_uri = 'http://192.168.50.2:8888/callback'; // Your redirect uri

var stateKey = 'spotify_auth_state';

var app = express();

app.use(express.static(__dirname + '/public'))
.use(cookieParser());


var access_token ='BQA-VMlANGOMpR09g5nTMCTYtd5R78bpxueV08E8L5z20zge34gI8ujH8933Y2tsz7M2TDPyKf1oPp3wWsghIu2SIfyQEXAeOJY8U2AeqX6CHWr1ji7OE17mX247b_IFi9kdGQS_aLdKSTLhv4KRTQaxQaOWo1Jpv2o';


function fetch(access_token){
	var options = {
	  url: 'https://api.spotify.com/v1/me/top/artists',
	  headers: { 'Authorization': 'Bearer ' + access_token },
	  json: true
	};

	// use the access token to access the Spotify Web API
	var top_artists = request.get(options, function(error, response, body) {
		return body.items
	});

	var options = {
	  url: 'https://api.spotify.com/v1/me/top/tracks',
	  headers: { 'Authorization': 'Bearer ' + access_token },
	  json: true
	};

	// use the access token to access the Spotify Web API
	var top_tracks = request.get(options, function(error, response, body) {
		return body.items
	});
	return [top_artists, top_tracks]
}


console.log(fetch(access_token))


