import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: '90vw',
  },
  box: {
    height: '8vh',
    display: "flex",
    padding: 8,
    marginTop: '3vh',
    // border: "1px solid black",
  },
  boxMainImage: {
    height: '45vh',
    display: "flex",
    padding: 0,
    marginTop: '3vh',
    // border: "1px solid black",
  },
  boxMainDescription: {
    height: '30vh',
    display: "flex",
    padding: 6,
    // border: "1px solid black",
  },
  boxFooter: {
    height: '20vh',
    display: "flex",
    padding: 8,
    marginTop: 2,
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
    // marginBottom: 50,
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
    // width: '10vw',
    // height: '8vh',
    maxWidth: '135px', 
    maxHeight: '55px', 
    minWidth: '135px', 
    minHeight: '55px',
    // zIndex: -1,
  },
  buttonSecondary: {
    backgroundColor: "#F2EBEB",
    color: theme.palette.getContrastText('#F2EBEB'),
    marginTop: 3,
    // width: '15vw',
    // height: '8vh',
    maxWidth: '200px', 
    maxHeight: '55px', 
    minWidth: '200px', 
    minHeight: '55px'
  },
  content: {
    position: 'absolute',
    top: 0,
    bottom: '35vh',
    left: 0,
    right: 0,
    overflow: 'auto',
    zIndex: -2,
    // flex: '1 0 auto',
    padding: theme.spacing(2,0,0),
    // padding: '20px'
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    marginBottom: 0,
    overflow: 'hidden',
    width: '100%',
    height: '35vh',
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
  },
  h2: {
      fontSize: 'calc(100% + 3.5vw)',
  },
  h4: {
    fontSize: 'calc(100% + 1.5vw)',
  },
  h6: {
      fontSize: 'calc(100% + 0.5vw)',
  },
  subtitle1: {
    fontSize: 'calc(100% + 0.2vw)',
  },
  subtitle2: {
    fontSize:  'calc(100% + 0.15vw)',
  }
}));

export default useStyles;