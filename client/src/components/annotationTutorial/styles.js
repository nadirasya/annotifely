import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(10),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(0),
        width: '120%',
        borderRadius: 15,
    },
    button: {
        padding: theme.spacing(3, 6, 8, 6),
        minWidth: "100%%", 
        borderRadius: 0
    },
    description: {
        color: "#283531"
    }
}));