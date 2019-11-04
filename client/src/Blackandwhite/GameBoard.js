import React from 'react';
import Grid from '@material-ui/core/Grid';

class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            ...props,
            round : 1,
        }
    }

    render(){
        // <img src={require('./image/black.png')} alt="black" style={{height:"100%"}}/>


        return(
            <React.Fragment>
                <Grid style={{height:"15%"}} container direction="row" justify="center" alignItems="stretch">
                    <Grid item xs={4} style={{height:"100%"}}>
                        {this.props.gameInfo &&
                            this.props.gameInfo[this.props.user.opp].submit > -1 ? <img src={require(`./image/${this.props.gameInfo[this.props.user.opp].submit % 2 ? "white" : "black"}.png`)} alt="oppblock" style={{height:"100%"}}/> : <></>} 
                    </Grid>
                    <Grid item xs={3}>
                        <Grid className="turn" style={{height:"40%"}} container direction="row" justify="center" alignItems="stretch">
                            {this.props.gameInfo && this.props.gameInfo.round > 0 ? `Round ${this.props.gameInfo.round}` : "Code"}
                        </Grid>
                        <Grid className="room" style={{height:"60%"}} container direction="row" justify="center" alignItems="stretch">
                            
                            <b>{this.props.gameInfo && this.props.gameInfo.lastWin > -1 ? 
                                "user" + this.props.gameInfo.lastWin.toString() === this.props.user.user ? "<" : 
                                this.props.gameInfo.lastWin === 0 ? "==" : ">" 
                                : this.props.gameInfo &&  this.props.gameInfo.round > 0 ? this.props.user.currentTurn ? 
                                "내 차례" : "상대 차례" : this.props.roomID}</b>
                        </Grid>
                    </Grid>
                    <Grid item xs={4} style={{height:"100%"}}>
                        {this.props.myblock && this.props.myblock > -1 ? <img src={require(`./image/${this.props.myblock}.png`)} alt="myblock" style={{height:"100%"}}/> : <span></span>} 
                    </Grid>
                </Grid>
                <Grid style={{height:"5%"}} container direction="row" justify="center" alignItems="stretch">
                    <Grid item xs={4} className="opponent"> 상대 </Grid>
                    
                    <Grid item xs={3}> {this.props.gameInfo ? `${this.props.gameInfo[this.props.user.opp].score} : ${this.props.gameInfo[this.props.user.user].score}`: ""}</Grid>
                    <Grid item xs={4} className="myname"> 나</Grid>
                </Grid>
            </React.Fragment>
        )}
}

export default Board;