var george = require('./georgeinfo.json');
for(var i = 0; i < 10; i++){
console.log(george.items[i].artists[0].name + " " + george.items[i].name);
}
// var user = new object{
//   username : 'username';
//   date : new Date();
//
// }
// var jack = new user('TrebleStick');
//
//
// console.log(jack.username jack.date);
