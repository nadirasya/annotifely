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
    componentTitle: {
        marginTop: '3vh',
        marginButtom: '2vh',
    },
    table: {
        minWidth: '100vh',
        // height: 100,
    },
    tableRow: {
        backgroundColor: '#567068'
    },
    tableContainer: {
        width: '100%',
        display: 'flex', 
        justifyContent: 'center'
    },
    cardPrimary: {
        backgroundColor: "#567068",
        color: '#F2EBEB',
        minHeight: '28vh',
        width: '100%',
        borderRadius: 15,
    },
    cardSecondary: {
        backgroundColor: '#CFCFCF',
        color: '#283531',
        minHeight: '26vh',
        width: '100%',
        borderRadius: 15,
        marginTop: '1.8vh', 
    },
    cardTertiary: {
        backgroundColor: '#283531',
        color: '#F2EBEB',
        minHeight: '26vh',
        width: '100%',
        borderRadius: 15,
        marginTop: '1.3vh', 
    },
    cardContent: {
        
    },
    gridContainer: {
        justifyContent: 'center'  
    },
    image: {
        maxWidth: '58%'
    },
    tutorialContainer: {
        position:'fixed',
        width: '100vw', 
        height: '100vh', 
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
        // marginTop: '3vh',
        height: '38vh',
        display:"flex",
        padding: 8,
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
    h6: {
        fontSize: 'calc(80% + 0.8vw)'
    },
    subtitle1: {
        fontSize: 'calc(80% + 0.4vw)',
    },
      
}))