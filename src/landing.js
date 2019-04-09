import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { connection } from "./mysql_connection"
import { Card, List, Row, Column, NavBar, Button, Form } from './widgets';
import { ansatteService } from './services';
import {AktiveBestillinger, Test, Kvittering} from './aktive';
import AnsattM from './startMeny';
import {Kunde, Bestilling} from './tharmika';
import AktivBestilling from './natharek';
import {BestEdit, BestDetails} from './endreBestilling';
import Best from './bestilling';

let remote = require('electron').remote;
let session = remote.session;

import createHashHistory from "history/createHashHistory";
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student
let ansattid;
session.defaultSession.cookies.get({},(err,cookies) => {
  if(err) console.error(err);
  console.log(cookies[0].value);
  if(cookies[0].value == 0 || cookies[0].value == null) {
    alert("Du er ikke logget. Videresender til logg inn side.")
    window.location.href = "./index.html";
  }
  ansattid = cookies[0].value;
})

class Home extends Component {
  render() {
    return (
      <AnsattM>
        <Nav />
      </AnsattM>
    );
  }
}

class Nav extends Component {
  ansattid = 0;
  ansatt = null;
  render() {
    if(!this.ansatt) return null;

    return (
      <NavBar to="/aMeny" brand="Sykkelutleie AS">
        <NavBar.Link to="/regB">Registrer bestilling THAR</NavBar.Link>
        <NavBar.Link to="/Sivert">Registrer bestilling SIV</NavBar.Link>
        <NavBar.Link to="/nat">Aktiv bestilling</NavBar.Link>
        <span className="nav-link" onClick={this.loggUt}>Logg ut</span>
        <span className="nav-link" style={{position: 'absolute', right: 0}}>Ansatt: {this.ansatt.fornavn} {this.ansatt.etternavn}</span>


      </NavBar>
    );
  }
  mounted() {
    ansatteService.getLogin(ansattid,ansatt => {
      this.ansatt = ansatt;
      console.log(ansatt);
    })
  }
}

ReactDOM.render(
  <HashRouter>
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/(regB|Sivert|nat|register)" component={Nav} />
      <Route exact path="/regB" component={Best} />

      <Route exact path="/aMeny" component={AnsattM} />
      <Route exact path="/Sivert" component={AktiveBestillinger} />
      <Route exact path="/nat" component={AktivBestilling} />

      <Route exact path="/loggut" render={()=>{window.location.href="public/index.html"}} />
      <Route exact path="/kunde/:leieid/edit" component={Nav} />
      <Route exact path="/kunde/:leieid/edit" component={BestEdit} />


      <Route exact path="/kunde/:id" component={Test} />
      <Route exact path="/bestilling/:id" component={Kvittering} />
    </div>
  </HashRouter>,
  document.getElementById("landing")
);
//<Route exact path="/Sivert" render={()=>{window.location.href="Sivert.html"}} />
