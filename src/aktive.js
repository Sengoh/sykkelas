import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { connection } from "./mysql_connection"
import { Card, List, Row, Column, NavBar, Button, Form } from './widgets';
import { ansatteService } from './services';
import { kundeService } from './services';

//import {styles} from './style.js';
//import styles from './DottedBox.css';

//import {loginstyle} from "./login.css";

//win.loadUrl(`file://${__dirname}/page.html`);

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Home extends Component {
  render() {
    return(
      <Card title="Sykkelutleie AS">Logg inn for ansatte</Card>
    )
  }
}


class AktiveBestillinger extends Component {
  kundenr = null;
  epost = null;
  tlf = null;
  where = [];
  sql = "select * from kunder";
  whereState = "";
  i = 0;
  kunder = [];

  render() {
    return (
      <div>
      <Card>
      <form className="row">
      <div className="form-group col">
        <input id='kundenummer' className="form-control" placeholder='Kundenummer' type='text'onInput={this.finnKunde} />
      </div>
      <div className="form-group col">
        <input id='epost' className="form-control" placeholder='Epost' type='text' onInput={this.finnKunde}/>
      </div>
      <div className="form-group col">
        <input id='telefon' className="form-control" placeholder='Telefon' type='text' onInput={this.finnKunde}/>
      </div>
      </form>
      </Card>
          <table className='table table-hover'>
          <thead>
            <tr>
              <th style={{width: 1 + 'em'}} scope="col">Kundenummer</th>
              <th scope="col"><NavLink to={'/kunder/'}></NavLink>Navn</th>
              <th scope="col">Epost</th>
              <th scope="col">Telefon</th>
              <th scope="col">Addresse</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
          {this.kunder.length>0 ?
            this.kunder.map(kunder => (
              <tr key={kunder.brukerid} onClick={()=>history.push("/kunde/"+ kunder.brukerid)}>
                <td>{kunder.brukerid}</td>
                <td>{kunder.fornavn} {kunder.etternavn}</td>
                <td>{kunder.epost}</td>
                <td>{kunder.telefon}</td>
                <td>{kunder.addresse}, {kunder.postnr} {kunder.poststed}</td>
                <td><button className="btn btn-primary m-2"><NavLink to={"/kunde" + kunder.brukerid} style={{color:'white',textDecoration:'none'}}>Velg</NavLink></button></td>
              </tr>
            )) : <tr><td colSpan="2">Ingen kunder funnet</td></tr>
          }
          </tbody>
        </table>
      </div>
    );
  }
  //onClick={()=>history.push("/kunde/"+ kunder.brukerid)}
  finnKunde() {
    this.where = [];
    this.kundenr = kundenummer.value;
    this.epost = epost.value;
    this.tlf = telefon.value;
    this.whereState = "";
    this.sql = "select * from kunder where";

    if(this.kundenr != " "){
	     this.where.push(" brukerid LIKE '%"+this.kundenr+"%'");
    }
    if(this.epost != " "){
 	     this.where.push(" epost LIKE '%"+this.epost+"%'");
    }
    if(this.tlf != " "){
  	   this.where.push(" telefon LIKE '%"+this.tlf+"%'");
    }
    for(this.i=0;this.i<(this.where.length-1);this.i++){
	     this.whereState += this.where[this.i] + " AND ";
     }
     this.whereState += this.where[this.where.length-1];
     this.sql += this.whereState + ";";
     connection.query(this.sql,(error, results) => {
      if (error) return console.error(error);

      this.kunder = results;
     });
     if(this.kundenr == "" && this.epost == "" && this.tlf == "") {
     } else {
     }

  }

  mounted() {
    connection.query(this.sql,(error, results) => {
     if (error) return console.error(error);

     this.kunder = results;
    });
  }

}
//{this.kunde.brukerid}
class Test extends Component {
  kunde = null;
  fraDato = null;
  dd= null;
  mm= null;
  yyyy = null;
  tilDato = null;
  hente = null;
  tid = null;
  levere = null;
  m = null;
  t = null;

