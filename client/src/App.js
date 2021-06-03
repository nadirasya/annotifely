import React from 'react';
import { ThemeProvider } from '@material-ui/core';

import Navbar from './components/Navbar/Navbar';
import theme from './theme';

const App = () => { 

    return (
        <ThemeProvider theme={theme}>
            <Navbar />
            <h1>App</h1>
        </ThemeProvider>
    );
}

export default App;