import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({    
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '458px',
        height: '571px',
        padding: theme.spacing(2),
      },
      avatar: {
        margin: theme.spacing(1),
        width: '137px',
        height: '137px',
        top: '30px',
      },
      icon: {
        width: '150px',
        height: '150px',
      },
      form: {
        width: '90%', // Fix IE 11 issue.
        marginTop: theme.spacing(8),
      },
      submit: {
        margin: theme.spacing(3,13, 2),
        width: '40%',
        height: '18%'
      },
}));

export default useStyles;

