import React from 'react';
import BlackAndWhite from '../src/Blackandwhite'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ImportContactsOutlinedIcon from '@material-ui/icons/ImportContactsOutlined';
import "./App.css"

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton>
            <ImportContactsOutlinedIcon />
          </IconButton>
          <Typography>Black & White</Typography>
        </Toolbar>
      </AppBar>
        <BlackAndWhite />
    </div>
  );
}

export default App;
