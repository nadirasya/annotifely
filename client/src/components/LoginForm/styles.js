import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  loginFormContainer: {
    display: 'flex',
    backgroundColor: 'black',
    // width: '100%',
    // height: '100%'
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: '40%',
  },
  googleButton: {
    marginBottom: theme.spacing(2),
  },
  roleButtonContainer: {
    width: '92%',
    borderWidth: '2px', 
    borderBottomWidth: '1px', 
    borderBottomColor: '#CFCFCF', 
    borderBottomStyle: 'solid',
  },
  buttonContainer: {
    width: '100%', 
    justifyContent: 'center', 
    alignItems: 'center', 
    display: 'flex'
  },
  formContainer: {
    width: '50%',
    display: 'flex',
    // alignItems: 'center',
    justifyContent: 'center'
  },
  alertContainer: {
    width: '100%', 
    justifyContent: 'center', 
    alignItems: 'center', 
    // display: 'flex',
    padding: 10
  },
}));