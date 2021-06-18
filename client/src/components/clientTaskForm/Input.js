import React from 'react';
import { TextField, Grid } from '@material-ui/core'

const Input = ({ half, name, handleChange, label, autoFocus, type, value, disabled, isRequired, InputProps}) => {
    return (
        <Grid item xs={12} sm={ half ? 6 : 12 }>
            <TextField 
                name={name}
                onChange={handleChange}
                variant="outlined"
                required={isRequired === false ? false : true}
                fullWidth
                label={label}
                autoFocus={autoFocus}
                type={type}
                value={value}
                disabled={disabled}
                InputProps={InputProps}
            />
        </Grid>
    )
}

export default Input;