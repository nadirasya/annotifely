import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Grid, Typography, ButtonBase } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import ConfirmationForm from '../ConfirmationForm/ConfirmationForm';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createTask } from '../../actions/tasks';
import Input from './Input';
import useStyles from './styles';

const initialState = { UrlImage: [], title: '', label: '', instruction: '', timespan: ''};

const TaskForm= () => {
    const [taskData, setTaskData] = useState(initialState);
    const [picture, setPicture] = useState(null);
    const [pictureError, setPictureError] = useState(false);
    const [url, setUrl] = useState('');
    const [onPreviewUrl, setOnPreviewUrl] = useState(null);
    const [confirmation, setConfirmation] = useState(false);

    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createTask(taskData, history)); 
        history.push('/client')
    };

    const handleChange = (e) => {
        setTaskData({ ...taskData, [e.target.name] : e.target.value });
    };

    function checkIfImageExists(url, callback) {
        const img = new Image();
        
        img.src = url;
        
        if (img.complete) {
          callback(true);
        } else {
          img.onload = () => {
            callback(true);
          };
          img.onerror = () => {
            callback(false);
          };
        }
      }

    const onChangePicture = e => {
        setUrl(e.target.value)
        if (e.target.value) {
            checkIfImageExists(e.target.value, (exists) => {
                if (exists) {
                    setPictureError(false);
                    setPicture(e.target.value);
                } else {
                    setPictureError(true);
                }
              });
        } else {
            setPicture(null);
            setPictureError(false);
        }
    };

    const onPressAddImage = () => {
        if (picture) {
            checkIfImageExists(picture, (exists) => {
                if (exists) {
                    setUrl('');
                    const currentImages = taskData.UrlImage;
                    currentImages.push(picture);
                    setTaskData({ ...taskData, ['UrlImage'] : currentImages});
                    setPicture(null);
                    setPictureError(false);
                }
              });
        } 
    }
    
    const handleSelectImage = (index) => {
        setUrl(taskData.UrlImage[index]);
        setPicture(taskData.UrlImage[index]);
        setOnPreviewUrl(index);
    }

    const handleRemoveImage = () => {
        setConfirmation(true)
    }

    const handleCancelRemoveImage = () => {
        setConfirmation(false)
    }

    const onRemoveImage = (index) => {
        console.log("remove", index);
        const imageUrlTemp = taskData.UrlImage;
        imageUrlTemp.splice(index);
        console.log(imageUrlTemp)
        setTaskData({ ...taskData, ['UrlImage'] : imageUrlTemp});
    }

    const onPressCloseImage = () => {
        setOnPreviewUrl(null);
        setUrl('');
        setPicture(null);
    }

    

    return (
        // <Container maxWidth="lg">
        <div className={classes.paper}>
            <Typography variant="h4"><b>Add New Task</b></Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={6}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" className={classes.label} htmlFor="form-image">Image URL</Typography>
                    <div className={classes.imageUrlContainer}>
                        <Input
                            handleChange={onChangePicture}
                            type="text"
                            label="Image URL"
                            name="UrlImage"
                            value={url}
                            disabled={ onPreviewUrl !== null ? true : false}
                            isRequired={false}
                        />
                        { onPreviewUrl !== null ?
                            <Button variant="outlined" className={classes.addButtonContainer} onClick={onPressCloseImage}>
                                <CloseIcon style={{color:'#CFCFCF'}}/>
                            </Button >
                            :
                            <Button variant="outlined" className={classes.addButtonContainer} onClick={onPressAddImage}>
                                <AddIcon style={{color:'#CFCFCF'}}/>
                            </Button >
                        }
                    </div>
                    <div className={classes.imagesContainer}> 
                    {taskData.UrlImage.map((imageurl, index) => (
                        <div key={index}>
                            <ButtonGroup variant="contained" disableElevation className={classes.images}>
                                {index === onPreviewUrl ?
                                    <Button disabled>
                                        <Typography style={{color: '#CFCFCF'}}>Image {index+1}</Typography>
                                    </Button>
                                    :
                                    <Button onClick={() => handleSelectImage(index)}>
                                        Image {index+1}
                                    </Button>
                                }
                                <Button onClick={() => handleRemoveImage(index)}>
                                    {index === onPreviewUrl ?
                                        <ClearIcon style={{color: '#CFCFCF'}}/>
                                        :
                                        <ClearIcon />
                                    }
                                </Button>
                            </ButtonGroup> 
                        </div>
                    ))
                    }
                    </div>
                    
                    <Grid item >
                        {picture ? 
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} src={picture} justify="center"/>
                        </ButtonBase>
                        : 
                        <Grid item xs={12} sm={12} className={classes.imagePreview}>
                            
                            <Typography variant="h6" style={{color: '#CFCFCF'}}>
                                {pictureError === true ? "Image Not Found" : "Image Preview"}
                            </Typography>
                        </Grid>
                        }
                    </Grid>
                </Grid>
                
                <Grid item xs={12} md={6}>
                    <Grid container direction="column" justify="space-between" spacing={2}>
                        <Grid item xs>
                            <Typography variant="h6" className={classes.label} htmlFor="form-task">Task title</Typography>
                                <Input
                                    handleChange={handleChange}
                                    type="text"
                                    label="Title"
                                    name="title"
                                />
                            <Typography variant="h6" className={classes.label} htmlFor="form-label">Annotation label</Typography>
                                <Input
                                    handleChange={handleChange}
                                    type="text"
                                    label="Label"
                                    name="label"    
                                />

                            <Typography variant="h6" className={classes.label} htmlFor="form-instruction">Task Instruction</Typography>
                                <Input
                                    handleChange={handleChange}
                                    type="text"
                                    label="Instruction"
                                    name="instruction"
                                    multiline={true}
                                    rows={10}
                                />
                        <Grid container spacing={1}>
                        {/* <Grid item xs={12} sm={3}> */}
                            <Typography variant="h6" className={classes.label} htmlFor="form-timespan">Task timespan</Typography>
                            <div className={classes.daysContainer}>
                                <Input
                                    handleChange={handleChange}
                                    type="number"
                                    label="Timespan"
                                    name="timespan"
                                    InputProps={{ inputProps: { min: 1} }}
                                />
                                <Typography variant="h6" style={{alignSelf: 'center', marginLeft: '5px'}}> Days </Typography>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}>
                                    <Typography variant="h6">
                                        Submit
                                    </Typography>
                                </Button>
                            </div>
                            {/* </Grid> */}
                        </Grid>
                </Grid>
                </Grid>
            </Grid>
            </Grid>
            </form>
            { confirmation == true ? 
                <ConfirmationForm message="Are you sure you want to delete this image?" handleClickCancel={handleCancelRemoveImage} handleClickConfirm={handleRemoveImage} confirmationForm={true}/> : null
            }
      </div>
  
    );
}

export default TaskForm;