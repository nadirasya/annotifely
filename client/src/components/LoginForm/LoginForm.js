import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, CardMedia, Container, Grid } from '@material-ui/core';

import Input from './Input';
import useStyles from './styles';

const initialState = { email: '', password: '' };

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
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                    <Input name="password" label="Password" handleChange={handleChange} type={ showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        Confirm
                    </Button>
                    {/* <Grid container justify="flex-end">
                        <Grid>
                            <Button onClick={switchMode}>
                                { isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid> */}
            </form>
        </Paper>
    </Container>
    )
}

export default LoginForm;