import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(15),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    padding: theme.spacing(3,4,4,4),
  },
  box: {
    width: '100%',
    display: "flex",
    padding: 8,
    marginTop: '1vh',
  },
  boxScore: {
    width: '100%',
    display: "flex",
    padding: 8,
    marginTop: '1vh',
    border: "1px solid #CFCFCF",
    borderRadius: 5,
  },
  boxComment: {
    height: '25vh',
    width: '100%',
    display: "block",
    padding: 8,
    border: "1px solid #CFCFCF",
    borderRadius: 5,
    overflow: 'auto',
  },
  boxIcon: {
    width: '100%',
    display: "flex",
    // border: "1px solid #CFCFCF",
  },
  centerBox: {
    alignItems: "center",
    justifyContent: 'center',
  },
  spreadBox: {
    justifyContent: "space-between",
    alignItems: "center"
  },
  rightBox: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  subtitle1: {
    fontSize: 'calc(80% + 0.5vw)',
},
}));