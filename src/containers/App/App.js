import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
// HashRouter
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import Header from '../../components/Header/Header';
import DashboardHome from '../Dashboard/DashboardHome';
// Round 1 
  // versions
  import DashboardAlfaR1 from '../Dashboard/Round1/DashboardAlfaR1';
  import DonationAlfaR1 from '../Donation/Round1/DonationAlfaR1';
  // Beta versions
  import DashboardBetaR1 from '../Dashboard/Round1/DashboardBetaR1';
  import DonationBetaR1 from '../Donation/Round1/DonationBetaR1';
  // Gamma versions
  import DashboardGammaR1 from '../Dashboard/Round1/DashboardGammaR1';
  import DonationGammaR1 from '../Donation/Round1/DonationGammaR1';

// Round 2 
  // Alfa versions
  import DashboardAlfaR2 from '../Dashboard/Round2/DashboardAlfaR2';
  import DonationAlfaR2 from '../Donation/Round2/DonationAlfaR2';
  // Beta versions
  import DashboardBetaR2 from '../Dashboard/Round2/DashboardBetaR2';
  //import DonationBetaR2 from '../Donation/Round2/DonationBetaR2';
  // Gamma versions
  import DashboardGammaR2 from '../Dashboard/Round2/DashboardGammaR2';
  //import DonationGammaR2 from '../Donation/Round2/DonationGammaR2';

// Round 3
  // Alfa versions
  import DashboardAlfaR3 from '../Dashboard/Round3/DashboardAlfaR3';
  import DonationAlfaR3 from '../Donation/Round3/DonationAlfaR3';
  // Beta versions
  import DashboardBetaR3 from '../Dashboard/Round3/DashboardBetaR3';
  //import DonationBetaR3 from '../Donation/Round3/DonationBetaR3';
  // Gamma versions
  import DashboardGammaR3 from '../Dashboard/Round3/DashboardGammaR3';
  //import DonationGammaR3 from '../Donation/Round3/DonationGammaR3';

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

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme} id="root">
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              <Route path="/Data-donation-web-app/home" component={ DashboardHome } /> {/* Dashboard home page */}

              <Route path="/Data-donation-web-app/dashboardA1" component={ DashboardAlfaR1 }/>   {/* Dashboard Alfa, Round 1 */}
              <Route path="/Data-donation-web-app/donationA1" component={ DonationAlfaR1 } />    {/* Donation Alfa, Round 1 */}

              <Route path="/Data-donation-web-app/dashboardB1" component={ DashboardBetaR1 } />   {/* Dashboard Beta, Round 1 */}
              <Route path="/Data-donation-web-app/donationB1" component={ DonationBetaR1 } />     {/* Donation Beta, Round 1 */}

              <Route path="/Data-donation-web-app/dashboardC1" component={ DashboardGammaR1 } />  {/* Dashboard Gamma, Round 1 */}
              <Route path="/Data-donation-web-app/donationC1" component={ DonationGammaR1 } />    {/* Donation Gamma, Round 1 */}

              <Route path="/Data-donation-web-app/dashboardA2" component={ DashboardAlfaR2 }/>    {/* Dashboard Alfa, Round 2 */}
              <Route path="/Data-donation-web-app/donationA2" component={ DonationAlfaR2 } />     {/* Donation Alfa, Round 2 */}

              <Route path="/Data-donation-web-app/dashboardB2" component={ DashboardBetaR2 } />   {/* Dashboard Beta, Round 2 */}
              {/*<Route path="/Data-donation-web-app/donationB2" component={ DonationBetaR2 } />  {/* Donation Beta, Round 2 */}

              <Route path="/Data-donation-web-app/dashboardC2" component={ DashboardGammaR2 } />  {/* Dashboard Gamma, Round 2 */}
              {/*<Route path="/Data-donation-web-app/donationC2" component={ DonationGammaR2 } /> {/* Donation Gamma, Round 2 */}

              <Route path="/Data-donation-web-app/dashboardA3" component={ DashboardAlfaR3 } />   {/* Dashboard Alfa, Round 3 */}
              <Route path="/Data-donation-web-app/donationA3" component={ DonationAlfaR3 } />     {/* Donation Alfa, Round 3 */}

              <Route path="/Data-donation-web-app/dashboardB3" component={ DashboardBetaR3 } />    {/* Dashboard Beta, Round 3 */}
              {/*<Route path="/Data-donation-web-app/donationB3" component={ DonationBetaR3 } />   {/* Donation Beta, Round 3 */}

              <Route path="/Data-donation-web-app/dashboardC3" component={ DashboardGammaR3 } />    {/* Dashboard Gamma, Round 3 */}
              {/*<Route path="/Data-donation-web-app/donationC3" component={ DonationGammaR3 } />   {/* Donation Gamma, Round 3 */}
              
              <Route path='/' >
                <Redirect to="/Data-donation-web-app/home" />
              </Route>
            
            </Switch> 
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
