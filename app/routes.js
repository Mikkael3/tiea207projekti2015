/*
* Sahat Yalkabov
* Modified by:Joonas Vilppunen, Markus Muranen, Niko Heikkinen
* MIT Licence
* 2015
*/
import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Title from './components/Title';
import Sarja from './components/Sarja';

export default (
  <Route component={App}>
    <Route path='/' component={Home} />
    <Route path='/titles/:id' component={Title} />
    <Route path='/series/:id' component={Sarja} />
  </Route>
);
