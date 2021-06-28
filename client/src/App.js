import React, { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import LandingPage from './components/landingPage/LandingPage';
import Navbar from './components/Navbar/Navbar';
import AnnotaterHomePage from './components/annotaterHomePage/HomePage';
import AnnotaterTaskPage from './components/annotaterTaskPage/AnnotaterTaskPage';
import AnnotaterMyAnnotationsPage from './components/annotaterMyAnnotationsPage/AnnotaterMyAnnotationsPage';
import TaskForm from './components/clientTaskForm/TaskForm';
import AnnotaterAnnotationPage from './components/annotaterAnnotationPage/AnnotaterAnnotationPage';
import ClientTaskList from './components/clientTaskListPage/TaskList';
import AccessDenied from './components/AccessDenied/AccessDenied';
import VerificatorVerificationPage from './components/verificatorVerificationPage/VerificatorVerificationPage';
import VerificatorAnnotationList from './components/verificatorAnnotationList/annotationList';
import theme from './theme';

import UserLeaveConfirmation from './userLeaveConfirmation';


const App = () => {
    
    const [confirmOpen, setConfirmOpen] = useState(true);

    const VerificatorRoutes = () => {
        return (
            <div>
                <CssBaseline />
                <Navbar />
                <Switch>
                    <Route path='/verificator' exact component = {VerificatorAnnotationList} />
                    <Route path='/verificator/verification-page' exact component = {VerificatorVerificationPage} />
                    <Redirect to='/no-permission' />
                </Switch>
            </div>
        )
    }

    const ClientRoutes = () => {
        return (
            <div>
                <CssBaseline />
                <Navbar />
                <Switch>
                    <Route path='/client' exact component = {ClientTaskList} />
                    <Route path='/client/add-task' exact component = {TaskForm} />
                    <Redirect to='/no-permission' />
                </Switch>
            </div>
        )
    }

    const AnnotaterRoutes = () => {
        return (
            <div>
                <CssBaseline />
                <Navbar />
                <Switch>
                    <Route path='/annotater' exact component = {AnnotaterHomePage}/>
                    <Route path='/annotater/task' exact component = {AnnotaterTaskPage} />
                    <Route path='/annotater/task/annotation' exact component = {AnnotaterAnnotationPage} />
                    <Route path='/annotater/my-annotation' exact component = {AnnotaterMyAnnotationsPage} />
                    <Redirect to='/no-permission' />
                </Switch>
            </div>
        )
    }


    const NavBarRoutes = () => {
        const [user] = useState(JSON.parse(localStorage.getItem('profile'))); 

        const checkUser = (allowedRole) => {

            if( user?.role===allowedRole){
                // console.log("approved")
                return 'approved'
            } else {
                // console.log("denied")
                return 'denied'
            }
        }

        return (
            <div>
                <CssBaseline />
                <Switch>
                {
                    checkUser('annotater') === 'approved' ?
                    <AnnotaterRoutes/> : 
                    checkUser('client') === 'approved' ? 
                    <ClientRoutes/> :
                    checkUser('verificator') === 'approved' ? 
                    <VerificatorRoutes />
                    : 
                    <Redirect to='/no-permission' />
                }
                </Switch>
            </div>
        )

    }

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter getUserConfirmation={(message, callback) => {
                return UserLeaveConfirmation(message, callback, confirmOpen, setConfirmOpen);
                }} >
                <Switch>
                    <Route path='/' exact component = {LandingPage} />
                    <Route path='/no-permission' exact component = {AccessDenied} />
                    <Route component={NavBarRoutes} />
                </Switch>
            </BrowserRouter>
        </ThemeProvider>  
    );
}

export default App;