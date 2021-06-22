import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
    container: {
        maxWidth: '90vw',
        marginButtom: theme.spacing(15),
    },
    pageTitle: {
        display: 'flex',
        justifyContent: 'center',
        margin: '2.5vh'
    },
    table: {
        maxHeight: '75vh',
    },
    tableRow: {
        backgroundColor: '#567068'
    },
    tableContainer: {
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center'
    },
    buttonSecondary: {
        backgroundColor: '#CFCFCF',
        color: theme.palette.getContrastText('#CFCFCF'),
    },
    h4: {
        fontSize: 'calc(80% + 1.5vw)',
    },
    subtitle1: {
        fontSize: 'calc(80% + 0.2vw)',
    },
}))