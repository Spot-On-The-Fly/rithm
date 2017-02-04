
// var jack = require('./jackinfo.json');
// for(var i = 0; i<10; i++){
// console.log(jack.items[i].album.name);
//
//
//
// var george = require('./georgeinfo.json');
// console.log("George")
// for(var i = 0; i < 10; i++){
// console.log(george.items[i].artists[0].name + " " + george.items[i].name);
//
//
// var jack = require('./jackinfo.json')
// console.log("jack")
// for(var i = 0; i < 10; i++){
// console.log(jack.items[i].artists[0].name + " " + jack.items[i].name);


//create user function
var newuser = function(idinfo, trackinfo, artistinfo){
  var tmpid = require('./' + idinfo);
  var tmptrack = require('./' + trackinfo);
  var tmpart = require('./' + artistinfo);
  //object definniton
  var tmp = new Object();
    tmp.id = tmpid.id;
    tmp.tt = tmptrack.items;
    tmp.ta = tmpart.items;

    // console.log(tmp);
    return tmp;

};
//test user details
var id = "jackid.json";
var track ="jacktrackinfo.json";
var artist = "jackartistinfo.json";
var user = {};
user[0] = new newuser(id, track, artist);
var id = "georgeid.json";
var track ="georgetrackinfo.json";
var artist = "georgeartistinfo.json";
user[1] = new newuser(id, track, artist);
//console.log(user[0].tt[0].name);
//console.log(Object.keys(user).length);
exports.user = user;
