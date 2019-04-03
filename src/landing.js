import React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { Card, List, Row, Column, NavBar, Button, Form } from './widgets';
import { connection } from "./mysql_connection"
import {AktiveBestillinger, Test, Kvittering} from './aktive';
import AnsattM from './startMeny';
import BestillingsOversikt from './BestillingsOversikt';
import {EndreBestilling, BestDetails} from './EndreBestilling';
import Best from './bestilling';

import createHashHistory from "history/createHashHistory";
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Home extends Component {
  render() {
    return (
      <AnsattM />
    );
  }
}

class Nav extends Component {
  render() {
    return (
      <NavBar to="/aMeny" brand="SykkelUtleie AS">
        <NavBar.Link to="/regB">Registrer bestilling ny kunde</NavBar.Link>
        <NavBar.Link to="/Sivert">Registrer bestilling eksisterende kunde</NavBar.Link>
        <NavBar.Link to="/bestillingsOversikt">Bestillingsoversikt</NavBar.Link>
        <NavBar.Link to="/loggut">Logg ut</NavBar.Link>
      </NavBar>
    );
  }
}

ReactDOM.render(
  <HashRouter>
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/aMeny" component={AnsattM} />
      <Route exact path="/(regB|Sivert|bestillingsOversikt|register)" component={Nav} />

      <Route exact path="/regB" component={Best} />

      <Route exact path="/Sivert" component={AktiveBestillinger} />
      <Route exact path="/kunde/:id" component={Test} />
      <Route exact path="/bestilling/:id" component={Kvittering} />

      <Route exact path="/bestillingsOversikt" component={BestillingsOversikt} />
      <Route exact path="/bestillingsOversikt/:leieid/edit" component={Nav} />
      <Route exact path="/bestillingsOversikt/:leieid/edit" component={EndreBestilling} />

      <Route exact path="/loggut" render={()=>{window.location.href="public/index.html"}} />




    </div>
  </HashRouter>,
  document.getElementById("landing")
);
