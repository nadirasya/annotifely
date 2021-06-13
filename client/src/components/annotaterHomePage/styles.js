import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
    pageTitle: {
        display: 'flex',
        justifyContent: 'center',
        margin: '20px'
    },
    componentTitle: {
        marginTop: '18px',
    },
    table: {
        minWidth: 650,
        height: 100,
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
        minHeight: 200,
        borderRadius: 15,
    },
    cardSecondary: {
        backgroundColor: '#CFCFCF',
        color: '#283531',
        minHeight: 200,
        width: '100%',
        borderRadius: 15
    },
    cardTertiary: {
        backgroundColor: '#283531',
        color: '#F2EBEB',
        minHeight: 200,
        width: '100%',
        borderRadius: 15
    },
    cardContent: {
        marginTop: '10px', 
        // marginLeft: '20px',
    },
    gridContainer: {
        justifyContent: 'center'  
    },
    image: {
        maxWidth: 150
    },
    tutorialContainer: {
        position:'fixed',
        width: '100%', 
        height: '100%', 
        backgroundColor: 'black',
        backgroundColor:'rgba(0,0,0,.75)',
        alignItems: 'center', 
        justifyContent:'center',
        top: 0,
        zIndex: 3,
    }
      
}))