import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
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