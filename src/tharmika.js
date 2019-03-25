import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { connection } from "./mysql_connection"
import { Card, List, Row, Column, NavBar, Button, Form } from './widgets';
import { ansatteService } from './services';
import {bestillingService } from "./services";

//import {styles} from './style.js';
//import styles from './DottedBox.css';

//import {loginstyle} from "./login.css";

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student


class Side2 extends Component {
  current = null;

  render() {
    return(  <div className="container"> <Card title="Bestillingsside">Registrer bestilling</Card><br/>
{/*
    <form >
      <div className="form-row">

         <div className="col mb-3">
           <label htmlFor="exampleInputEmail1">Fornavn</label>
           <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={this.fornavn} onChange={event => (this.fornavn = event.target.value)}/>
         </div>
         <div className="col mb-3">
           <label htmlFor="exampleInputPass">Etternavn</label>
           <input type="password" className="form-control" id="exampleInputPass" aria-describedby="emailHelp" value={this.etternavn} onChange={event => (this.etternavn = event.target.value)} />
         </div>
       </div>
      <div className="form-row">

         <div className="col mb-3">
           <label htmlFor="exampleInputEmail1">Adresse</label>
           <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={this.fornavn} onChange={event => (this.fornavn = event.target.value)}/>
         </div>
         <div className="col mb-3">
           <label htmlFor="exampleInputPass">By</label>
           <input type="password" className="form-control" id="exampleInputPass" aria-describedby="emailHelp" value={this.etternavn} onChange={event => (this.etternavn = event.target.value)} />
         </div>
         <div className="col mb-3">
           <label htmlFor="exampleInputPass">Postnummer</label>
           <input type="password" className="form-control" id="exampleInputPass" aria-describedby="emailHelp" value={this.etternavn} onChange={event => (this.etternavn = event.target.value)} />
         </div>
       </div>

         <button type="submit" onClick={this.login} className="btn btn-primary float-right">Logg inn</button>

     </form>
*/}
      Fornavn: <input type="text" value={this.fornavn} onChange={event => (this.fornavn = event.target.value)} />
      Epost: <input type="text" value={this.epost} onChange={event => (this.epost = event.target.value)} /> <br/>
      Etternavn: <input type="text" value={this.etternavn} onChange={event => (this.etternavn = event.target.value)} />

      Telefon: <input type="text" value={this.telefon} onChange={event => (this.telefon = event.target.value)} />
      Adresse: <input type="text" value={this.addresse} onChange={event => (this.addresse = event.target.value)} />
      Postnr:  <input type="text" value={this.postnr} onChange={event => (this.postnr = event.target.value)} />
      Poststed: <input type="text" value={this.poststed} onChange={event => (this.poststed = event.target.value)} /> <br/><br/>

      Fra: <input type="date" value={this.start} onChange={event => (this.start = event.target.value)} />
      Til: <input type="date" value={this.slutt} onChange={event => (this.slutt = event.target.value)} />
      Hentested:  <input type="text" value={this.hentested} onChange={event => (this.hentested = event.target.value)} />
      Hentetid: <input type="time" value={this.hente} onChange={event => (this.hente = event.target.value)} />
      Leveringssted: <input type="text" value={this.leveringssted} onChange={event => (this.leveringssted = event.target.value)} /> <br/><br/>
      Leveringstid: <input type="time" value={this.levere} onChange={event => (this.levere = event.target.value)} />

      Gruppe: <input type="checkbox" onChange={()=>gruppe.disabled ? gruppe.disabled = false : gruppe.disabled = true} /> <br/>
      Antall personer: <input id="gruppe" placeholder="0" style={{width: 8 + 'em'}} type="number" className="form-control form-control-sm" disabled /> <br/><br/>


      Terrengsykkel: <input type="checkbox" onChange={()=>this.sykkelValg(1)}/>
       <input id="terreng" placeholder='0' style={{width: 8 + 'em'}} type="number"  className="form-control form-control-sm" disabled /> <br/>
      Tandemsykkel: <input type="checkbox" onChange={()=>this.sykkelValg(2)} />
      <input id="tandem" placeholder='0' style={{width: 8 + 'em'}} type="number"  className="form-control form-control-sm" disabled /> <br/>
      Elsykkel for de eldre: <input type="checkbox" onChange={()=>this.sykkelValg(3)} />
      <input id="el" placeholder='0' style={{width: 8 + 'em'}} type="number" className="form-control form-control-sm" disabled /> <br/>

      <h6>Ekstrautstyr:</h6>
      Barnevogn: <input type="checkbox" onChange={()=>barnevogn.disabled ? barnevogn.disabled = false : gruppe.disabled = true} /> <br/>
                <input id="barnevogn" placeholder="0" style={{width: 8 + 'em'}} type="number" className="form-control form-control-sm" disabled /> <br/>
      Barnesete: <input type="checkbox" onChange={()=>barnesete.disabled ? barnesete.disabled = false : barnesete.disabled = true} /> <br/>
                <input id="barnesete" placeholder="0" style={{width: 8 + 'em'}} type="number" className="form-control form-control-sm" disabled /> <br/>
      Bagasjevogn:<input type="checkbox" onChange={()=>bagasjevogn.disabled ? bagasjevogn.disabled = false : barnevogn.disabled = true} /> <br/>
                <input id="bagasjevogn" placeholder="0" style={{width: 8 + 'em'}} type="number" className="form-control form-control-sm" disabled /> <br/>

      <Button.Success onClick={this.add} type="button">
        Registrer bestilling
      </Button.Success>
        </div>

  );
}

  sykkelValg(sykkel) {

    switch(sykkel) {
      case 1:
        if(terreng.disabled) {
          terreng.disabled = false;
        } else {
          terreng.disabled = true;
          terreng.value = 0;
        }
          break;
      case 2:
        if(tandem.disabled) {
          tandem.disabled = false;
        } else {
          tandem.disabled = true;
          tandem.value=0;
        }
          break;
      case 3:
        if(el.disabled) {
          el.disabled = false;
        } else {
          el.disabled = true;
          el.value= 0;
        }
          break;
    }
  }

  add(){

    bestillingService.addKunder(this.fornavn, this.etternavn, this.epost, this.addresse, this.postnr, this.poststed, this.telefon, () => {
      history.push("/");
    });

    bestillingService.getKunde(current => {
      this.current = current.IDENTITY;
      console.log(this.current);
      bestillingService.addLeietaker(this.start + " " + this.hente + ":00", this.slutt + " " + this.levere + ":00", this.current, this.hentested, this.leveringssted, () => {
        history.push("/");
      });
    });
  }
}

export default Side2
