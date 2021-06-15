import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
    container: {
        maxWidth: '90vw',
    },
    pageTitle: {
        display: 'flex',
        justifyContent: 'center',
        margin: '2.5vh'
    },
    table: {
        height: '75vh',
    },
    tableRow: {
        backgroundColor: '#567068'
    },
    tableContainer: {
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center'
    },
    h2: {
        fontSize: 'calc(50% + 3.5vw)',
    },
    h4: {
        fontSize: 'calc(80% + 1.5vw)',
    },
    h5: {
        fontSize: 'calc(100% + 0.8vw)'
    },
    subtitle1: {
        fontSize: 'calc(80% + 0.4vw)',
    },
      
}))