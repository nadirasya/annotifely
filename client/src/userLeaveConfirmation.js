import React from 'react';
import * as ReactDOM from "react-dom";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme';

const UserLeaveConfirmation = (message, callback, confirmOpen, setConfirmOpen) => {
    const container = document.createElement("div");
    container.setAttribute("custom-confirmation-navigation", "");
    document.body.appendChild(container)

    const handleConfirm = (callbackState) => {
        ReactDOM.unmountComponentAtNode(container);
        callback(callbackState);
        setConfirmOpen(false);
    };

    const handleCancel = () => {
        ReactDOM.unmountComponentAtNode(container);
        callback();
        setConfirmOpen(false);
      };

    ReactDOM.render(
        <ThemeProvider theme={theme}>
        <Dialog
          open={confirmOpen}
          onClose={handleCancel}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"You may have unsaved changes"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <b>{message}</b>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleConfirm} color="primary" variant="outlined">
              OK
            </Button>
            <Button onClick={handleCancel} color="primary" autoFocus variant="contained" disableElevation>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        </ThemeProvider>, 
        container
    );
};

export default UserLeaveConfirmation;