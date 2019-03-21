import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { connection } from "./mysql_connection";
import { Card, List, Row, Column, NavBar, Button, Form } from './widgets';
import {bikeService} from './services';
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import


import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Menu extends Component {
  render() {
    return (
      <table>
        <tbody>
          <tr>
            <td>
              <NavLink exact activeStyle={{ color: 'darkblue' }} to="/">
                Henrik
              </NavLink>
            </td>
            <td>
              <NavLink activeStyle={{ color: 'darkblue' }} to="/sykler">
                Sykler
              </NavLink>
            </td>
            <td>
              <NavLink activeStyle={{ color: 'darkblue' }} to="/courses">
                Courses
              </NavLink>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

/*<button className="btn btn-primary btn-large centerButton"
type="submit" autoFocus onClick={e => this.input = event.target.value}>Send</button>*/

class Home extends Component {
  render() {
    return <div>Welcome to WhiteBoard</div>;
  }
}

class BikeList extends Component {
  sykler = [];

  render() {
    return (
      <div>
      <List title='sykler'>
      <Row>
        <ul>
          {this.sykler.map(sykkel => (
            <li key={sykkel.id}>
              <NavLink activeStyle={{ color:'darkblue'}} to={'/sykler/' + sykkel.id}>
                {sykkel.merke}
              </NavLink>
            </li>
          ))}
        </ul>

        <ul>
          {this.sykler.map(sykkel => (
            <div key={sykkel.id}>
              <NavLink activeStyle={{ color:'darkblue'}} to={'/sykler/' + sykkel.id}>
                {sykkel.status}
              </NavLink>
            </div>
          ))}
        </ul>
        </Row>
        </List>
        <button type="button">
          New
        </button>
      </div>
    );
  }

  mounted() {
    bikeService.getBikes(sykler => {
      this.sykler = sykler;
    });
  }
}




ReactDOM.render(
  <HashRouter>
    <div>
    <Menu />
    <Route exact path="/" component={Home} />
    <Route exact path="/sykler" component={BikeList} />
    </div>
  </HashRouter>,
  document.getElementById('admin')
);
    // <Route exact path="/" component={Home} />
