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

//win.loadUrl(`file://${__dirname}/page.html`);

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Home extends Component {
  render() {
    return <Card title="Sykkelutleie AS">Logg inn for ansatte</Card>;
  }
}


class AktiveBestillinger extends Component {
  kundenr = "";
  epost = "";
  tlf = "";
  where = [];
  sql = "";
  whereState = "";
  i = 0;
  j = 0;
  len = 0;
  kunder = [];
  tabell = "";

  render() {
    return (
      <div>
        <input id='kundenummer' placeholder='Kundenummer' type='text'onChange={this.finnKunde} />
        <input id='epost' placeholder='Epost' type='text' onChange={this.finnKunde}/>
        <input id='telefon' placeholder='Telefon' type='text' onChange={this.finnKunde}/>
          <table className='table table-hover'>
          <thead>
            <tr>
              <th style={{width: 1 + 'em'}} scope="col">Kundenummer</th>
              <th scope="col"><NavLink to={'/kunder/'}></NavLink>Navn</th>
              <th scope="col">Epost</th>
              <th scope="col">Telefon</th>
              <th scope="col">Addresse</th>
            </tr>
          </thead>
          <tbody id="info">
          </tbody>
        </table>
      </div>
    )
  }
  finnKunde() {
    this.where = [];
    this.kundenr = kundenummer.value;
    this.epost = epost.value;
    this.tlf = telefon.value;
    this.whereState = "";
    this.sql = "select * from kunder where";
    this.tabell = "";
    this.j = 0;
    info.innerHTML = "";

    if(this.kundenr != ""){
	     this.where.push(" brukerid LIKE '%"+this.kundenr+"%'");
    }
    if(this.epost != ""){
 	     this.where.push(" epost LIKE '%"+this.epost+"%'");
    }
    if(this.tlf != ""){
  	   this.where.push(" telefon LIKE '%"+this.tlf+"%'");
    }
    this.len = this.where.length-1;
    for(this.i=0;this.i<(this.where.length-1);this.i++){
	     this.whereState += this.where[this.i] + " AND ";
     }
     this.whereState += this.where[this.where.length-1];
     this.sql += this.whereState + ";";
     if(this.kundenr == "" && this.epost == "" && this.tlf == "") {
     } else {
       this.kundeInfo();
     }

  }

  kundeInfo() {
    connection.query(this.sql,(error, results) => {
      if (error) return console.error(error);
      this.kunder = results;
      if(this.kunder.length>0) {
      for(this.j = 0;this.j<this.kunder.length;this.j++) {
        // console.log(this.j);

        this.tabell += "<tr>";
        this.tabell += "<td>""+this.kunder[this.j].brukerid+"</td>";
        this.tabell += "<td>" + this.kunder[this.j].fornavn + " " + this.kunder[this.j].etternavn + "</td>";
        this.tabell += "<td>" + this.kunder[this.j].epost + "</td>";
        this.tabell += "<td>" + this.kunder[this.j].telefon + "</td>";
        this.tabell += "<td>" + this.kunder[this.j].addresse + "</td>";
        this.tabell += "</tr>";
       }
     }
     info.innerHTML = this.tabell;
   });
  }

  changePath() {
    this.props.history.push('/kunder');
  }

}

class Test extends Component {
  render() {
    return(
      <div>
      <NavLink to={'/'}>test</NavLink>  test
      </div>
    )
  }
}

ReactDOM.render(
  <HashRouter>
    <div>
    <Route exact path="/" component={Home} />

      <AktiveBestillinger />
    <Route exact path="/kunder" component={Test} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
