import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import Router from './Router';
import LandingPage from './components/landingPage/LandingPage';

import Navbar from './components/Navbar/Navbar';
import AnnotaterHomePage from './components/annotaterHomePage/HomePage';
import theme from './theme';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const App = () => { 

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact component = {LandingPage} />
                    <Route path='/annotater' exact component = {AnnotaterHomePage} />
                </Switch>
            </BrowserRouter>
        </ThemeProvider>  
    );
}

export default App;