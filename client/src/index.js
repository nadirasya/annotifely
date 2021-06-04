import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
// import { createMuiTheme } from '@material-ui/core';

import App from './App';

// const theme = createMuiTheme({ 
// 	typography: { 
// 		fontFamily: [ 'Open Sans' ].join(','), 
// 	}, 
// 	overrides: {
// 		MuiButton: {
// 		  root: {
// 			borderRadius: 8,
// 			textTransform: 'none'
// 		  },
// 		}, 
// 	  },
// })

ReactDOM.render(<App />, document.getElementById('root'));