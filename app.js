var users = require('./newuser.js');

//song object structure
// var newsong = function(userinfo/*array*/, trackinfo, count){
//   //object definniton
//   var tmp = new Object();
//     tmp.ids = userinfo
//     tmp.artist = trackinfo.
//
//     // console.log(tmp);
//     return tmp;
//
// };


//user
for(var i=0; i<Object.keys(users.user).length; i++){
    //console.log(users.user[i].id);
    //item
    for(var j=0; j<Object.keys(users.user[i].ta).length; j++){
        //console.log(users.user[i].ta[j].id);
        //uservs user
        for(var k=i+1/*dont check previous users*/; k<Object.keys(users.user).length; k++){
            //console.log(users.user[k].id);
            //song vs song
            for(var l=0; l<Object.keys(users.user[k].ta).length; l++){
                if(users.user[i].ta[j].id == users.user[k].ta[l].id){
                    console.log('Mutual artist between: ' + users.user[i].id + " & " + users.user[k].id + " " + users.user[i].ta[j].name);
                }
            }
        }
    }
}
