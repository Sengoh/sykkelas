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
      <NavBar brand="Sykkelutleie AS">
      <Card title="Sykkelutleie AS"><NavBar.Link to="/login">Logg inn for ansatte</NavBar.Link></Card>
        <a href='./Tharmika.html'>Tharmika</a>
        <NavBar.Link to="/Natharek.html">Natharek</NavBar.Link>
        <NavBar.Link to="/William.html">William</NavBar.Link>
        <NavBar.Link to="/Henrik.html">Henrik</NavBar.Link>
        <NavBar.Link to="/Sivert">Sivert</NavBar.Link>
        <NavBar.Link to="/aktive">Aktive bestillinger</NavBar.Link>
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
      <Route exact path="/login" render={()=>{window.location.href="login.html"}} />
      <Route exact path="/aktive" render={()=>{window.location.href="aktive.html"}} />

      {/*Eksisterende kunde*/}
        <Route exact path="/Sivert" component={AktiveBestillinger} />
        <Route exact path="/kunde/:id" component={Test} />
    </div>
  </HashRouter>,
  document.getElementById('landing')
);
//<Route exact path="/Sivert" render={()=>{window.location.href="Sivert.html"}} />
