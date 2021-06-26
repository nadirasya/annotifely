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
    buttonPrimary: {
        backgroundColor: "#567068",
        color: '#ffffff',
        variant: "contained",
        height: '5vh',
        maxWidth: 200, 
        maxHeight: '50px', 
        minWidth: 200, 
        minHeight: '50px',
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
    centerBox: {
        justifyContent: "center",
        alignItems: "center",
    },
    boxImage: {
        marginTop: '15vh',
        // height: 300,
        display:"flex",
        padding: 8,
    },
    boxButton: {
        // height: 50,
        display:"flex",
        padding: 8,
    },
    h4: {
        fontSize: 'calc(80% + 1.5vw)',
    },
}))