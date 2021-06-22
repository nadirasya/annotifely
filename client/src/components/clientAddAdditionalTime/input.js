import React from 'react';
import { TextField, Grid, } from '@material-ui/core'

const Input = ({ half, name, handleChange, label, autoFocus,  type, InputProps }) => {
    return (
        <Grid item xs={12} sm={ half ? 6 : 12 }>
            <TextField 
                style={{width: '97%'}}
                name={name}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                label={label}
                autoFocus={autoFocus}
                type={type}
                InputProps={InputProps}
            />
        </Grid>
    )
}

export default Input;