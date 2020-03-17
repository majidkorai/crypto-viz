import React from "react";
import { Switch, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
import PropTypes from "prop-types";
import Home from "../Home";
import About from "../About";
import NotFound from "../NotFound";

function AppContent({ store }) {
  return (
    <Container>
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route exact path="/">
          <Home store={store} />
        </Route>
        <Route path="*" component={NotFound} />
      </Switch>
    </Container>
  );
}

AppContent.propTypes = {
  store: PropTypes.objectOf(PropTypes.object).isRequired
};

export default AppContent;
