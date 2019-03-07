import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import {styles} from './style.js';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student



class LogIn extends Component {
  render() {
    return (
      <div>
        <div style={styles.DottedBox}>
          <p style={styles.DottedBox_content}>Get started with CSS styling</p>
          </div>
        <div>
        <input type='text' style={styles.LogInBox}/>
        </div>
        </div>
    );
  }
}



ReactDOM.render(
  <HashRouter>
    <div>
      <LogIn />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
