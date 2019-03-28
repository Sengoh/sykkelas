import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { connection } from "./mysql_connection"
import { Card, List, Row, Column, NavBar, Button, Form } from './widgets';
import { ansatteService } from './services';
import {AktiveBestillinger, Test} from './aktive';
import AnsattM from './startMeny';
import Side2 from './tharmika';
import AktivBestilling from './natharek';
import Statistikk from './Statistikk';
import {BestEdit, BestDetails} from './endreBestilling';


import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student


class Home extends Component {
  render() {
    return (
      <AnsattM>
        <Nav/ >
      </AnsattM>
    );
  }
}


class Nav extends Component {
  render() {
    return (
      <NavBar to="/aMeny" brand="Sykkelutleie AS">
        <NavBar.Link to="/regB">Registrer bestilling THAR</NavBar.Link>
        <NavBar.Link to="/Sivert">Registrer bestilling SIV</NavBar.Link>
        <NavBar.Link to="/nat">Aktiv bestilling</NavBar.Link>
        <NavBar.Link to="/stat">Statistikk</NavBar.Link>
        <NavBar.Link to="/loggut">Logg ut</NavBar.Link>
      </NavBar>

    );
  }
}



ReactDOM.render(
  <HashRouter>
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/(regB|Sivert|nat)" component={Nav} />
      <Route exact path="/regB" component={Side2} />
      <Route exact path="/aMeny" component={AnsattM} />
      <Route exact path="/Sivert" component={AktiveBestillinger} />
      <Route exact path="/nat" component={AktivBestilling} />
      <Route exact path="/stat" component={Statistikk} />
      <Route exact path="/loggut" render={()=>{window.location.href="public/login.html"}} />
      <Route exact path="/kunde/:leieid/edit" component={Nav} />
      <Route exact path="/kunde/:leieid/edit" component={BestEdit} />


      <Route exact path="/kunde/:id" component={Test} />
    </div>
  </HashRouter>,
  document.getElementById('landing')
);
//<Route exact path="/Sivert" render={()=>{window.location.href="Sivert.html"}} />
