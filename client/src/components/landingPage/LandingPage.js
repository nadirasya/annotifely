import React, { useState, useRef, useEffect } from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import useStyles from "./style";
import Header from './Header';
import Main from './Main';
import Footer from './Footer'
import LoginForm from "../LoginForm/LoginForm";


const LandingPage = () => {
  const classes = useStyles();

  const [loginForm, setLoginForm] = useState(false);

  const handleShowLoginForm = () => setLoginForm((prevLoginForm) => !prevLoginForm);

  function useOutsideAlerter(ref) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
               setLoginForm(false)
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

      return <div ref={wrapperRef} onClick={props.onClick}>{props.children}</div>;
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
          <CssBaseline />
          <Container maxWidth="lg">
          {/* header */}
          <Header handleShowLoginForm={handleShowLoginForm}/>                
          {/* body */}
          <main>
            <Main />
          </main>
          </Container>
          {/* footer */}
          <Footer />
    </div>
  );
}

export default LandingPage;