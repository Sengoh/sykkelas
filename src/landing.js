import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { connection } from "./mysql_connection"
import { Card, List, Row, Column, NavBar, Button, Form } from './widgets';
import { ansatteService } from './services';
import {AktiveBestillinger, Test} from './aktive';


import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Menu extends Component {
  render() {

  }
}

class Home extends Component {
  render() {
    return (
      <NavBar brand="WhiteBoard">
      <Card title="Sykkelutleie AS">Logg inn for ansatte</Card>
        <NavBar.Link to="/Tharmika.html">Tharmika</NavBar.Link>
        <NavBar.Link to="/Natharek.html">Natharek</NavBar.Link>
        <NavBar.Link to="/William.html">William</NavBar.Link>
        <NavBar.Link to="/Henrik.html">Henrik</NavBar.Link>
        <NavBar.Link to="/Sivert">Sivert</NavBar.Link>
        <NavBar.Link to="/aktive.html">Aktive bestillinger</NavBar.Link>
      </NavBar>

    );
  }
}



ReactDOM.render(
  <HashRouter>
    <div>
    <Route exact path="/" component={Home} />
    {/*Bestillinger'*/}
      {/*Ny kunde*/}

      {/*Eksisterende kunde*/}
        <Route exact path="/Sivert" component={AktiveBestillinger} />
        <Route exact path="/kunde/:id" component={Test} />
    </div>
  </HashRouter>,
  document.getElementById('landing')
);
//<Route exact path="/Sivert" render={()=>{window.location.href="Sivert.html"}} />
