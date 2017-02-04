var users = require('./newuser.js');

var itemadd = function(list, track, user){
  var add = false;
      for(var i = 0; i < list.length; i++){
          if(list[i].info.id == track.id){
              add = true;
              list[i].ids.push(user);
          }
      }
      if(!add){
          var tmp = new Object();
          tmp.ids = [user];
          tmp.info = track;
          //console.log(tmp);
          list.push(tmp);
      }
      return list;
  };


var artists = [];
var songs = [];


for(var i=0; i<Object.keys(users.user).length; i++){

    for(var j=0; j<Object.keys(users.user[i].ta).length; j++){
         artists = itemadd(artists, users.user[i].ta[j], users.user[i].id);
    }
}

for(var i=0; i<Object.keys(users.user).length; i++){

    for(var j=0; j<Object.keys(users.user[i].tt).length; j++){
         songs = itemadd(songs, users.user[i].tt[j], users.user[i].id);
    }
}
// console.log("Artists")
// for(var i = 0; i < artists.length; i++){
//     if(artists[i].ids.length > 1){
//         console.log(artists[i].ids.length + " " + artists[i].info.name)
//     }
// }
// console.log("Songs")
// for(var i = 0; i < songs.length; i++){
//     if(songs[i].ids.length > 1){
//         console.log(songs[i].ids.length + " " + songs[i].info.name)
//     }
// }
// for(var i=0; i<artists.length; i++){
//     console.log(artists[i].info.genres);
// }

var genrelist = function(artgen, genlength, gen){

    for(var i = 0; i < artgen.length; i++){
        var add = true;
        for(var j = 0 ; j < gen.length; j++){
            if(gen[j] == artgen[i]){
                add = false;
                gen[i].weight += genlength;
            }
        }
        if(add){
            var tmp = new Object();
                tmp.weight = genlength;
                tmp.gen = artgen[i];
                gen.push(tmp);
        }
    }
    return gen;
}
var genres = [];
for(var i=0; i<artists.length; i++){
    genres = genrelist(artists[i].info.genres, artists[i].ids.length, genres);
}
// for(var i = 0; i < genres.length; i++){
//     if(genres[i].weight>1){
//         console.log(genres[i].gen);
//     }
// }
var songpick = function(list, played){
    var most = 0;
    var track = "";
    for(var i = 0; i < list.length; i++){
        var found = false;
            if(list[i].ids.length>most){
                for(var j = 0; j < played.length; j++){
                    if(list[i].info.name == played[j].name){
                        found = true;
                    }
                }
                if(!found){
                    most = list[i].ids.length;
                    track = list[i].info.name;
                }
            }
    }
    var tmp = new Object();
        tmp.name = track;
        played.push(tmp);
        return played;
}
var playlist = [];
for(var i = 0; i<songs.length; i++){
    playlist = songpick(songs, playlist);
}
for(var i = 0; i< playlist.length; i++){
    console.log([i+1] + " " + playlist[i].name);
}
