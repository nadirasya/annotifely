import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({    
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(2),
      },
      avatar: {
        margin: theme.spacing(1),
        width: '100px',
        height: '100px',
        top: '20px',
      },
      icon: {
        width: '100%',
        height: '100%',
      },
      form: {
        width: '90%', // Fix IE 11 issue.
        marginTop: theme.spacing(5),
      },
      submit: {
        margin: theme.spacing(3,13, 2),
        width: '40%',
        height: '18%'
      },
      buttonContainer: {
        width: '100%', 
        justifyContent: 'center', 
        alignItems: 'center', 
        display: 'flex'
      },
      alertContainer: {
        width: '100%', 
        justifyContent: 'center', 
        alignItems: 'center', 
        // display: 'flex',
        padding: 10
      },
}));

export default useStyles;

