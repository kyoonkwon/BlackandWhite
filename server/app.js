var env = require('./env');
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

http.listen(env.port, function(){
  console.log('listening');
});

/*
socket protocol
|- sender info(server/user1/user2)
|- room code
|- description
|- game info
    |- turn
    |- round
    |- user1
        |- socketid
        |- black, white, score
    |- user2
*/

class BWprotocol{

  constructor(senderInfo, roomID, description="", gameInfo){
    this.senderInfo = senderInfo;
    this.roomID = roomID;
    this.description = description;
    this.gameInfo = gameInfo;
  }
}

printStatus = (data) =>{
  console.log(`${data.senderInfo}(${data.roomID}) ${data.description}\n${JSON.stringify(data.gameInfo)}\n`)
}

// Making Connection
io.on('connection', function(socket){
  console.log(socket.id+"\tconnected!");

  // Create Room
  socket.on('createGame', function(data){
    var roomID = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    printStatus(data);
    socket.join(roomID);
    socket.emit('newGame', new BWprotocol("server", roomID, "server create room", {}));
  });

  // Join Room
  socket.on('joinGame', function(data){
    printStatus(data)
    var room = io.nsps['/'].adapter.rooms[data.roomID];

    if( room && room.length === 1){
      socket.join(data.roomID);
      socket.broadcast.to(data.roomID).emit('user1 ok', new BWprotocol("server", data.roomID, "(To user1) user2 joined the room", {user2:{socketID: socket.id}}));
    }
    else if(room && room.length >=2){
      console.log("wrong room1")
      socket.emit('err', new BWprotocol("server", data.roomID, '방이 다 찼습니다.', {errcode:0}));
    }
    else{
      console.log("wrong room2")
      socket.emit('err', new BWprotocol("server", data.roomID, '잘못된 방 코드입니다.', {errcode:1}));
    }
  });

  // User1 notifies user2 entered game
  socket.on("joinComplete", function(data){
    printStatus(data);
    socket.broadcast.to(data.roomID).emit('user2 ok', new BWprotocol("server", data.roomID, "user2 joined game", data.gameInfo));
  })

  socket.on("gameStart", (data)=>{
    printStatus(data);
    var turn = Math.round(Math.random()) + 1;
    var send = data
    var userInit = {
      black:5,
      white:4,
      score:0,
      submit: -1,
    }
    
    send.description = "game init"
    send.senderInfo = "server";
    send.gameInfo.turn = turn;
    send.gameInfo.round = 1;
    send.gameInfo.left = 0;
    send.gameInfo.user1 = {
      ...userInit
    }
    send.gameInfo.user2 = {
      ...userInit
    }
    


    socket.emit("first turn", send);
    socket.broadcast.to(send.roomID).emit("first turn", send);
  })

  // Change Turn
  socket.on('turnEnd', function(data){
    printStatus(data);

    var send = data
    send.gameInfo.left += 1
    send.senderInfo = "server"

    if(data.gameInfo.left === 1){
      send.description = "1 turn end"
      send.gameInfo.turn = Number(!(data.gameInfo.turn - 1)) + 1
      socket.broadcast.to(data.roomID).emit("second turn", send)
    }

    if(data.gameInfo.left === 2){
      send.description = "2 turn end"
      socket.broadcast.to(data.roomID).emit("third turn", send)
    }

    if(data.gameInfo.left === 3){
      send.description = "3 turn end"
      send.gameInfo.turn = Number(!(data.gameInfo.turn - 1)) + 1
      send.gameInfo.left = 0
      
      
      var block1 = data.gameInfo.user1.submit
      var block2 = data.gameInfo.user2.submit

      if(block1 > block2){
        send.gameInfo.user1.score += 1
        send.gameInfo.turn = 1
        send.gameInfo.lastWin = 1
      }
      else if (block2 > block1){
        send.gameInfo.user2.score += 1
        send.gameInfo.turn = 2
        send.gameInfo.lastWin = 2
      }else{
        send.gameInfo.lastWin = 0
      }

      socket.emit("check result", send)
      socket.broadcast.to(data.roomID).emit("check result", send)


      setTimeout(()=>{
        send.gameInfo.round += 1;
        send.gameInfo.lastWin = -1
        send.gameInfo.user1.submit = -1
        send.gameInfo.user2.submit = -1

        if(send.gameInfo.round === 10) {
          var score1 = send.gameInfo.user1.score
          var score2 = send.gameInfo.user2.score

          if(score1 > score2) send.gameInfo.winner = "user1"
          else if(score2 > score1) send.gameInfo.winner = "user2"
          else send.gameInfo.winner = "draw"

          socket.emit("game end", send)
          socket.broadcast.to(data.roomID).emit("game end", send)
        }
        else{
          socket.emit("first turn", send)
          socket.broadcast.to(data.roomID).emit("first turn", send)
        }
      }, 2000)
      
    }
  });

  socket.on("discon", () =>{
      socket.disconnect();
  })

});