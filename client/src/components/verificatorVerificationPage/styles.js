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
        marginTop: '5vh',
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
        marginTop: '3vh',
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    imageCounter: {
        padding: '20px'
    },
    boxComment: {
      marginTop: '3vh',
      height: '25vh',
      width: '100%',
      display: "block",
      padding: 8,
      border: "1px solid #CFCFCF",
      borderRadius: 5,
      overflow: 'auto',
      backgroundColor: '#F2F2F2'
    },
    centerBox: {
      alignItems: "center",
      justifyContent: 'center',
    },
}))