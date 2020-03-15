import React from 'react';
import GameBoard from './GameBoard';
import OpponentBoard from './OpponentBoard';
import UserBoard from './UserBoard';
import User from './User';
import * as protocol from "./protocol";

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import socketIOClient from "socket.io-client";

import {endpoint} from './env'

class BlackAndWhite extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            socket : socketIOClient(endpoint),
            roomID : "",
            user: null,
            gameInfo: null,
            result: 0,  
        }
    }

    createGame = () =>{
        
        protocol.createGame(this, this.state.socket)
        var user = new User("user1");
        this.setState({user});
    }

    JoinGame = () => {

        var roomID = this.state.roomID
        if(!roomID){
            alert('방 코드를 입력해주세요!');
            return;
        }
        protocol.joinGame(this.state.socket, roomID)
        var user = new User("user2");
        this.setState({user});
    }


    handleChange = (e) => {

        var s = {}
        s[e.target.name] = e.target.value
    
        this.setState(s)
    }

    propsChangeHandler = (content) => {

        if(content.myblockDecided){
            var {user} = this.state

            protocol.submitBlock(this.state.socket, this.state.myblock, this.state.gameInfo, this.state.user, this.state.roomID)
            user.blocks[this.state.myblock] = false
            user.currentTurn = false

            this.setState({user})
        }
        else{
            this.setState(content)
        }
    }

    componentDidMount(){
        protocol.newGame(this, this.state.socket);

        protocol.user1(this, this.state.socket);
        protocol.user2(this.state.socket);
        protocol.firstTurn(this, this.state.socket);
        protocol.secondTurn(this, this.state.socket);
        protocol.thirdTurn(this, this.state.socket);
        protocol.checkResult(this, this.state.socket);
        protocol.gameEnd(this, this.state.socket);

        protocol.error(this.state.socket);
    }

   
    render(){

        var {user} = this.state;

        
        return(
            <React.Fragment>
                {user ? 
                
                this.state.winner ? this.state.winner === 'draw' ? <h1>무승부</h1> : 
                this.state.winner === user.user ? <h1>승리</h1> : <h1>패배</h1>:

                <Grid className="gameWindow" style={{height:"85%", overflow:"hidden", maxWidth:"320px", margin:"0 auto"}}>
                    <OpponentBoard socket={this.state.socket} gameInfo={this.state.gameInfo} user={this.state.user}/>
                    <Divider variant="middle" />
                    <GameBoard socket={this.state.socket} user={this.state.user} roomID={this.state.roomID} gameInfo={this.state.gameInfo} myblock={this.state.myblock}/>
                    <Divider variant="middle" />
                    <UserBoard user={user} onPropsChange={this.propsChangeHandler}/>
                </Grid>:
                    <div className="container">
                        <div className="menu">
                            <h1>흑 과 백</h1>
                            <div><a href="https://namu.wiki/w/%EB%8D%94%20%EC%A7%80%EB%8B%88%EC%96%B4%EC%8A%A4:%EB%A3%B0%20%EB%B8%8C%EB%A0%88%EC%9D%B4%EC%BB%A4/11%ED%99%94#s-2"
                                    target="_blank" rel="noopener noreferrer">rule</a></div>
                            <h4>방 만들기</h4>
                            <button id="new" onClick={this.createGame}>New Game</button>
                            <br /><br />
                            <h4>방 입장</h4>
                            <input type="text" name="roomID" id="roomID" placeholder="방 코드를 입력해주세요" required value={this.state.roomID} onChange={this.handleChange}/>
                            <button id="join" onClick={this.JoinGame}>Join Game</button>
                        </div>
                    </div>}
            </React.Fragment>
        )
    }
    
}

export default BlackAndWhite;