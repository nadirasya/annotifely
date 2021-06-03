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
      },
      logo: {
        maxWidth: '160',
      },
      navigationLink: {
        textTransform: 'none'
    }
      
}))