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
    buttonTertiary: {
        backgroundColor: '#283531',
        color: '#F2EBEB',
        width: '80%',
    },
    feedbackFormContainer: {
        position:'fixed',
        width: '100%', 
        height: '100%', 
        backgroundColor: 'black',
        backgroundColor:'rgba(0,0,0,.75)',
        alignItems: 'center', 
        justifyContent:'center',
        top: 0,
        zIndex: 3,
    }, 
    h4: {
        fontSize: 'calc(80% + 1.5vw)',
    },
}))