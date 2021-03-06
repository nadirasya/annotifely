import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    marginTop: '20vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(4),
  },
  gridContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '100%', 
    justifyContent: 'center', 
    alignItems: 'center', 
    display: 'flex',
    marginTop: '3vh'
  },
  messageContainer: {
    marginButtom: '',
    width: '100%', 
    justifyContent: 'center', 
    alignItems: 'center', 
    display: 'flex'
  },
  box: {
    width: '100%',
    display: "flex",
    padding: 8,
    marginTop: '1vh',
    // border: '1px solid black'
  },
  boxTextField: {
    width: '100%',
    display: "flex",
    padding: 8,
    marginTop: '0vh',
    marginRight: 8,
  },
  centerBox: {
    alignItems: "center",
    justifyContent: 'center',
  },
  message: {
    color: '#000000',
  },
  button: { 
    width: '80%', 
    height: '50px',
  } 
}));