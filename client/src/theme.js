import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({ 
    palette: {
        primary: {
            main: "#567068"
        }, 
        secondary: {
            main: "#CFCFCF",
        },
		white: {
			main: "#FFFFFF"
		}
    },
    typography: { 
		fontFamily: [ 'Open Sans' ].join(','), 
	}, 
	overrides: {
		MuiButton: {
		  root: {
			borderRadius: 8,
			textTransform: 'none'
		  },
		}, 
	  },
})

export default theme;