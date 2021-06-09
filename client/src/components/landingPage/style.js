import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  box: {
    height: 60,
    display: "flex",
    padding: 8,
    marginTop: 20
  },
  boxDescription: {
    height: 300,
    display: "flex",
    padding: 6,
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
    marginTop: 0,
    // border: "1px solid black",
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
    position: 'absolute',
    top: 90,
    bottom: 200,
    left: 0,
    right: 0,
    overflow: 'auto',
    // flex: '1 0 auto',
    padding: theme.spacing(2,0,0),
    // padding: '20px'
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    marginBottom: 0,
    overflow: 'auto',
    width: '100%',
    // flexShrink: 0,
    height: 220,
    backgroundColor: "#567068",
    color: theme.palette.getContrastText('#567068'),
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

    },
    registerFormContainer: {
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