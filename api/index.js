var uniqid = require('uniqid');

// [[ BACK-END ]]

var Users = [];
var Games = [];

// Set variables to toplevel funktion in librarys
var express = require('express');
var socket = require('socket.io');

//App setup
var app = express();
var server = app.listen(4004, function(){
    console.log("Listning on port: 4004");
});

//Static files
app.use(express.static('public'));

//Socket setup
var io = socket(server);


// ########### Problem.. 

io.on('connection', function(socket) {
    console.log("Socket connected! ID:", socket.id);
    socket.on('saveUser', function(data) {
        saveUser(socket.id,data);
    });
    socket.on('joinGame', function(id) {
        //setUserInGame(id);
        matchPlayers(id);
    });
});

// Setup User Data
function saveUser(id, data) {
    Users.push({
        id: id,
        boats: data.boats,
        userName: data.userName,
        inGame: false
    });

    io.sockets.emit('newUser', userCount());

    console.log("User count: " + userCount());
    console.log(Users);
};

function userCount() {
    return Users.length;
}

function setUserInGame(id) {
    for(var i = 0; i < Users.length; i++) {
        if (Users[i].id === id) {
            Users[i].inGame = true;
        }
    }
}

//Find two users and start a game
function matchPlayers(userId) {
    var temp = [];
    for(var i=0; i < Users.length; i++) {
        if(Users[i].inGame === false) {
            temp.push({
                playerID: Users[i].id
            });

            if(temp.length === 2) {
                var gameId = uniqid();
                var player_1 = findUser(temp[0].playerID);
                var player_2 = findUser(temp[1].playerID);
                Games.push({
                    id: gameId,
                    player_1: player_1,
                    player_2: player_2
                });
                startGame(gameId,userId);    //    ################## sTART gAME tO eARLY (1 pLAER).. 
            }
        }
    }
}

function startGame(gameId,userId) {
    console.log('start game id ' + gameId);
    var game = findGame(gameId);

    var player_1_opponentName = game.player_2.userName;
    var player_2_opponentName = game.player_1.userName;

    var player_1 = findUser(game.player_1.id);
    var player_2 = findUser(game.player_2.id);
    
    io.to(player_1.id).emit('startGame', {opponentName:player_1_opponentName, gameId:gameId});
    io.to(player_2.id).emit('startGame', {opponentName:player_2_opponentName, gameId:gameId});
}

function findUser(id) {
    for(var i = 0; i < Users.length; i++) {
        if (Users[i].id === id) {
            return Users[i];
        }
    }
}

function findGame(id) {
    for(var i = 0; i < Games.length; i++) {
        if (Games[i].id === id) {
            return Games[i];
        }
    }
}