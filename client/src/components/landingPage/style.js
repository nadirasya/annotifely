import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  box: {
    height: 60,
    display: "flex",
    padding: 8,
    marginTop: 20
  },
  boxDescription: {
    height: 350,
    display: "flex",
    padding: 8
  },
  boxFooter: {
    height: 120,
    display: "flex",
    padding: 8,
    // border: "1px solid black",
  },
  bottomRightBox: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    zIndex: 0,

  },
  centerBox: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0
  },
    descriptionBox: {
      // justifyContent: "space-between",
      alignItems: "center"
    },
    spreadFooterBox: {
      justifyContent: "space-between",
      alignItems: "center"
    },
  buttonPrimary: {
    backgroundColor: "#567068",
    color: theme.palette.getContrastText('#567068'),
    variant: "contained",
    height: 40,
    maxWidth: '130px', 
    maxHeight: '50px', 
    minWidth: '130px', 
    minHeight: '50px',
    // zIndex: -1,

  },
  buttonSecondary: {
    backgroundColor: "#F2EBEB",
    color: theme.palette.getContrastText('#F2EBEB'),
    variant: "contained",
    height: 40,
    maxWidth: '200px', 
    maxHeight: '50px', 
    minWidth: '200px', 
    minHeight: '50px'
  },
  content: {
    flex: '1 0 auto',
    padding: '10px',
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    height: 230,
    backgroundColor: "#567068",
    color: theme.palette.getContrastText('#567068'),
    // marginTop: theme.spacing(8),
    padding: theme.spacing(2, 0),
    zIndex: -1,
    },
    loginFormContainer: {
      position:'fixed',
      width: '100%', 
      height: '100%', 
      backgroundColor: 'black',
      backgroundColor:'rgba(0,0,0,.75)',
      alignItems: 'center', 
      justifyContent:'center',
      top: 0,
      zIndex: 1,

    }
}));

export default useStyles;