import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import Header from '../../components/Header/Header';
import Dashboard from '../Dashboard/dashboard';
import DonationBaseline from '../Donation/donationBaseline';
import DonationHiConstrual from '../Donation/donationHiConstrual';
import DonationLoConstrual from '../Donation/donationLoConstrual';
//import AnonScript from '../Script/AnonScript';
import './App.css';

const theme = createMuiTheme({
    palette: {
        primary: {
          main: '#2962ff',  //2196f3 
          light: '#768fff', // 64b5f6
          dark: '#0039cb',  //1976d2
          contrastText: '#fff',
        },
        secondary: {
          main: '#ffC629',
          light: '#fff961',
          dark: '#c79600',
          contrastText: '#000',
        },
        error: { 
          main: '#ffffff',
        },
        text: {
          primary: '#000000',
          //secondary: '#ffffff',
          //primary:'#2196f3',
          // #2196f3 (darken: 60%)
        },
        paper: {
          light: '#e3f2fd',
          dark: '#37474f',  // #002597
          // main: '#2196f3'
          // #2196f3 (lighten: 90%)
        },
    },
   
   /* from material UI
    palette: {
      primary: {
        light: '#757ce8',
        main: '#3f50b5',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },*/
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route path="/dashboard" component= { Dashboard }/>
            <Route path="/donationA" component={ DonationBaseline } />
            <Route path="/donationB" component={ DonationHiConstrual } />
            <Route path="/donationC" component={ DonationLoConstrual } />
            <Route path="/login" />
            <Route path='/'>
              <Redirect to="/dashboard" />
            </Route>
          </Switch> 
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
