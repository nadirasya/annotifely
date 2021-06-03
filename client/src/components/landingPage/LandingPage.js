import React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import useStyles from "./style";
import Header from './Header';
import Main from './Main';
import Footer from './Footer'

const LandingPage = () => {
  const classes = useStyles();

  return (
    <div>
        <CssBaseline />
            <Container maxWidth="lg">
                {/* header */}
                <Header />                
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