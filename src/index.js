import React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { connection } from "./mysql_connection"
import { Card, List, Row, Column, NavBar, Button, Form } from './widgets';
import LogIn from './login.js';
import { ansatteService } from './services';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student


ReactDOM.render(
  <HashRouter>
    <div>
      <LogIn/>
    </div>
  </HashRouter>,
  document.getElementById('landing')
);
