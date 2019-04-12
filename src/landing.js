import React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { Card, List, Row, Column, NavBar, Button, Form } from './widgets';
import { connection } from "./mysql_connection"
import {KundeOversikt,BestillingSkjema,Kvittering} from './komponenter/BestillingEksiKunde';
import AnsattM from './komponenter/StartMeny';
import BestillingsOversikt from './komponenter/BestillingsOversikt';
import {EndreBestilling, BestDetails} from './komponenter/EndreBestilling';
import {Best, BestMeny} from './komponenter/bestilling';
import { ansatteService } from './services';
import { LagerMeny, BikeList, BikeDetails, Utleie } from './komponenter/Lager';


let remote = require('electron').remote;
let session = remote.session;

import createHashHistory from "history/createHashHistory";
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student
let ansattid;
session.defaultSession.cookies.get({name:"ansatt"},(err,cookies) => {
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
    if(!this.ansatt) return (
      <NavBar to="/aMeny" brand="SykkelUtleie AS">
        <NavBar.Link to="/regB">Registrer bestilling</NavBar.Link>
        <NavBar.Link to="/bestillingsOversikt">Bestillingsoversikt</NavBar.Link>
        <NavBar.Link to="/admin">Lager</NavBar.Link>
        <span className="nav-link active" onClick={this.loggUt} style={{cursor: 'pointer', position: 'absolute', right: 0}}>Logg ut <i className="fas fa-sign-out-alt fa-inverse"></i></span>

      </NavBar>
    );

    return (
      <NavBar to="/aMeny" brand="SykkelUtleie AS">
        <NavBar.Link to="/regB">Registrer bestilling</NavBar.Link>
        <NavBar.Link to="/bestillingsOversikt">Bestillingsoversikt</NavBar.Link>
        <NavBar.Link to="/admin">Lager</NavBar.Link>

        <span className="nav-link active" onClick={this.loggUt} style={{cursor: 'pointer', position: 'absolute', right: 0}}>Logg ut <i className="fas fa-sign-out-alt fa-inverse"></i></span>
        <span className="nav-link" style={{position: 'absolute', right: '90px'}}>Ansatt: {this.ansatt.fornavn} {this.ansatt.etternavn}</span>

      </NavBar>
    );
  }
  loggUt() {
    window.location.href="../public/index.html"
  }
  mounted() {
    ansatteService.getLogin(ansattid,ansatt => {
      this.ansatt = ansatt;

    })
  }
}

ReactDOM.render(
  <HashRouter>
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/aMeny" component={AnsattM} />
      <Route exact path="/(regB|nyKunde|eksisKunde|bestillingsOversikt|admin|utleie|sykkel|register)" component={Nav} />

      <Route exact path="/regB" component={BestMeny} />
      <Route exact path="/nyKunde" component={Best} />
      <Route exact path="/eksisKunde" component={KundeOversikt} />

      <Route exact path="/kunde/:id" component={Nav} />
      <Route exact path="/kunde/:id" component={BestillingSkjema} />
      <Route exact path="/bestilling/:id" component={Kvittering} />
      <Route exact path="/bestilling/:id" component={Nav} />

      <Route exact path="/bestillingsOversikt" component={BestillingsOversikt} />
      <Route exact path="/bestillingsOversikt/:leieid/edit" component={Nav} />
      <Route exact path="/bestillingsOversikt/:leieid/edit" component={EndreBestilling} />

      <Route exact path="/admin" component={LagerMeny} />
      <Route exact path="/sykkel" component={BikeList} />
      <Route exact path="/sykkel/:id/" component={Nav} />
      <Route exact path="/sykkel/:id/" component={BikeDetails} />
      <Route exact path="/utleie" component={Utleie} />
      <Route exact path="/sykler" component={BikeList} />

    </div>
  </HashRouter>,
  document.getElementById("landing")
);
