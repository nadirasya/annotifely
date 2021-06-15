import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
      logoContainer: {
        marginRight: theme.spacing(2),
      },
      buttonContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: "center",
      },
      logo: {
        maxWidth: '50vw',
      },
      navigationLink: {
        textTransform: 'none'
    },
    h6: {
      fontSize: 'calc(80% + 0.2vw)'
    }
      
}))