import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ScreenShareIcon from '@material-ui/icons/ScreenShare';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const styles = theme => ({
  login: {
    marginLeft: 'auto',
  }
});

class Header extends Component {
  render() {
    const { classes } = this.props;

    return (
      <>
        <AppBar
          position="static"
          color="primary"
        >
          <Toolbar>
            <ScreenShareIcon fontSize="large"></ScreenShareIcon>
            <Typography edge="start" variant="h5" noWrap>
              Data donation
            </Typography>
            {/*<Button
              variant="outlined"
              className={classes.login}
              startIcon={< AccountCircleIcon />}
            >
              My profile
            </Button>*/}
          </Toolbar>
        </AppBar>
      </>
    );
  }
}

export default withStyles(styles)(Header);
