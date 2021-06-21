import {makeStyles} from '@material-ui/core';

const useStyles= makeStyles((theme) => ({
    container: {
        maxWidth: '80vw',
        marginButtom: theme.spacing(15),
    },
    titleContainer: {
        padding: theme.spacing(6,0,4)
    },
    tableContainer: {
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center',
        marginTop: '10px'
    },
    boxImage: {
        marginTop: '15vh',
        // height: 300,
        display:"flex",
        padding: 8,
    },
    boxButton: {
        // height: 50,
        display:"flex",
        padding: 8,
    },
    boxTitle: {
        height: 50,
        display:"flex",
        padding: 8,
        // border: "1px solid black",
    },
    centerBox: {
        justifyContent: "center",
        alignItems: "center",
    },
    spreadBox: {
      justifyContent: "space-between",
      alignItems: "center"
    },
    buttonPrimary: {
        backgroundColor: "#567068",
        color: '#ffffff',
        variant: "contained",
        height: '5vh',
        maxWidth: 200, 
        maxHeight: '50px', 
        minWidth: 200, 
        minHeight: '50px',
    },
    buttonTertiary: {
        backgroundColor: "#283531",
        color: '#ffffff',
        variant: "contained",
    },
    icon:
    {
        marginRight: theme.spacing(1),
    },
    table: {
        minWidth: 700,
        maxHeight: 200,
    },
    setting: {
        color: "#8f948f",
    },
    popupContainer: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        backgroundColor: 'rgba(0,0,0,.75)',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        zIndex: 3,
    }
      
}))

export default useStyles;