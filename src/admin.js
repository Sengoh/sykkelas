import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { connection } from "./mysql_connection";
import { Card, List, Row, Column, NavBar, Button, Form } from './widgets';
import {bikeService} from './bikeservice';
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
          </tr>
        </tbody>
      </table>
    );
  }
}

/*<button className="btn btn-primary btn-large centerButton"
type="submit" autoFocus onClick={e => this.input = event.target.value}>Send</button>*/

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
                {sykkel.id}
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
      console.log(sykler);
    });
  }
}

class BikeDetails extends Component {
  sykkel = [];

  render() {
    if (!this.sykkel) return null;

    return (
      <div>
      <li>
      {this.props.match.params.id}
      {this.sykkel}
      </li>
      </div>
    );
  }


  mounted() {
    bikeService.getBikedetails(this.props.match.params.id, sykkel => {
      this.sykkel = sykkel;
      console.log(sykkel);
    });
  }
}



    //
ReactDOM.render(
  <HashRouter>
    <div>
    <Menu />
    <Route exact path="/sykler" component={BikeList} />
    <Route exact path="/sykler/:id/" component={BikeDetails} />
    </div>
  </HashRouter>,
  document.getElementById('admin')
);
    // <Route exact path="/" component={Home} />
