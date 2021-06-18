import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    container: {
        width: '90vw',
        // height: '90vh',
    },
    gridContainer: {
        
        justifyContent: 'center'  
    },
    box: {
        width: '100%',
        display: "flex",
        // border: '1px solid black'
    },
    centerBox: {
        alignItems: "center",
        justifyContent: 'center',
    },
}));