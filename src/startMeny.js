import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { connection } from "./mysql_connection"
import { Card, List, Row, Column, NavBar, Button, Form } from './widgets';
import { ansatteService } from './services';

//import {styles} from './style.js';
//import styles from './DottedBox.css';

//import {loginstyle} from "./login.css";

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Menu extends Component {
  render() {
    return (
      <NavBar brand="Sykkelutleie AS">
        <NavBar.Link to="/students">Eventuell meny</NavBar.Link>
      </NavBar>
    );
  }
}

class Home extends Component {
  render() {
    return <Card title="Sykkelutleie AS"></Card>;
  }
}


class AnsattM extends Component {



  render() {
    return (

      <div className="container d-flex justify-content-center pt-5">

          <Card>
            <button type="button" className="btn btn-light m-2" onClick={this.routeChange1}>
              Registrer bestilling
            </button>
            <button type="button" className="btn btn-light m-2" onClick={this.routeChange2}>
              Aktive bestillinger
            </button>
            <button type="button" className="btn btn-light m-2" onClick={this.routeChange3}>
              Statistikk
            </button>
            {/*<Button.Light onClick={this.routeChange}>1</Button.Light>
            <Button.Light onClick={this.routeChange1}>2</Button.Light>*/}

          </Card>

      </div>

    );

  }
  routeChange1() {
    history.push('/regB');
  }
  routeChange2() {
    history.push('/students1');
  }
  routeChange3() {
    history.push('/students1');
  }

}

export default AnsattM
