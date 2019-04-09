import React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { Card, List, Row, Column, NavBar, Button, Form } from './widgets';
import { connection } from "./mysql_connection"
import {AktiveBestillinger, Test, Kvittering} from './aktive';
import AnsattM from './startMeny';
import BestillingsOversikt from './komponenter/BestillingsOversikt';
import {EndreBestilling, BestDetails} from './komponenter/EndreBestilling';
import {Best, BestMeny} from './komponenter/bestilling';
import { ansatteService } from './services';


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
      <AnsattM />
    );
  }
}

class Nav extends Component {
  ansattid = 0;
  ansatt = null;
  render() {
    if(!this.ansatt) return null;

    return (
      <NavBar to="/aMeny" brand="SykkelUtleie AS">
        <NavBar.Link to="/regB">Registrer bestilling</NavBar.Link>
        <NavBar.Link to="/bestillingsOversikt">Bestillingsoversikt</NavBar.Link>
        <NavBar.Link to="/loggut">Logg ut</NavBar.Link>
        <span className="nav-link" onClick={this.loggUt}>Logg ut</span>
        <span className="nav-link" style={{position: 'absolute', right: 0}}>Ansatt: {this.ansatt.fornavn} {this.ansatt.etternavn}</span>

      </NavBar>
    );
  }
  loggUt() {
    window.location.href="public/index.html"
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
      <Route exact path="/aMeny" component={AnsattM} />
      <Route exact path="/(regB|nyKunde|eksisKunde|bestillingsOversikt|register)" component={Nav} />

      <Route exact path="/regB" component={BestMeny} />
      <Route exact path="/nyKunde" component={Best} />
      <Route exact path="/eksisKunde" component={AktiveBestillinger} />

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
