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
        // margin: theme.spacing(5, 0, 2),
        // left:'500px',
        position: 'absolute',
        right: '70px',
        width: '150px',
        height: '60px',
      },
      label: {
        width: '584px',
        height: '31px',
        top: '-2px',
        lineHeight: '30px',
        fontSize:'22px',
        padding: theme.spacing(2,0,2),
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
      days: {
        // marginTop: theme.spacing(-4),
        margin: theme.spacing(11,0, 2),
        fontSize: "22px",
        lineHeight: "0px",
      },
}));

export default useStyles;

