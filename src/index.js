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
      <NavBar brand="Bestilling">
        <NavBar.Link to="/students">Students</NavBar.Link>
      </NavBar>
    );
  }
}

class Side2 extends Component {
  render() {
    return(  <div> <Card title="Bestillingsside">Registrer bestilling</Card><br/>


      Fornavn: <input type="text" value={this.fornavn} onChange={event => (this.fornavn = event.target.value)} />
      Epost: <input type="text" value={this.epost} onChange={event => (this.epost = event.target.value)} /> <br/>
      Etternavn: <input type="text" value={this.etternavn} onChange={event => (this.fornavn = event.target.value)} />

      Telefon: <input type="text" value={this.telefon} onChange={event => (this.telefon = event.target.value)} />
      Adresse: <input type="text" value={this.adresse} onChange={event => (this.adresse = event.target.value)} /> <br/><br/>

      Fra: <input type="date" value={this.start} onChange={event => (this.start = event.target.value)} />
      Hentetid: <input type="time" value={this.start} onChange={event => (this.start = event.target.value)} />
      Hentested: <input type="text" value={this.hentested} onChange={event => (this.hentested = event.target.value)} /> <br/>
      Til: <input type="date" value={this.slutt} onChange={event => (this.slutt = event.target.value)} />
      Leveringstid: <input type="time" value={this.slutt} onChange={event => (this.slutt = event.target.value)} />
      Leveringssted: <input type="text" value={this.Leveringssted} onChange={event => (this.hentested = event.target.value)} /> <br/><br/>

      Gruppe: <input type="checkbox" /> <br/>
      Antall personer: <input type="number" /> <br/><br/>


      Terrengsykkel: <input type="checkbox" /> <input type="number" /> <br/>
      Tandemsykkel: <input type="checkbox" /> <input type="number" /> <br/>
      Elsykkel for de eldre: <input type="checkbox" /> <input type="number" /> <br/><br/>

      <h6>Ekstrautstyr:</h6>
      Barnevogn: <input type="number" /> <br/>
      Barnesete: <input type="number" /> <br/>
      Bagasjevogn:<input type="number" /> <br/><br/>

      <button type="button" onClick={this.save}>
        Registrer
      </button>
        </div>

  );
}

  mounted() {

  }
}




ReactDOM.render(
  <HashRouter>
    <div>
    <Menu />
    <Route exact path="/" component={Side2} />


    </div>
  </HashRouter>,
  document.getElementById('root')
);
