import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ScreenShareIcon from '@material-ui/icons/ScreenShare';
//import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  login: {
    marginLeft: 'auto',
  },
  logo: {
    paddingRight: 10,
  }
}));

export default function Header() {
  const classes = useStyles();

  return (
    <>
      <AppBar
        position="static"
        color="primary"
      >
        <Toolbar>
          <ScreenShareIcon fontSize="large" className={classes.logo}></ScreenShareIcon>
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
