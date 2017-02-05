var rithm = function(users, buffer){


var express = require('express');
var app = express();
var fs = require('jsonfile')

var spotifyAPI = require('spotify-web-api-node');
var spot = new spotifyAPI();
// var users = require('./newuser.js');

while(!found){

    var artlist = [];
    var artrep = [];
    var playlist = [];
    var genres = [];
    var artists = [];
    var songs = [];
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
        for(var k=0; k<Object.keys(users.user[i].tt).length; k++){
            songs = itemadd(songs, users.user[i].tt[k], users.user[i].id);
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

    if (typeof localStorage === "undefined" || localStorage === null) {
      var LocalStorage = require('node-localstorage').LocalStorage;
      localStorage = new LocalStorage('./scratch');
    }

    var repArt = [];
    var toptracks = [];
    for(var i = 0; i < artrep.length; i++){
        spot.getArtistTopTracks(artrep[i].info.id, 'GB').then(function(data){

            // fs.writeFile('test.json', json);
            // var tmpid = require('./test.json');
            // toptracks.push(tmpid);
            var string = data.body.tracks;
            localStorage.setItem('test.json', JSON.stringify(string));
        });
    }

    var fetch = JSON.parse(localStorage.getItem('test.json'));
    // for(var i = 0; i < fetch.length; i++){
    //
    //     console.log([i+1] + " " + fetch[i].name);
    // }


    for(var i = 0; i< Math.floor(songs.length/8); i++){
        playlist = randomsong(songs, playlist);
        playlist = songpick(songs, playlist);
    }

    // for(var i = 0; i< playlist.length; i++){
    //     console.log([i+1] + " " + playlist[i].name);
    // }
    // console.log(' ');

    var full = fetch.concat(playlist);

    for(var i = 0; i< full.length; i++){
        console.log([i+1] + " " + full[i].name);
    }
    //return full as the array with the songs in it


    // for(var i = 0; i < Math.floor(artrep.length*0.01) ; i++){
    //     spot.getArtistRelatedArtists(artrep[i].info.id).then(function(data){
    //
    //         // fs.writeFile('test.json', json);
    //         // var tmpid = require('./test.json');
    //         // toptracks.push(tmpid);
    //         var stringy = data.body.artists;
    //         localStorage.setItem('two.json', JSON.stringify(stringy));
    //     });
    // }
    //
    // var rel = JSON.parse(localStorage.getItem('two.json'));
    // // console.log(rel);
    // for(var i = 0; i < Object.keys(rel).length; i++){
    //
    //     console.log([i+1] + " " + rel[i].id);
    //     console.log([i+1] + " " + rel[i].name);
    // }

    // for(var i = 10; i >0 ; i--){
    //     spot.getArtistTopTracks(rel[i].id, 'GB').then(function(data){
    //
    //         // fs.writeFile('test.json', json);
    //         // var tmpid = require('./test.json');
    //         // toptracks.push(tmpid);
    //         var stringyer = data.body.tracks;
    //         localStorage.setItem('three.json', JSON.stringify(stringyer));
    //     });
    // }
    //
    // var reltrack = JSON.parse(localStorage.getItem('three.json'));
    //
    // for(var i = 0; i < reltrack.length; i++){
    //
    //     console.log([i+1] + " " + reltrack[i].id);
    //     console.log([i+1] + " " + reltrack[i].name);
    // }


    var rand = Math.random();
    console.log(rand);
    index = Math.floor(rand*full.length);
    console.log(index);

    output = full[index];
    found = true;
    for(var i = 0; i < buffer.size; i++){
        if(buffer[i] == output){
            found = false;
        }
    }
}

return output;
return buffer;

}
