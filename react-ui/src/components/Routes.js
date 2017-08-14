import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';

import Section from './Section';

const Routes = (props) => {
  const routes = props.links.map((k) => {
    if(k === "home"){
      return (
        <Route key={`route${k}`} exact path="/" render={ () => (
          <Section
            section={k}
            data={props.data[k]}
            user={props.user}
            message={props.message}

            updateState={props.updateState}
          />) }
        />);
    }
    else {
      return (
        <Route key={`route${k}`} path={`/${k}`} render={ () => (
          <Section
            section={k}
            data={(k === "login") ? [] : props.data[k]}
            user={props.user}
            message={props.message}

            updateState={props.updateState}
          />) }
        />);
    }
  });

  return (
    <Switch>
      {routes}
      <Route render={ () => (
        <Redirect to="/" />
      )} />
    </Switch>
  );
};

export default Routes;

Routes.propsTypes = {
  links: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,

  updateState: PropTypes.func.isRequired
};
