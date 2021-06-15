import React, { useState, useRef, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import useStyles from "./style";
import Header from './Header';
import Main from './Main';
import Footer from './Footer'
import LoginForm from "../LoginForm/LoginForm";
import ClientForm from "../RegisterForm/ClientForm";
import AnnotaterForm from "../RegisterForm/AnnotaterForm";


const LandingPage = () => {
  const classes = useStyles();
  const history = useHistory();

  const [loginForm, setLoginForm] = useState(false);
  const [clientRegisterForm, setClientRegisterForm] = useState(false);
  const [annotaterRegisterForm, setAnnotaterRegisterForm] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile'))); 


  const handleShowLoginForm = () => setLoginForm((prevLoginForm) => !prevLoginForm);
  const handleShowRegisterClientForm = () => setClientRegisterForm(true);
  const handleShowRegisterAnnotaterForm = () => setAnnotaterRegisterForm(true);

  useEffect(() => {
      if(user?.role === "annotater") {
          history.push('/annotater')
      } else if(user?.role === "client") {
          history.push('/client')
      }
  }, [])
  
  function useOutsideAlerter(ref) {

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
               setLoginForm(false) || setClientRegisterForm(false) || setAnnotaterRegisterForm(false)
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

  /**
   * Component that alerts if you click outside of it
   */
  function OutsideAlerter(props) {
      const wrapperRef = useRef(null);
      useOutsideAlerter(wrapperRef);

      return (
        <Container component="main" maxWidth="xs">
          <div ref={wrapperRef} onClick={props.onClick}>{props.children}</div>
        </Container>
      )
  }
  
  return (
    <div>
      {
        loginForm ?
        <div className={classes.loginFormContainer}>
          <OutsideAlerter>
            <LoginForm />
          </OutsideAlerter>
        </div>
        :   null    }
        {
          clientRegisterForm ?
            <div className={classes.registerFormContainer}>
              <OutsideAlerter>
                <ClientForm />
              </OutsideAlerter>
            </div>
            : null }
          {
          annotaterRegisterForm ?
            <div className={classes.registerFormContainer}>
              <OutsideAlerter>
                <AnnotaterForm />
              </OutsideAlerter>
            </div>
            : null }
          <CssBaseline />
          <Container className={classes.container}>
          <Header handleShowLoginForm={handleShowLoginForm}/>                
          <main>
            <Main />
          </main>
          </Container>
          <Footer 
            handleShowRegisterClientForm={handleShowRegisterClientForm}
            handleShowRegisterAnnotaterForm={handleShowRegisterAnnotaterForm}
          />
    </div>
  );
}

export default LandingPage;