  render() {
    if (!this.kunde) return null;

    return(
      <div>
        <table className='table'>
        <thead>
          <tr>
            <th style={{width: 1 + 'em'}} scope="col">Kundenummer</th>
            <th scope="col"><NavLink to={'/kunder/'}></NavLink>Navn</th>
            <th scope="col">Epost</th>
            <th scope="col">Telefon</th>
            <th scope="col">Addresse</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td>{this.kunde.brukerid}</td>
              <td>{this.kunde.fornavn} {this.kunde.etternavn}</td>
              <td>{this.kunde.epost}</td>
              <td>{this.kunde.telefon}</td>
              <td>{this.kunde.addresse}, {this.kunde.postnr} {this.kunde.poststed}</td>
              <td><Button.Danger><NavLink to="/" style={{color:'white',textDecoration:'none'}}>Avbryt</NavLink></Button.Danger></td>
            </tr>
        </tbody>
      </table>
      <Card>
      <form>
        <div className="row">
        <div className="form-group col">
          <label htmlFor="terreng">Terrengsykkel:</label>
          <input className="form-check-input" type="checkbox" onChange={()=>terreng.disabled ? terreng.disabled = false : terreng.disabled = true}/>
          <input id="terreng" style={{width: 4 + 'em'}} type="number" className="form-control" disabled /> <br />
          <Form.Label>Tandemsykkel:</Form.Label>
          <input className="form-check-input" type="checkbox" onChange={()=>tandem.disabled ? tandem.disabled = false : tandem.disabled = true} />
          <input id="tandem" style={{width: 4 + 'em'}} type="number" className="form-control" disabled /><br />
          <Form.Label>Elsykkel:</Form.Label>
          <input className="form-check-input" type="checkbox" onChange={()=>el.disabled ? el.disabled = false : el.disabled = true} />
          <input id="el" style={{width: 4 + 'em'}} type="number" className="form-control" disabled /><br />
        </div>
        <div className="form-group col">
          <Form.Label>Fra:</Form.Label>
          <input id="fra" style={{width: 11 + 'em'}} type="date" className="form-control" value={this.fraDato} onChange={this.endreDato}/>
          <Form.Label>Til:</Form.Label>
          <input id="til" style={{width: 11 + 'em'}} type="date" className="form-control" value={this.tilDato} onChange={this.endreDato}/>
        </div>
        <div className="form-group col">
          <Form.Label>Fra:</Form.Label>
          <input id="hente" style={{width: 11 + 'em'}} type="time" className="form-control" step="600" value={this.hente} onChange={this.endreTid} />
          <Form.Label>Til:</Form.Label>
          <input id="levere" style={{width: 11 + 'em'}} type="time" className="form-control" step="600" value={this.levere} onChange={this.endreTid} />
        </div>
        <div className="form-group col">
          <label>Gruppe:</label>
          <input className="form-check-input" type="checkbox" onChange={()=>gruppe.disabled ? gruppe.disabled = false : gruppe.disabled = true} />
          <input id="gruppe" style={{width: 4 + 'em'}} type="number" className="form-control" disabled /> <br />
        </div>
        </div>
        <div className="row">
        </div>
      </form>
      </Card>
      </div>
    )
  }
  endreDato() {
    this.fraDato = fra.value;
    this.tilDato = til.value;
    if(this.fraDato > this.tilDato) {
      this.tilDato = this.fraDato;
    }
    if(this.fraDato < (this.yyyy + "-0" + this.mm + "-" + this.dd)) {
      this.fraDato = (this.yyyy + "-0" + this.mm + "-" + this.dd)
    }
  }
  endreTid() {
    this.hente = hente.value;
    this.levere = levere.value;
    if(this.fraDato == this.tilDato && this.hente > this.levere) {
      this.levere = this.hente;
    }
    if(this.fraDato == (this.yyyy + "-0" + this.mm + "-" + this.dd) && this.hente < this.t + ":" + this.m) {
      this.hente = this.t + ":" + this.m;
    }
  }
  toggle(test) {
    console.log(test);
    test.value = 10;
  }
  //
  //onClick={()=>history.push("/")}
  mounted() {
    this.fraDato = new Date();
    this.dd = this.fraDato.getDate();
    this.mm = this.fraDato.getMonth()+1;
    this.yyyy = this.fraDato.getFullYear();
    console.log(this.yyyy);
    this.fraDato = this.yyyy + "-0" + this.mm + "-" + this.dd;
    console.log(this.fraDato);
    this.tilDato = this.fraDato;
    this.hente = new Date();
    this.tid = new Date();
    this.m = Math.ceil(this.tid.getMinutes()/10)*10;
    this.t = this.tid.getHours()
    if(this.m >= 60) {
      this.m = "00";
      this.t++;
    } else if (this.m >= 0 && this.m < 10) {
      this.m = "10";
    }
    this.hente = this.t + ":" + this.m;
    this.levere = this.hente;
    kundeService.getKunde(this.props.match.params.id,kunde =>{
      this.kunde = kunde;
    })
  }
}
ReactDOM.render(
  <HashRouter>
    <div>
    <Route path="/" component={Home} />

    <Route exact path="/" component={AktiveBestillinger} />

    <Route exact path="/kunde/:id" component={Test} />
    </div>
  </HashRouter>,
  document.getElementById('app')
);
//<Route exact path="/kunder" component={Test} />
