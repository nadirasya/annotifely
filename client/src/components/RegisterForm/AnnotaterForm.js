import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Slide } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { AccountCircle } from '@material-ui/icons';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signupAnnotater } from '../../actions/auth';
import Input from './Input';
import useStyles from './styles';

const initialState = { name: '', email: '', password: ''};

const AnnotaterForm = ({annotaterRegisterForm}) => {
    const [formData, setFormData] = useState(initialState);
    const [showUserPassword, setShowUserPassword] = useState(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [accountValid, setAccountValid] = useState(true);

    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = async(e) => {
        e.preventDefault();
        await dispatch(signupAnnotater(formData, history));
        if (!user){
          setAccountValid(false)
      }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name] : e.target.value });
        setAccountValid(true);
    };

    const handleShowUserPassword = () => setShowUserPassword((prevShowClientPassword) => !prevShowClientPassword);

    // const {getUser} = useContext(UserContext);

    return (
        // <Container component="main" maxWidth="xs">
        <Slide in={annotaterRegisterForm} direction="down" mountOnEnter unmountOnExit >
        <Paper className={classes.paper} elevation={3}>
          <Typography variant="h4"><b>Join As Annotater</b></Typography>
          <Avatar className={classes.avatar}>
              <AccountCircle className={classes.icon} />
          </Avatar>
          <form className={classes.form} onSubmit={handleSubmit}>

            <Grid container spacing={2}>
              { !accountValid ?    
                <div className={classes.alertContainer}>
                  <Alert severity="error">Email address is already registered.</Alert>
                </div>
                : null
              }
              <Input
                handleChange={handleChange}
                type="text"
                name="name"
                label="Name"
              />
              <Input
                handleChange={handleChange}
                type="email"
                label="Email Address"
                name="email"
              />
              <Input
                handleChange={handleChange}
                name="password"
                label="Password"
                type={ showUserPassword ? "text" : "password"}
                handleShowUserPassword={handleShowUserPassword}
              />
            </Grid>

            <div className={classes.buttonContainer}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                color="primary"
                className={classes.submit}
              >
                <Typography variant="h6">Confirm</Typography>
              </Button>
            </div>

         </form>
      </Paper>
      </Slide>
    // </Container>
    );
}

export default AnnotaterForm;