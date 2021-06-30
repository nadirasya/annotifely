import React from 'react';
import { TextField, Grid, CircularProgress } from '@material-ui/core'

const Input = ({ half, name, handleChange, label, multiline, type, value, rows}) => {
    return (
        <Grid item xs={12} sm={ half ? 4 : 12 }>
            {
                value !== undefined ?
                <TextField 
                    name={name}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    // label={label}
                    multiline={multiline}
                    rows={rows}
                    type={type}
                    value={value}
                    disabled
                />
                :
                <CircularProgress/>
            }
            
        </Grid>
    )
}

export default Input;