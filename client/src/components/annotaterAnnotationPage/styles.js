import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
    pageTitle: {
        marginLeft: '20px',
        marginTop: '30px',
    },
    taskLabel: {
        marginLeft: '20px',
        marginTop: '10px',
    },
    labelContainer:{
        display: 'grid',
        gridTemplateColumns: '3fr 1fr'
    },
    toolsContainer: {
        marginLeft: '20px',
    },
    logo: {
        maxWidth: '30',
    },
    buttonContainer:{},
    rightContainer: {
        height: '100%'
    }
}))