var spotifyAPI = require('spotify-web-api-node');

var spot = new spotifyAPI();

var users = require('./newuser.js');

var artlist = [];
var artrep = [];
var playlist = [];
var genres = [];
var artists = [];
var songs = [];
var repArt = [];
//empty arrays to hole the artist list
var itemadd = function(list, item, user){
    var add = false;
    //used to see if the id has been added to a repeated item
    for(var i = 0; i < list.length; i++){
        if(list[i].info.id == item.id){
            //if the user has the same item add their user id to the array of the user ids
            add = true;
            list[i].ids.push(user);
            //pusing the id into the array of ids
        }
    }
    if(!add){
        var tmp = new Object();
        tmp.ids = [user];
        //create a new entry for the item in the list and adds the user id to an array
        tmp.info = item;
        //adds the item information
        list.push(tmp);
        //pushes the new value into the array of songs or artists
    }
    return list;
    //returns the new list
};

var genrelist = function(artgen, genlength, gen){

    for(var i = 0; i < artgen.length; i++){
        var add = true;
        for(var j = 0 ; j < gen.length; j++){
            if(gen[j] == artgen[i]){
                //if the genre is repeated between songs, increase the weighting of this genre relative to the id numbers of this genre
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

var randomsong = function(list, played){
    var found = true;
    while(found){
        found = false;
        var number = Math.floor(Math.random()*list.length);
        for(var i = 0; i < played.length; i++){
            if(list[number].info.name == played[i].name){
                found = true;
            }
        }
    }
    var tmp = new Object();
    tmp.name = list[number].info.name;
    played.push(tmp);
    return played;
}

var artistpick = function(list, played){
    var most = 0;
    var artist = "";
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
                artist = list[i].info.name;
            }
        }
    }
    var tmp = new Object();
    tmp.name = artist;
    played.push(tmp);
    return played;
}


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

for(var i=0; i<artists.length; i++){
    genres = genrelist(artists[i].info.genres, artists[i].ids.length, genres);
    if(artists[i].ids.length > 1){
        var tmp = new Object();
        tmp.info = artists[i].info;
        artrep.push(tmp);

    }
}

// for(var i = 0; i<songs.length/2; i++){
//     playlist = randomsong(songs, playlist);
//     playlist = songpick(songs, playlist);
// }
//
// for(var i = 0; i< playlist.length; i++){
//     console.log([i+1] + " " + playlist[i].name);
// }

for(var i = 0; i < artrep.length; i++){
    console.log(artrep[i].info.name);
    spot.getArtistTopTracks(artrep[i].info.id, 'GB').then(function(data){
        console.log(data.body);
    });
}
