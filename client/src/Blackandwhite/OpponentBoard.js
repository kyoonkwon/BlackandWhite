import React from 'react';
import Grid from '@material-ui/core/Grid';


class OpponentBoard extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            black : 5,
            white : 4,
        }

    }
    

    render(){
        this.props.socket.on("blocks", data =>{
            console.log(data)
        })

        return(
            <React.Fragment>
                <Grid container style={{height:"5%", maxWidth:"320px"}}></Grid>
                <Grid container style={{height:"5%", maxWidth:"320px"}}>
                    <Grid item xs={4} style={{height:"100%"}}></Grid>
                    <Grid item xs={4} style={{height:"100%"}}>상대 블록</Grid>
                    <Grid item xs={4} style={{height:"100%"}}></Grid>
                </Grid>
                <Grid container style={{height:"20%", maxWidth:"320px"}}>
                    <Grid item xs={1} style={{height:"100%"}}></Grid>
                    <Grid item xs={4} style={{height:"100%"}}>
                        <img src={require('./image/black.png')} alt="black" style={{height:"100%", maxWidth:"100%"}}/>  
                    </Grid>
                    <Grid item xs={1} style={{height:"100%"}}>
                        <div style={{display:"table", height:"100%"}}>
                            <div style={{display: "table-cell", verticalAlign: "middle"}}>
                                <b>X {this.props.gameInfo ? this.props.gameInfo[this.props.user.opp].black : 0}</b>
                            </div>
                        </div>
                    </Grid>

                    <Grid item xs={4} style={{height:"100%"}}>
                        <img src={require('./image/white.png')} alt="white" style={{height:"100%", maxWidth:"100%"}}/>  
                    </Grid>
                    <Grid item xs={1} style={{height:"100%"}}>
                        <div style={{display:"table", height:"100%"}}>
                            <div style={{display: "table-cell", verticalAlign: "middle"}}>
                                <b>X {this.props.gameInfo ? this.props.gameInfo[this.props.user.opp].white : 0}</b>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={1} style={{height:"100%"}}></Grid>
                </Grid>
            </React.Fragment>
        )}
}

export default OpponentBoard;