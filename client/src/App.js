import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import LandingPage from './components/landingPage/LandingPage';
import Navbar from './components/Navbar/Navbar';
import AnnotaterHomePage from './components/annotaterHomePage/HomePage';
import AnnotaterTaskPage from './components/annotaterTaskPage/AnnotaterTaskPage';
import AnnotaterMyAnnotationsPage from './components/annotaterMyAnnotationsPage/AnnotaterMyAnnotationsPage';
import theme from './theme';


const App = () => {
    const AnnotaterRoutes = () => {
        return (
            <div>
                <Navbar />
                <Switch>
                    <Route path='/annotater' exact component = {AnnotaterHomePage} />
                    <Route path='/annotater/task' exact component = {AnnotaterTaskPage} />
                    <Route path='/annotater/my-annotation' exact component = {AnnotaterMyAnnotationsPage} />
                </Switch>
            </div>
        )

    }

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact component = {LandingPage} />
                    <Route component={AnnotaterRoutes} />
                </Switch>
            </BrowserRouter>
        </ThemeProvider>  
    );
}

export default App;