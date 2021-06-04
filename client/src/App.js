import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import Router from './Router';

import Navbar from './components/Navbar/Navbar';
import theme from './theme';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Router />
            {/* <Navbar /> */}
        </ThemeProvider>  
    );
}

export default App;