import React, { useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
    //   marginTop: theme.spacing(2),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    width:'100%',
    marginBottom: theme.spacing(1)
    // margin: theme.spacing(1),
  },
}));

const SelectBox = ({label1, label2, label3, label4, disabled, selected, handleSelected, index}) => {
  const classes = useStyles();
  const [score, setScore] = React.useState(0);

  const handleChange = (event) => {
    handleSelected(event)
    setScore(event.target.value);
  };

  useEffect(() => {
    console.log("selected", selected)
  }, [])

  return (
    <div>
      <FormControl className={classes.margin} disabled={disabled}>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={score}
          name={index}
          onChange={handleChange}
          
          input={<BootstrapInput />}
        >
          <MenuItem disabled value={0}>
            <em>Please select one</em>
          </MenuItem>
          <MenuItem value={1}>{label1}</MenuItem>
          <MenuItem value={2}>{label2}</MenuItem>
          <MenuItem value={3}>{label3}</MenuItem>
          <MenuItem value={4}>{label4}</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default SelectBox;
