import React, { useState } from 'react';
import { TextField, Typography, Paper, CardMedia, Container, Grid, Button } from '@material-ui/core';

import Input from './Input';
import useStyles from './styles';

const initialState = { email: '', password: '', role: 'annotater'};

const LoginForm = () => {
    const [formData, setFormData] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);

    const classes = useStyles();

    const handleSubmit = (e) => {
        // e.preventDefault();
        
        // if(isSignup){
        //     dispatch(signup(formData, history));
        // } else {
        //     dispatch(signin(formData, history));
        // }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name] : e.target.value });
    };

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    
    return (
        <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Typography variant="h5">Login as</Typography>
            <div style={{width: '100%',borderWidth: '2px', borderBottomWidth: '1px', borderBottomColor: '#CFCFCF', borderBottomStyle: 'solid'}}>
                <Button size="large">
                    Annotater
                </Button>
                <Button size="large">
                    Client
                </Button>
                <Button size="large">
                    Verificator
                </Button>
            </div>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                    <Input name="password" label="Password" handleChange={handleChange} type={ showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        Confirm
                    </Button>
            </form>
        </Paper>
    </Container>
    )
}

export default LoginForm;