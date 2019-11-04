import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";

class UserBoard extends React.Component {

    blockClick = (e) => {
        if(this.props.user.currentTurn){
            var num = e.target.alt
            this.setState({myblock: num}, () => this.props.onPropsChange({myblock:num}))  
        }
    }

    decideClick = () => {
        if(this.state.myblock){
            this.props.onPropsChange({myblockDecided:true})
        }
        else {
            alert("블록을 선택해주세요!")
        }
    }

    render(){
        return(
            <React.Fragment>
                <Grid container style={{height:"45%"}}>
                    <Grid container style={{height:"10%"}}>
                        <Grid item xs={4} style={{height:"100%"}}></Grid>
                        <Grid item xs={4} style={{height:"100%"}}>내 블록</Grid>
                        <Grid item xs={4} style={{height:"100%"}}></Grid>
                    </Grid>
                    <Grid container style={{height:"45%"}}>
                        <Grid item xs={1} style={{height:"100%"}}></Grid>
                        <Grid item xs={2} style={{height:"100%"}}>{this.props.user.blocks[0] ? <img src={require('./image/0.png')} alt="0" style={{height:"80%"}} onClick={this.blockClick}/> : <span></span>}</Grid>
                        <Grid item xs={2} style={{height:"100%"}}>{this.props.user.blocks[2] ? <img src={require('./image/2.png')} alt="2" style={{height:"80%"}} onClick={this.blockClick}/> : <span></span>}</Grid>
                        <Grid item xs={2} style={{height:"100%"}}>{this.props.user.blocks[4] ? <img src={require('./image/4.png')} alt="4" style={{height:"80%"}} onClick={this.blockClick}/> : <span></span>}</Grid>
                        <Grid item xs={2} style={{height:"100%"}}>{this.props.user.blocks[6] ? <img src={require('./image/6.png')} alt="6" style={{height:"80%"}} onClick={this.blockClick}/> : <span></span>}</Grid>
                        <Grid item xs={2} style={{height:"100%"}}>{this.props.user.blocks[8] ? <img src={require('./image/8.png')} alt="8" style={{height:"80%"}} onClick={this.blockClick}/> : <span></span>}</Grid>
                        <Grid item xs={1} style={{height:"100%"}}></Grid>
                    </Grid>
                    <Grid container style={{height:"45%"}}>
                        <Grid item xs={1} style={{height:"100%"}}></Grid>
                        <Grid item xs={2} style={{height:"100%"}}>{this.props.user.blocks[1] ? <img src={require('./image/1.png')} alt="1" style={{height:"80%"}} onClick={this.blockClick}/> : <span></span>}</Grid>
                        <Grid item xs={2} style={{height:"100%"}}>{this.props.user.blocks[3] ? <img src={require('./image/3.png')} alt="3" style={{height:"80%"}} onClick={this.blockClick}/> : <span></span>}</Grid>
                        <Grid item xs={2} style={{height:"100%"}}>{this.props.user.blocks[5] ? <img src={require('./image/5.png')} alt="5" style={{height:"80%"}} onClick={this.blockClick}/> : <span></span>}</Grid>
                        <Grid item xs={2} style={{height:"100%"}}>{this.props.user.blocks[7] ? <img src={require('./image/7.png')} alt="7" style={{height:"80%"}} onClick={this.blockClick}/> : <span></span>}</Grid>
                        <Grid item xs={2} style={{height:"100%"}}><div style={{display:"table", height:"100%", margin:"0 auto"}}><div style={{display: "table-cell", verticalAlign: "middle"}}><Button color="primary" onClick={this.decideClick}>결정</Button></div></div></Grid>
                        <Grid item xs={1} style={{height:"100%"}}></Grid>
                    </Grid>
                </Grid>
            </React.Fragment>
        )}
}

export default UserBoard;