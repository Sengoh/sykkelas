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

  // Variabler for sykkelvalg
  start = '2019-03-25';
  slutt = '2019-03-25';
  terreng = 0;
  querySjekk = 0;
  sykkelSjekk = 0;
  hente = "00:00";
  levere = "01:01";
  sykler = [[], [], []];

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
      Antall personer: <input id="gruppe" value={this.gruppe} onChange={event => (this.gruppe = event.target.value)} placeholder="0" style={{width: 8 + 'em'}} type="number" className="form-control form-control-sm" disabled /> <br/><br/>


      Terrengsykkel: <input type="checkbox" onChange={()=>terreng.disabled ? terreng.disabled = false : terreng.disabled = true} />
       <input id="terreng" placeholder='0' style={{width: 8 + 'em',display: "inline"}} type="number" className="form-control form-control-sm" disabled />
      Tandemsykkel: <input type="checkbox" onChange={()=>tandem.disabled ? tandem.disabled = false : tandem.disabled = true}/>
      <input id="tandem" value={this.tandem} onChange={event => (this.tandem = event.target.value)}placeholder='0' style={{width: 8 + 'em'}} type="number"  className="form-control form-control-sm" disabled /> <br/>
      Elsykkel for de eldre: <input type="checkbox" onChange={()=>el.disabled ? el.disabled = false : el.disabled = true} />
      <input id="el" value={this.el} onChange={event => (this.el = event.target.value)} placeholder='0' style={{width: 8 + 'em'}} type="number" className="form-control form-control-sm" disabled /> <br/>

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

finnSykler(indeks,type,verdi) {
  ansatteService.getSykkel(type,verdi,sykler => {
    this.sykler[indeks] = sykler;
    if(this.sykler[indeks].length == verdi) {
      return true;
    } else {
      return false;
    }

  })
}

handleSykkel() {
  if(this.sykkelSjekk == 1) {
    if(this.querySjekk == 1) {
      ansatteService.insertLeie(this.start + " " + this.hente + ":00", this.slutt + " " + this.levere + ":00", this.props.match.params.id, 1, this.hentested, this.leveringssted, this.gruppe,leier => {
          ansatteService.getPrevious(current => {
            this.current = current.IDENTITY;
            console.log(this.current)
            for(var i = 0;i<this.sykler.length;i++) {
              for(var j = 0;j<this.sykler[i].length;j++) {
                ansatteService.insertSykkel(this.current,parseInt(this.sykler[i][j].id),sykkel => {
                  console.log("Complete sykler");
                })
              }
            }
            console.log("Complete leie");
          })
        })
    } else {
      return;
    }
  } else {
    console.log("nah");
    return;
  }
}


  add(){
    bestillingService.addKunder(this.fornavn, this.etternavn, this.epost, this.addresse, this.postnr, this.poststed, this.telefon, () => {
      history.push("/");
    });

    bestillingService.getKunde(current => {
      this.current = current.IDENTITY;
      console.log(this.current);
      bestillingService.addLeietaker(this.start + " " + this.hente + ":00", this.slutt + " " + this.levere + ":00", this.current, this.hentested, this.leveringssted, this.gruppe, () => {
        history.push("/");
      });
    });

    if (!gruppe.disabled && gruppe.value !=0) {
      this.gruppe += parseInt(gruppe.value);
    }
    else {
      this.gruppe = 1;
    }
  }

  submit() {
    this.sykkelSjekk = 0;
    this.querySjekk = 0;

    if(!terreng.disabled && terreng.value != 0) {
      console.log("test");
      console.log(terreng.value);
      ansatteService.getSykkel("terreng",parseInt(terreng.value),sykler => {
        console.log(sykler);
        if(sykler.length == terreng.value) {
          console.log("yea");
          this.sykler[0] = sykler;
          this.querySjekk++;
          this.sykkelSjekk++;
          this.handleSykkel();
          //this.sykler[0] = sykler;
        } else {
          errorTerreng.innerHTML = "Ikke nok sykler.";
          this.sykler[0] = [];
          console.log(this.sykler[0]);
          this.sykkelSjekk++;
          this.handleSykkel();
        }

      })
    } else {
      this.querySjekk++;
      this.sykkelSjekk++;
      this.handleSykkel();
    }
  }


}

export default Side2
