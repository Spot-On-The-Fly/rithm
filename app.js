var users = require('./newuser.js');

//song object structure

//create initial object
var common = function(user1, trackinfo){
    //object definniton
    var idarray = {}
    var u1add = true;
    for(var i = 0; i<idarray.length; i++){
        if(user1 == idarray[i]){
            u1add = false;
        }
      }
  if(u1add){
      idarray.append(user1);
  }
  var tmp = new Object();
    tmp.ids = idarray;
    tmp.info = trackinfo
    return tmp;
};

for(var i=0; i<Object.keys(users.user).length; i++){
    //console.log(users.user[i].id);

    //item
    for(var j=0; j<Object.keys(users.user[i].ta).length; j++){
        //console.log(users.user[i].ta[j].id);
        songs = new song(users.user[i].id,users.user[i].ta[j].id);
        //uservs user
        for(var k=i+1/*dont check previous users*/; k<Object.keys(users.user).length; k++){
            //console.log(users.user[k].id);
            //song vs song
            for(var l=0; l<Object.keys(users.user[k].ta).length; l++){
                if(users.user[i].ta[j].id == users.user[k].ta[l].id){
                    console.log('Mutual artist between: ' + users.user[i].id + " & " + users.user[k].id + " " + users.user[i].ta[j].name);

                    for(var i = 0; i<songs.id.length; i++){
                        if(users.user[k].id == songs.id[i]){

                        }

                }
            }
        }
    }
}
for(var i=0; i<Object.keys(users.user).length; i++){
    //console.log(users.user[i].id);
    //item
    for(var j=0; j<Object.keys(users.user[i].tt).length; j++){
        //console.log(users.user[i].ta[j].id);
        //uservs user
        for(var k=i+1/*dont check previous users*/; k<Object.keys(users.user).length; k++){
            //console.log(users.user[k].id);
            //song vs song
            for(var l=0; l<Object.keys(users.user[k].tt).length; l++){
                if(users.user[i].tt[j].id == users.user[k].tt[l].id){
                    console.log('Mutual songs between: ' + users.user[i].id + " & " + users.user[k].id + " " + users.user[i].tt[j].name);
                }
            }
        }
    }
}
