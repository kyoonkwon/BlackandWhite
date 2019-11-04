/*
socket protocol
|- sender info(server/user1/user2)
|- room code
|- description
|- game info
    |- turn
    |- user1
        |- socketID
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

// user 1
export const createGame = (game, socket) => {
    var send = new BWprotocol("user1", "", "user1 create game room", {})
    socket.emit('createGame', send);
}

// user 1
export const newGame = (game, socket) => {
    socket.on("newGame", data => {
        game.setState({roomID:data.roomID})
    })
}

// user 2
export const joinGame = (socket, roomID) => {
    socket.emit('joinGame', new BWprotocol("user2", roomID, "user2 join the game -" + roomID, {}));
}

export const user1 = (game, socket) => {
    socket.on("user1 ok", data => {

        var gameInfo = data.gameInfo
        gameInfo.user1 = {socketID : socket.id}

        socket.emit("joinComplete", new BWprotocol("user1", data.roomID, "user1 notifies user2", gameInfo))
    })
}

export const user2 = (socket) => {
    socket.on("user2 ok", data => {
        socket.emit("gameStart", new BWprotocol("user2", data.roomID, "user1 notifies user2", data.gameInfo));
    })
}

export const firstTurn = (game, socket) => {
    socket.on("first turn", data=>{
        var user = game.state.user
        if(user.user === "user" + data.gameInfo.turn){
            user.currentTurn = true;
        }
        else{
            user.currentTurn = false;
        }

        game.setState({user:user, gameInfo:data.gameInfo, myblock:-1})
    })
}

export const submitBlock = (socket, myblock, gameInfo, user, roomID) => {
    
    var info = gameInfo

    info[user.user].submit = Number(myblock)
    var bcolor = myblock % 2 === 0 ? "black" : "white"
    info[user.user][bcolor] -= 1

    socket.emit("turnEnd", new BWprotocol(user.user, roomID, "turn end", info))
}

export const secondTurn = (game, socket) => {
    
    socket.on("second turn", data => {
        var user = game.state.user;
        if(user.user === "user" + data.gameInfo.turn){
            user.currentTurn = true;
        }
        else{
            user.currentTurn = false;
        }
        game.setState({user:user, gameInfo:data.gameInfo})
    })
}

export const thirdTurn = (game, socket) => {
    
    socket.on("third turn", data => {
        var user = game.state.user;
        var send = data
        send.senderInfo = user.user
        send.description = "round end"
        socket.emit("turnEnd", send)
        game.setState({gameInfo:data.gameInfo});
    })
}

export const checkResult = (game, socket) => {
    socket.on("check result", data => {
        game.setState({gameInfo:data.gameInfo})
    })
}

export const gameEnd = (game, socket) => {
    socket.on("game end", data => {
        game.setState({winner:data.gameInfo.winner})
        socket.emit("discon", {})
    })
}

export const error = (socket) => {
    socket.on("err", data => {
        if(data.gameInfo.errcode === 0 || data.gameInfo.errcode === 1){
            document.getElementsByClassName("gameWindow")[0].innerHTML = "<h1>"+data.description+"<br />새로고침 해주세요.</h1>";
        }

    })


}

