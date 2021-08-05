import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
    pageTitle: {
        // marginLeft: '20px',
        marginTop: '30px',
    },
    taskLabel: {
        // marginLeft: '20px',
        marginTop: '10px',
    },
    labelContainer:{
        display: 'grid',
        gridTemplateColumns: '3fr 1fr'
    },
    toolsContainer: {
        // marginLeft: '20px',
    },
    logo: {
        maxWidth: '30',
    },
    buttonContainer:{
        padding: '20px 40px',
        // width: '30%'
    },
    rightContainer: {
        marginTop: '4vh',
        paddingLeft: '3%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column'

    },
    imageContainer: {
        display:'flex', 
        justifyContent: 'center', 
        marginTop: '10px', 
        marginRight:'20px', 
        borderWidth: '1px', 
        borderColor: '#CFCFCF', 
        borderStyle: 'solid', 
        borderRadius: '10px'
    },
    submitButtonContainer: {
        marginTop: '4vh',
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    imageCounter: {
        padding: '20px'
    },
    popupContainer: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        backgroundColor: 'rgba(0,0,0,.75)',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        zIndex: 3,
        left: 0
      }
}))