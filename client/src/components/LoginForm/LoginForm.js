import React, {  useState } from 'react';
import { Typography, Paper, Grid, Button, Slide } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';

import { signinAnnotater, signinVerificator, signinClient } from '../../actions/auth';
import Input from './Input';
import useStyles from './styles';

const initialState = { email: '', password: '', role: 'annotater'};

const LoginForm = ({loginForm}) => {
    const [formData, setFormData] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);

    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [accountValid, setAccountValid] = useState(true);



    const handleSubmit = async(e) => {
        e.preventDefault();
        
        if(formData.role==="annotater"){
            await dispatch(signinAnnotater(formData, history))
            if (!user){
                setAccountValid(false)
            }
        } 
        else if (formData.role==="client"){
            await dispatch(signinClient(formData, history));
            if (!user){
                setAccountValid(false)
            }
        }
        else {
            await dispatch(signinVerificator(formData, history));
            if (!user){
                setAccountValid(false)
            }
        }
        // dispatch(signup(formData, history));
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name] : e.target.value });
        setAccountValid(true);
    };

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    
    return (
        // <Container component="main" maxWidth="xs">
        <Slide in={loginForm} direction="down">
        <Paper className={classes.paper} elevation={3}>
            <Typography variant="h4" style={{marginBottom: '8px'}}>
                <b>Login as</b>
            </Typography>
            <div className={classes.roleButtonContainer} >
                <Button size="large">
                    <Typography variant="h6" color={ formData.role === "annotater" ? "primary" : "secondary"} onClick={() => {setFormData({...formData, role: "annotater"})}}>
                        <b>Annotater</b>
                    </Typography>
                </Button>
                <Button size="large">
                    <Typography variant="h6" color={ formData.role === "client" ? "primary" : "secondary"} onClick={() => {setFormData({...formData, role: "client"})}}>
                        <b>Client</b>
                    </Typography>
                </Button>
                <Button size="large">
                    <Typography variant="h6" color={ formData.role === "verificator" ? "primary" : "secondary"} onClick={() => {setFormData({...formData, role: "verificator"})}}>
                        <b>Verificator</b>
                    </Typography>
                </Button>
            </div>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    { !accountValid ?    
                        <div className={classes.alertContainer}>
                            <Alert severity="error">Invalid email or password.</Alert>
                        </div>
                        : null
                    }
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                    <Input name="password" label="Password" handleChange={handleChange} type={ showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                    </Grid>
                    <div className={classes.buttonContainer}>
                        <Button type="submit"  variant="contained" color="primary" className={classes.submit}>
                            <Typography variant="h6">
                               Confirm
                            </Typography>
                        </Button>
                    </div>     
            </form>
        </Paper>
        </Slide>
    // </Container>
    )
}

export default LoginForm;