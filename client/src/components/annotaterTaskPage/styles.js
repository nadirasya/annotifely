import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
    pageTitle: {
        display: 'flex',
        // width: '100%',
        justifyContent: 'center',
        margin: '40px'
    },
    table: {
        minWidth: 650,
    },
    tableRow: {
        backgroundColor: '#567068'
    },
    tableContainer: {
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center'
    }
      
}))