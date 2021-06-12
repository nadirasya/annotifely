import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(4,8,0),
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        position: "relative",
       
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
      },
      submit: {
        width: '150px',
        height: '60px',
        marginLeft: 'auto'
      },
      label: {
        padding: theme.spacing(2,0,1),
      },
      image :{
        marginTop: theme.spacing(2),
        width: '100%',
        height: '100%',
        fontSize: '20px',
        textAlign: 'center',
      },
      img: {
        display: 'flex',
        width: '100%',
        height: '100%',
        padding: theme.spacing(2,2,0),
      },
      imagePreview: {
        borderRadius: '7px',
        border: '1px solid #CFCFCF',
        marginTop: '20px',
        padding: '20px',
        height: '320px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }, 
      daysContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 2fr',
        width: '100%'
      }
}));

export default useStyles;
