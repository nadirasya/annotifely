import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import LandingPage from './components/landingPage/LandingPage';

const Router = () => {
    return <BrowserRouter>
        <Switch>
            <Route exact path="/">
                <LandingPage />
            </Route>
            <Route path="/login">
                <h2>Login</h2>
            </Route>
            <Route exact path="/register-client">
                <h2>Register Client</h2>
            </Route>
            <Route exact path="/register-annotater">
                <h2>Register Annotater</h2>
            </Route>
        </Switch>
    </BrowserRouter>
}

export default Router;