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
        e.preventDefault();
        
        console.log(formData)
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name] : e.target.value });
    };

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    
    return (
        <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Typography variant="h4" style={{marginBottom: '8px'}}>
                <b>Login as</b>
            </Typography>
            <div className={classes.roleButtonContainer} >
                <Button size="large">
                    <Typography variant="h6" color={ formData.role === "annotater" ? "inherit" : "primary"} onClick={() => {setFormData({...formData, role: "annotater"})}}>
                        <b>Annotater</b>
                    </Typography>
                </Button>
                <Button size="large">
                    <Typography variant="h6" color={ formData.role === "client" ? "inherit" : "primary"} onClick={() => {setFormData({...formData, role: "client"})}}>
                        <b>Client</b>
                    </Typography>
                </Button>
                <Button size="large">
                    <Typography variant="h6" color={ formData.role === "verificator" ? "inherit" : "primary"} onClick={() => {setFormData({...formData, role: "verificator"})}}>
                        <b>Verificator</b>
                    </Typography>
                </Button>
            </div>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                    <Input name="password" label="Password" handleChange={handleChange} type={ showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                    </Grid>
                    <div className={classes.buttonContainer}>
                        <Button type="submit"  variant="contained" color="primary" className={classes.submit} onClick={() => {console.log(formData)}}>
                            <Typography variant="h6">
                               Confirm
                            </Typography>
                            
                        </Button>
                    </div>
                    
            </form>
        </Paper>
    </Container>
    )
}

export default LoginForm;