import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import {styles} from './style.js';
import {loginstyle} from "./login.css";

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student



class LogIn extends Component {
  render() {
    return (
      <div>
        <div style={styles.DottedBox}>
          <p style={styles.DottedBox_content}>Get started</p>
          </div>
<form class='login-form'>
  <div class="flex-row">
    <label class="lf--label" for="username">
      <svg x="0px" y="0px" width="12px" height="13px">
      </svg>
    </label>
    <input id="username" class='lf--input' placeholder='Username' type='text'/>
  </div>
  <div class="flex-row">
    <label class="lf--label" for="password">
      <svg x="0px" y="0px" width="15px" height="5px">
      </svg>
    </label>
    <input id="password" class='lf--input' placeholder='Password' type='password'/>
  </div>
  <input class='lf--submit' type='submit' value='LOGIN'/>
</form>
<a class='lf--forgot' href='#'>Forgot password?</a>
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
