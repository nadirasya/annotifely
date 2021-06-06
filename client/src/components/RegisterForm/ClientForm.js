import React, { useContext, useState } from 'react';
import { Avatar, Button, Paper, CssBaseline, TextField, Grid, Typography, Container } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signupClient } from '../../actions/auth';
import Input from './Input';
import useStyles from './styles';

const initialState = { name: '', email: '', password: ''};

const ClientForm = () => {
    const [formData, setFormData] = useState(initialState);
    const [showUserPassword, setShowUserPassword] = useState(false);

    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signupClient(formData, history)); 
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name] : e.target.value });
    };

    const handleShowUserPassword = () => setShowUserPassword((prevShowClientPassword) => !prevShowClientPassword);

    // const {getUser} = useContext(UserContext);

    return (
        // <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
                <Typography variant="h4"><b>Join As Client</b></Typography>
                <Avatar className={classes.avatar}>
                    <AccountCircle className={classes.icon} />
                </Avatar>
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
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
            <Button
              type="submit"
              variant="contained"
              fullWidth
              color="primary"
              className={classes.submit}
            >
              <Typography variant="h6">Confirm</Typography>
            </Button>
         </form>
      </Paper>
    // </Container>
    );
}

export default ClientForm;