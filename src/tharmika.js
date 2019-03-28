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
  fornavn = '';
  etternavn = '';
  start = '2019-03-25';
  slutt = '2019-03-25';
  terreng = 0;
  querySjekk = 0;
  sykkelSjekk = 0;
  hente = "00:00";
  levere = "01:01";
  sykler = [[], [], []];
  sql = '';

  render() {
    return(
      <div className="container">
        <div className="pt-4">
          <h4>Bestilling for nye kunder</h4>
        </div>

        <form className="pt-5">
          <div className="form-row">
             <div className="col mb-3">
               <label htmlFor="exampleInputFn">Fornavn</label>
               <input type="text" className="form-control" id="exampleInputFn" aria-describedby="emailHelp" value={this.fornavn} onChange={event => (this.fornavn = event.target.value)}/>
             </div>
             <div className="col mb-3">
               <label htmlFor="exampleInputEn">Etternavn</label>
               <input type="text" className="form-control" id="exampleInputEn" aria-describedby="emailHelp" value={this.etternavn} onChange={event => (this.etternavn = event.target.value)} />
             </div>
           </div>

          <div className="form-row">
             <div className="col mb-3">
               <label htmlFor="exampleInputEmail1">Adresse</label>
               <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={this.addresse} onChange={event => (this.addresse = event.target.value)}/>
             </div>
             <div className="col mb-3">
               <label htmlFor="exampleInputPass">Poststed</label>
               <input type="text" className="form-control" id="exampleInputPass" aria-describedby="emailHelp" value={this.poststed} onChange={event => (this.poststed = event.target.value)} />
             </div>
             <div className="col mb-3">
               <label htmlFor="exampleInputPass">Postnummer</label>
               <input type="number" className="form-control" id="exampleInputPass" aria-describedby="emailHelp" value={this.postnr} onChange={event => (this.postnr = event.target.value)} />
             </div>
           </div>

          <div className="form-row">
             <div className="col mb-3">
               <label htmlFor="exampleInputEmail1">E-post</label>
               <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={this.epost} onChange={event => (this.epost = event.target.value)}/>
             </div>
             <div className="col mb-3">
               <label htmlFor="exampleInputPass">Telefon</label>
               <input type="number" className="form-control" id="exampleInputPass" aria-describedby="emailHelp" value={this.telefon} onChange={event => (this.telefon = event.target.value)} />
             </div>
           </div>

          <div className="form-row pt-5">
             <div className="col mb-3">
               <label htmlFor="exampleInputEmail1">Fra</label>
               <input type="date" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={this.start} onChange={event => (this.start = event.target.value)}/>
             </div>
             <div className="col mb-3">
               <label htmlFor="exampleInputEmail1">Hentetid</label>
               <input type="time" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={this.hente} onChange={event => (this.hente = event.target.value)} />
             </div>
             <div className="col mb-3">
               <label htmlFor="exampleInputEmail1">Hentested</label>
               <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={this.hentested} onChange={event => (this.hentested = event.target.value)}/>
             </div>
           </div>

          <div className="form-row">
             <div className="col mb-3">
               <label htmlFor="exampleInputPass">Til</label>
               <input type="date" className="form-control" id="exampleInputPass" aria-describedby="emailHelp" value={this.slutt} onChange={event => (this.slutt = event.target.value)} />
             </div>
             <div className="col mb-3">
               <label htmlFor="exampleInputPass">Leveringstid</label>
               <input type="time" className="form-control" id="exampleInputPass" aria-describedby="emailHelp" value={this.levere} onChange={event => (this.levere = event.target.value)} />
             </div>
             <div className="col mb-3">
               <label htmlFor="exampleInputPass">Leveringssted</label>
               <input type="text" className="form-control" id="exampleInputPass" aria-describedby="emailHelp" value={this.leveringssted} onChange={event => (this.leveringssted = event.target.value)} />
             </div>
           </div>

          <div className="form-row pt-5">

             <div className="col-4 mb-3">
             <h5>Gruppebestilling</h5>
               <div className="form-check mb-2">
                <input className="form-check-input" type="checkbox" id="autoSizingCheck" onChange={() => gruppe.disabled ? gruppe.disabled = false : gruppe.disabled = true} />
                <label className="form-check-label" htmlFor="autoSizingCheck">
                  Gruppe
                </label>
              </div>
              <div className="col mb-3">
                <label htmlFor="gruppe">Antall personer</label>
                <input type="number" id="gruppe" className="form-control" aria-describedby="emailHelp" value={this.gruppe} onChange={event => (this.gruppe = event.target.value)} disabled />
              </div>
             </div>


             <div className="col-4 mb-3">
             <h5>Sykkeltype</h5>

               <div className="form-check mb-2">
                <input className="form-check-input" type="checkbox" id="autoSizingCheck" onChange={()=>terreng.disabled ? terreng.disabled = false : terreng.disabled = true} />
                <label className="form-check-label" htmlFor="autoSizingCheck">
                  Terrengsykkel
                </label>
                </div>
                <div className="col mb-3">
                  <label htmlFor="terreng">Antall</label>
                  <input type="number" id="terreng" className="form-control" aria-describedby="emailHelp" value={this.terreng} onChange={event => (this.terreng = event.target.value)} disabled />
              </div>


            <div className="form-check mb-2">
             <input className="form-check-input" type="checkbox" id="autoSizingCheck" onChange={()=>tandem.disabled ? tandem.disabled = false : tandem.disabled = true} />
             <label className="form-check-label" htmlFor="autoSizingCheck">
               Tandemsykkel
             </label>
           </div>
           <div className="col mb-3">
             <label htmlFor="tandem">Antall</label>
             <input type="number" id="tandem" className="form-control" aria-describedby="emailHelp" value={this.tandem} onChange={event => (this.tandem = event.target.value)} disabled />
           </div>


           <div className="form-check mb-2">
            <input className="form-check-input" type="checkbox" id="autoSizingCheck" onChange={()=>el.disabled ? el.disabled = false : el.disabled = true} />
            <label className="form-check-label" htmlFor="autoSizingCheck">
              El-sykkel
            </label>
           </div>
           <div className="col mb-3">
             <label htmlFor="el">Antall</label>
             <input type="number" id="el" className="form-control" aria-describedby="emailHelp" value={this.el} onChange={event => (this.el = event.target.value)} disabled />
           </div>

           </div>

             <div className="col-4 mb-3">
             <h5>Ekstrautstyr</h5>
             <div className="form-check mb-2">
              <input className="form-check-input" type="checkbox" id="autoSizingCheck" onChange={()=>barnevogn.disabled ? barnevogn.disabled = false : barnevogn.disabled = true} />
              <label className="form-check-label" htmlFor="autoSizingCheck">
                Barnevogn
              </label>
              </div>
              <div className="col mb-3">
                <label htmlFor="gruppe">Antall</label>
                <input type="number" id="barnevogn" className="form-control" aria-describedby="emailHelp" value={this.barnevogn} onChange={event => (this.barnevogn = event.target.value)} disabled />
              </div>


            <div className="form-check mb-2">
             <input className="form-check-input" type="checkbox" id="autoSizingCheck" onChange={()=>barnesete.disabled ? barnesete.disabled = false : barnesete.disabled = true} />
             <label className="form-check-label" htmlFor="autoSizingCheck">
               Barnesete
             </label>
           </div>
           <div className="col mb-3">
             <label htmlFor="gruppe">Antall</label>
             <input type="number" id="barnesete" className="form-control" aria-describedby="emailHelp" value={this.barnesete} onChange={event => (this.barnesete = event.target.value)} disabled />
           </div>


           <div className="form-check mb-2">
            <input className="form-check-input" type="checkbox" id="autoSizingCheck" onChange={()=>bagasjevogn.disabled ? bagasjevogn.disabled = false : barnevogn.disabled = true} />
            <label className="form-check-label" htmlFor="autoSizingCheck">
              Bagasjevogn
            </label>
           </div>
           <div className="col mb-3">
             <label htmlFor="gruppe">Antall</label>
             <input type="number" id="bagasjevogn" className="form-control" aria-describedby="emailHelp" value={this.bagasjevogn} onChange={event => (this.bagasjevogn = event.target.value)} disabled />
           </div>

           </div>

           </div>

           <button type="button" onClick={this.add} className="btn btn-primary float-right mb-5">Registrer bestilling</button>

         </form>


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
      this.gruppe = parseInt(gruppe.value);
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
      ansatteService.insertSykkel("terreng",parseInt(terreng.value),sykler => {
        this.sykler = sykler;
        console.log(this.sykler);
        for(var i = 0;i<this.sykler.length;i++){
          ansatteService.insertSykkel(this.current,this.sykler[i].sykkelid,sykkel => {

          })
          history.push('/');
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
