import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import Router from './Router';

import Navbar from './components/Navbar/Navbar';
import HomePage from './components/annotaterHomePage/HomePage';
import theme from './theme';

const App = () => { 

    return (
        <ThemeProvider theme={theme}>
            <Router />
            {/* <Navbar /> */}
            {/* <HomePage/> */}
        </ThemeProvider>  
    );
}

export default App;