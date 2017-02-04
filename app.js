var george = require('./georgeinfo.json');
console.log("George")
for(var i = 0; i < 10; i++){
console.log(george.items[i].artists[0].name + " " + george.items[i].name);
}
var jack = require('./jackinfo.json')
console.log("jack")
for(var i = 0; i < 10; i++){
console.log(jack.items[i].artists[0].name + " " + jack.items[i].name);
}
