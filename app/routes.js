import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Title from './components/Title';

export default (
  <Route component={App}>
    <Route path='/' component={Home} />
    <Route path='/titles/:id' component={Title} />
  </Route>
);
