import React from 'react';
import { TextField, Grid } from '@material-ui/core'

const Input = ({ half, name, handleChange, label, multiline, type, value, rows, isRequired, InputProps}) => {
    return (
        <Grid item xs={12} sm={ half ? 4 : 12 }>
            <TextField 
                name={name}
                onChange={handleChange}
                variant="outlined"
                required={isRequired === false ? false : true}
                fullWidth
                label={label}
                multiline={multiline}
                rows={rows}
                type={type}
                value={value}
                InputProps={InputProps}
            />
        </Grid>
    )
}

export default Input;