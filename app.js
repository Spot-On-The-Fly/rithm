
var jack = require('./jackinfo.json');
for(var i = 0; i<10; i++){
console.log(jack.items[i].album.name);

var george = require('./georgeinfo.json');
for(var i = 0; i < 10; i++){
console.log(george.items[i].artists[0].name + " " + george.items[i].name);
