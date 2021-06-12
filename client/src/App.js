import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import LandingPage from './components/landingPage/LandingPage';
import Navbar from './components/Navbar/Navbar';
import AnnotaterHomePage from './components/annotaterHomePage/HomePage';
import AnnotaterTaskPage from './components/annotaterTaskPage/AnnotaterTaskPage';
import AnnotaterMyAnnotationsPage from './components/annotaterMyAnnotationsPage/AnnotaterMyAnnotationsPage';
import TaskForm from './components/clientTaskForm/TaskForm';
import AnnotaterAnnotationPage from './components/annotaterAnnotationPage/AnnotaterAnnotationPage';
import ClientTaskList from './components/clientTaskListPage/TaskList';

import theme from './theme';


const App = () => {
    const AnnotaterRoutes = () => {
        return (
            <div>
                <Navbar />
                <Switch>
                    <Route path='/annotater' exact component = {AnnotaterHomePage} />
                    <Route path='/annotater/task' exact component = {AnnotaterTaskPage} />
                    <Route path='/annotater/task/annotation' exact component = {AnnotaterAnnotationPage} />
                    <Route path='/annotater/my-annotation' exact component = {AnnotaterMyAnnotationsPage} />
                </Switch>
            </div>
        )

    }

    const ClientRoutes = () => {
        return (
            <div>
                <Navbar />
                <Switch>
                    <Route path='/client' exact component = {ClientTaskList} />
                    <Route path='/client/add-task' exact component = {TaskForm} />
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
                    <Route component={ClientRoutes} />
                </Switch>
            </BrowserRouter>
        </ThemeProvider>  
    );
}

export default App;