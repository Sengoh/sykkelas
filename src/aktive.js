import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { connection } from "./mysql_connection"
import { Card, List, Row, Column, NavBar, Button, Form } from './widgets';
import { ansatteService,kundeService,bestillingService } from './services';
import {bikeService} from './bikeservice';
let remote = require('electron').remote;
let session = remote.session;
let ansattid;
session.defaultSession.cookies.get({name:"ansatt"},(err,cookies) => {
  if(err) console.error(err);
  ansattid = cookies[0].value;
})

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

//Komponent som gir oversikt over kunder den ansatte kan velge
export class KundeOversikt extends Component {
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
        <div className="container">

        {/*Sjema for å søke etter kunde med kundenummer,epost eller telefon*/}
        <form className="row pb-3 pt-4">
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

          {/*Tabell som viser kunder*/}
          <table className='table table-hover'>
          <thead className="thead-light">
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
          {/*Sjekker om kunder har blitt funnet for søket og viser dem, eller viser tilbakemelding om at ingen kunde er funnet*/}
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
      </div>
    );
  }

  //Funksjon som finner kunde som tilfredstiller søket
  finnKunde() {
    this.where = [];
    this.kundenr = kundenummer.value;
    this.epost = epost.value;
    this.tlf = telefon.value;
    this.whereState = "";
    this.sql = "select * from kunder where";

    //Sjekker om søket bruker kundenummer
    if(this.kundenr != " "){
	     this.where.push(" brukerid LIKE '%"+this.kundenr+"%'");
    }

    //Sjekker om søket bruker epost
    if(this.epost != " "){
 	     this.where.push(" epost LIKE '%"+this.epost+"%'");
    }

    //Sjekker om søket bruker telefon
    if(this.tlf != " "){
  	   this.where.push(" telefon LIKE '%"+this.tlf+"%'");
    }

    //Lager sql spørring med valgt filtre
    for(this.i=0;this.i<(this.where.length-1);this.i++){
	     this.whereState += this.where[this.i] + " AND ";
     }
     this.whereState += this.where[this.where.length-1];
     this.sql += this.whereState + ";";

     //Kjører sql spørringen som er laget og finner kunder
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
//Komponent for bestillingskjema
export class BestillingSkjema extends Component {
  kunde = null;

  //Variabler for dato
  fraDato = null;
  tilDato = null;
  dd= null;
  mm= null;
  yyyy = null;

  //Variabler for tid
  henteTid = null;
  levereTid = null;
  tid = null;
  m = null;
  t = null;
  tempM = null; //Brukes for validering av tid

  //Variabler for sykkelvalg
  hente = null;
  levere = null;
  terreng = 0;
  tandem = 0;
  el = 0;
  querySjekk = 0; //Brukes til å sjekke om det er nok sykler og utstyr
  sykkelSjekk = 0; //Brukes til å sjekke om programmet har gått gjennom alle syklene og utstyret, kan være unødvending
  lager = [];
  steder = [];
  antallPersoner = 1; //Antall personer bestillingen er for

  //Arrays som lagrer syklene og utstyr for hver type
  sykler = [[],[],[]];
  utstyr = [[],[],[]];

  //Funksjon som kjører for hver sykkel-og utstyrstype, og lagrer ny bestilling hvis alt stemmer
  handleSykkel() {

    //Sjekker om alle sykkel- og utstyrtypene har blitt sjekket, kan være unødvending
    if(this.sykkelSjekk == 6) {

      //Sjekker om det er nok av alle sykkel- og utstyrstype for de som har blitt valgt
      if(this.querySjekk == 6) {

        //Lagrer ny bestilling med all valgt informasjon
        ansatteService.insertLeie(this.fraDato + " " + this.henteTid + ":00", this.tilDato + " " + this.levereTid + ":00", this.props.match.params.id, ansattid, hente.options[hente.selectedIndex].value, levere.options[levere.selectedIndex].value,this.antallPersoner,leier => {
            //Finner leieid til den nye bestillingen
            ansatteService.getPrevious(current => {
              this.current = current.IDENTITY;
              console.log(this.current)
              //Legger til syklene som er valgt til den nye bestillingen
              for(var i = 0;i<this.sykler.length;i++) {
                for(var j = 0;j<this.sykler[i].length;j++) {
                  ansatteService.insertSykkel(this.current,parseInt(this.sykler[i][j].id),sykkel => {
                    console.log("Complete sykler");
                  })
                }
              }
              //Legger til utstyr som er valgt til den nye bestillingen
              for(var i = 0;i<this.utstyr.length;i++) {
                for(var j = 0;j<this.utstyr[i].length;j++) {
                  ansatteService.insertUtstyr(this.current,parseInt(this.utstyr[i][j].utstyrid),sykkel => {
                    console.log("Complete utstyr");
                  })
                }
              }
              console.log("Complete leie");
              //Gir tilbakemelding om at bestillingen er gjennomført, og videresender til kvitteringsside
              alert("Bestilling gjennomført");
              history.push("/bestilling/" + this.current);
            })
          })
      //Returnerer hvis det ikke er nok sykler eller utstyr
      } else {
        return;
      }
    //Returnerer hvis alle syklene og utstyrene ikke har blitt sjekket enda
    } else {
      return;
    }
    console.log(this.sykkelSjekk);
  }

  //Funksjon som kjører når skjemaet sendes
  handleSubmit(event) {

    //Setter alle feilmeldinger til blankt
    errorTerreng.innerText = "";
    errorTandem.innerText = "";
    errorEl.innerText = "";
    errorHjelm.innerText = "";
    errorBarn.innerText = "";
    errorBarnesete.innerText = "";

    this.sykkelSjekk = 0;
    this.querySjekk = 0;

    //Sjekker om gruppe er valgt og legger til antall personer i gruppen
    if(!gruppe.disabled && gruppe.value != 0) {
      this.antallPersoner = parseInt(gruppe.value);
    }

    //Sjekker om terreng er valgt
    if(!terreng.disabled && terreng.value != 0) {
      console.log("test");
      console.log(terreng.value);

      //Sjekker om det finnes nok antall terreng sykler
      ansatteService.getSykkel("terreng",parseInt(terreng.value),sykler => {
        console.log(sykler);

        //Hvis det finnes nok sykler, lagres syklene i en array
        if(sykler.length == terreng.value) {
          console.log("yea");
          this.sykler[0] = sykler;
          this.querySjekk++;
          this.sykkelSjekk++;
          this.handleSykkel();
          //this.sykler[0] = sykler;

        //Hvis det ikke finnes nok sykler, sendes en tilbakemelding om dette
        } else {
          errorTerreng.innerText = "Ikke nok sykler.";
          this.sykler[0] = [];
          console.log(this.sykler[0]);
          this.sykkelSjekk++;
          this.handleSykkel();
        }
      })
  //Kjører hvis terreng ikke er valgt
  } else {
    this.querySjekk++;
    this.sykkelSjekk++;
    this.handleSykkel();
  }

  //Sjekker om tandem er valgt
  if(!tandem.disabled && tandem.value != 0) {
    console.log("test");

    //Sjekker om det finnes nok antall tandem sykler
    ansatteService.getSykkel("tandem",parseInt(tandem.value),sykler => {

      //Hvis det finnes nok sykler, lagres syklene i en array
      if(sykler.length == tandem.value) {
        console.log("yea");
        this.sykler[1] = sykler;
        this.querySjekk++;
        this.sykkelSjekk++;
        this.handleSykkel();
        //this.sykler[0] = sykler;

      //Hvis det ikke finnes nok sykler, sendes en tilbakemelding om dette
      } else {
        errorTandem.innerText = "Ikke nok sykler.";
        this.sykler[1] = [];
        console.log(this.sykler[1]);
        this.sykkelSjekk++;
        this.handleSykkel();
      }
    })

  //Kjører hvis tandem ikke er valgt
  } else {
    this.querySjekk++;
    this.sykkelSjekk++;
    this.handleSykkel();
  }

  //Sjekker om elsykkel er valgt
  if(!el.disabled && el.value != 0) {
    console.log("test");

    //Sjekker om det finnes nok antall elsykler
    ansatteService.getSykkel("el",parseInt(el.value),sykler => {

      //Hvis det finnes nok sykler, lagres syklene i en array
      if(sykler.length == el.value) {
        console.log("yea");
        this.sykler[2] = sykler;
        this.querySjekk++;
        this.sykkelSjekk++;
        this.handleSykkel();
        //this.sykler[0] = sykler;

      //Hvis det ikke finnes nok sykler, sendes en tilbakemelding om dette
      } else {
        errorEl.innerText = "Ikke nok sykler.";
        this.sykler[2] = [];
        this.elSjekk = false;
        console.log(this.sykler[2]);
        this.sykkelSjekk++;
        this.handleSykkel();
      }
    })

    //Kjører hvis elsykkel ikke er valgt
    } else {
      this.querySjekk++;
      this.sykkelSjekk++;
      this.handleSykkel();
    }

    //Sjekker om hjlem er valgt
    if(hjelm.value != 0) {

      //Sjekker om det finnes nok antall hjelmer
      ansatteService.getUtstyr("hjelm",parseInt(hjelm.value),utstyr=> {

        //Hvis det finnes nok utstyr, lagres utstyret i en array
        if(utstyr.length == hjelm.value) {
          this.utstyr[0] = utstyr;
          this.querySjekk++;
          this.sykkelSjekk++;
          this.handleSykkel();

        //Hvis det ikke finnes nok utstyr, sendes en tilbakemelding om dette
        } else {
          errorHjelm.innerText = "Ikke nok hjelmer.";
          this.utstyr[0] = [];
          this.sykkelSjekk++;
          this.handleSykkel();
        }
      })

    //Kjører hvis hjelm ikke er valgt
    } else {
      this.querySjekk++;
      this.sykkelSjekk++;
      this.handleSykkel();
    }

    //Sjekker om barnevogn er valgt
    if(barnevogn.value != 0) {

      //Sjekker om det finnes nok antall barnevogner
      ansatteService.getUtstyr("barnevogn",parseInt(barnevogn.value),utstyr => {

        //Hvis det finnes nok utstyr, lagres utstyret i en array
        if(utstyr.length == barnevogn.value) {
          this.utstyr[1] = utstyr;
          this.querySjekk++;
          this.sykkelSjekk++;
          this.handleSykkel();

        //Hvis det ikke finnes nok utstyr, sendes en tilbakemelding om dette
        } else {
          errorBarn.innerText = "Ikke nok barnevogner.";
          this.utstyr[1] = [];
          this.sykkelSjekk++;
          this.handleSykkel();
        }
      })
    //Kjører hvis barnevogn ikke er valgt
    } else {
      this.querySjekk++;
      this.sykkelSjekk++;
      this.handleSykkel();
    }

    //Sjekker om barnesete er valgt
    if(barnesete.value != 0) {

      //Sjekker om det finnes nok antall barneseter
      ansatteService.getUtstyr("barnesete",parseInt(barnesete.value),utstyr => {

        //Hvis det finnes nok utstyr, lagres utstyret i en array
        if(utstyr.length == barnesete.value) {
          this.utstyr[2] = utstyr;
          this.querySjekk++;
          this.sykkelSjekk++;
          this.handleSykkel();

        //Hvis det ikke finnes nok utstyr, sendes en tilbakemelding om dette
        } else {
          errorBarnesete.innerText = "Ikke nok barneseter.";
          this.utstyr[2] = [];
          this.sykkelSjekk++;
          this.handleSykkel();
        }
      })
    //Kjører hvis barnesete ikke er valgt
    } else {
      this.querySjekk++;
      this.sykkelSjekk++;
      this.handleSykkel();
    }
  }


  render() {
    if (!this.kunde) return null;

    return(
      <div className="container">
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
              <td><Button.Danger><NavLink to="/eksisKunde" style={{color:'white',textDecoration:'none'}}>Avbryt</NavLink></Button.Danger></td>
            </tr>
        </tbody>
      </table>
      <Card>
      <form onSubmit={this.handleSubmit}>
      <div className="row">
      <div className="col">
        <legend className="row-form-label row-sm-2 pt-0">Sykler</legend>
        <div className="row-sm-10">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" onChange={()=>this.sykkelValg(1)}/>
            <label className="form-check-label">Terrengsykkel</label>
            <div><span>Antall</span><input id="terreng" placeholder='0' style={{width: 8 + 'em',display: "inline"}} type="number" className="form-control form-control-sm" min='0' disabled onChange={e => e.target.value<0 ? e.target.value = 0 : e.target.value = e.target.value} /> <br /></div>
            <span className="error" id="errorTerreng"></span><br />
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" onChange={()=>this.sykkelValg(2)} />
            <label className="form-check-label">Tandemsykkel</label>
            <div><span>Antall</span> <input id="tandem" placeholder='0' style={{width: 8 + 'em',display: "inline"}} type="number" className="form-control form-control-sm" disabled  min='0' onChange={e => e.target.value<0 ? e.target.value = 0 : e.target.value = e.target.value} /><br /></div>
            <span className="error" id="errorTandem"></span><br />
          <div className="form-check">
          </div>
            <input className="form-check-input" type="checkbox" onChange={()=>this.sykkelValg(3)} />
            <label className="form-check-label">Elsykkel</label>
            <div><span>Antall</span> <input id="el" placeholder='0' style={{width: 8 + 'em',display: "inline"}} type="number" className="form-control form-control-sm" disabled  min='0' onChange={e => e.target.value<0 ? e.target.value = 0 : e.target.value = e.target.value} /><br /></div>
            <span className="error" id="errorEl"></span><br />
          </div>
        </div>
      </div>
      <div className="col">
        <legend className="row-form-label row-sm-2 pt-0">Dato</legend>
        <div className="row-sm-10">
          <div className="form-group">
            <Form.Label>Fra:</Form.Label>
            <input id="fra" style={{width: 11 + 'em'}} type="date" className="form-control" value={this.fraDato} onBlur={this.endreDato} onChange={e => (this.fraDato = e.target.value)} />
            <Form.Label>Til:</Form.Label>
            <input id="til" style={{width: 11 + 'em'}} type="date" className="form-control" value={this.tilDato} onBlur={this.endreDato} onChange={e => (this.tilDato = e.target.value)} />
          </div>
          <span className="error" id="errorD"></span><br />
        </div>
      </div>
      <div className="col">
        <legend className="row-form-label row-sm-2 pt-0">Tid</legend>
        <div className="row-sm-10">
          <div className="form-group">
            <Form.Label>Fra:</Form.Label>
            <input id="henteTid" style={{width: 11 + 'em'}} type="time" className="form-control" step="600" value={this.henteTid} onBlur={this.endreTid} onChange={e => (this.henteTid = e.target.value)} />
            <Form.Label>Til:</Form.Label>
            <input id="levereTid" style={{width: 11 + 'em'}} type="time" className="form-control" step="600" value={this.levereTid} onBlur={this.endreTid} onChange={e => (this.levereTid = e.target.value)} />
          </div>
          <span className="error" id="errorT"></span><br />
        </div>
      </div>
      <div className="col">
        <legend className="row-form-label row-sm-2 pt-0">Hente og levere</legend>
        <div className="row-sm-10">
          <div className="form-group">
            <Form.Label>Hentested:</Form.Label>
            <select id="hente" className="form-control">
              {this.lager.map(lager => (
                <option key={lager.lagerid} value={lager.lagerid}>{lager.lager}</option>
              ))}
            </select>
            <Form.Label>Leveringssted:</Form.Label>
            <select id="levere" className="form-control">
              {this.steder.map(sted => (
                <option key={sted.stedid} value={sted.stedid}>{sted.sted}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="col">
        <legend className="row-form-label row-sm-2 pt-0">Gruppe</legend>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" onChange={()=>gruppe.disabled ? gruppe.disabled = false : gruppe.disabled = true} />
            <label>Antall</label>
            <input id="gruppe" placeholder='0' style={{width: 8 + 'em'}} type="number" className="form-control form-control-sm"  min='0' disabled onChange={e => e.target.value<0 ? e.target.value = 0 : e.target.value = e.target.value} /> <br />
          </div>
        </div>
      </div>
      <Card title="Ekstrautstyr">
      <div className="form-group row">
        <div className="col-sm-2">Hjelm</div>
        <div className="col-sm-10">
          <div className="form-check">
            <label className="form-check-label">
              Antall
            </label>
            <input className="form-control form-control-sm" style={{width: 8 + 'em'}} type="number" id="hjelm"  min='0' onChange={e => e.target.value<0 ? e.target.value = 0 : e.target.value = e.target.value}/>
            <span className="error" id="errorHjelm"></span><br />
          </div>
        </div>
      </div>
      <div className="form-group row">
        <div className="col-sm-2">Barnevogn</div>
        <div className="col-sm-10">
          <div className="form-check">
            <label className="form-check-label">
              Antall
            </label>
            <input className="form-control form-control-sm" style={{width: 8 + 'em'}} type="number" id="barnevogn" min='0' onChange={e => e.target.value<0 ? e.target.value = 0 : e.target.value = e.target.value} />
            <span className="error" id="errorBarn"></span><br />
          </div>
          </div>
        </div>
        <div className="form-group row">
        <div className="col-sm-2">Barnesete</div>
        <div className="col-sm-10">
          <div className="form-check">
            <label className="form-check-label">
              Antall
            </label>
            <input className="form-control form-control-sm" style={{width: 8 + 'em'}} type="number" id="barnesete" min='0' onChange={e => e.target.value<0 ? e.target.value = 0 : e.target.value = e.target.value} />
            <span className="error" id="errorBarnesete"></span><br />
          </div>
          </div>
        </div>
      </Card>
      <input type="submit" className="btn btn-success" value="Register bestilling" />
      </form>
      </Card>
      </div>
    )
  }
  //Funksjon som disabler og enabler input-feltene for sykkeltypene
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
          tandem.value = 0;
        }
        break;
      case 3:
          if(el.disabled) {
            el.disabled = false;
          } else {
            el.disabled = true;
            el.value = 0;
          }
          break;
    }
  }
  endreDato() {
    errorD.innerText = "";

    //Sjekker om hentedatoen skjer etter leveringdatoen, og endrer leveringdatoen hvis den er det
    if(this.fraDato > this.tilDato) {
      errorD.innerText = "Hentedato er etter leveringdato. Leveringdato er endret til hentedato";
      this.tilDato = this.fraDato;
    }

    //Sjekker om hentedatoen skjer i fortiden, og endrer den hvis den er det
    if(this.fraDato < (this.yyyy + "-0" + this.mm + "-" + this.dd)) {
      errorD.innerText = "Valgt dato er feil. Endret til dagens dato.";
      this.fraDato = (this.yyyy + "-0" + this.mm + "-" + this.dd)
    }
  }
  endreTid() {
    errorT.innerText = "";

    //Endrer hentetid minutter
    this.tempM = Math.ceil(henteTid.value.split(":")[1]/10)*10;
    if(this.tempM == 0) {
      this.tempM = "00";
    }
    if(this.tempM >= 60) {
      this.tempM = "00";
    }
    console.log(this.tempM);
    this.henteTid = henteTid.value.split(":")[0] + ":" + this.tempM;

    //Endrer leveringstid minutter
    this.tempM = Math.ceil(levereTid.value.split(":")[1]/10)*10;
    if(this.tempM == 0) {
      this.tempM = "00";
    }
    if(this.tempM >= 60) {
      this.tempM = "00";
    }
    console.log(this.tempM);
    this.levereTid = levereTid.value.split(":")[0] + ":" + this.tempM;

    //Sjekker om hentetiden er etter leverigstiden og endrer leveringstiden hvis den er det
    if(this.fraDato == this.tilDato && this.henteTid > this.levereTid) {
      console.log("wut");
      this.levereTid = this.henteTid;
      errorT.innerText = "Hentetid kan ikke være etter leveringstid. Leveringstid endret.";
    }

    //Sjekker om hentetiden skjer i fortiden, og endrer den hvis den er det
    if(this.fraDato == (this.yyyy + "-0" + this.mm + "-" + this.dd) && this.henteTid < this.t + ":" + this.m) {
      console.log("wat");
      this.henteTid = this.t + ":" + this.m;
      errorT.innerText = "Hentetiden er i fortiden. Hentetid endret.";
    }

  }

  //Henter dato, tid, kundeinfo og hente og leveringsinfo når komponentet lastes
  mounted() {
    //Henter dato
    this.fraDato = new Date();
    this.dd = ("0" + this.fraDato.getDate()).slice(-2);
    this.mm = this.fraDato.getMonth()+1;
    this.yyyy = this.fraDato.getFullYear();
    console.log(this.yyyy);
    this.fraDato = this.yyyy + "-0" + this.mm + "-" + this.dd;
    console.log(this.fraDato);
    this.tilDato = this.fraDato;

    //Henter tid
    this.henteTid = new Date();
    this.tid = new Date();

    //Finner nærmeste tiende minutt
    this.m = Math.ceil(this.tid.getMinutes()/10)*10;
    this.t = this.tid.getHours()
    if(this.m >= 60) {
      this.m = "00";
      this.t++;
    } else if (this.m >= 0 && this.m < 10) {
      this.m = "10";
    }
    this.henteTid = this.t + ":" + this.m;
    this.levereTid = this.henteTid;

    //Henter kundeinfo
    kundeService.getKunde(this.props.match.params.id,kunde =>{
      this.kunde = kunde;
    })

    //Henter hentested og leveringssted
    bestillingService.finnSted(steder => {
      this.lager = steder[1];
      this.steder = steder[0];
    })
  }
}

export class Kvittering extends Component {
  bestilling = null;
  sykler = null;
  utstyr = null;
  terreng = 0;
  tandem = 0;
  el = 0;

  render() {
    if (!this.bestilling || !this.sykler || !this.utstyr) return null;

    return(
      <div>
        {/*<Card title="Kvittering">
        <p>Kunde: {this.bestilling.fornavn} {this.bestilling.etternavn}</p>
        <h5>Sykler</h5>
        <p>Terreng: {this.bestilling.sykkelid} {this.bestilling.tester} sykler</p>
        <p>Tandem: sykler</p>
        <p>El: sykler</p>
        <h5>Tid og sted</h5>

        <br />
        <p>Antall personer: </p>
        // {for(var i = 0;i<this.bestilling.length;i++) {
        //
        // }}
        </Card>*/}
        <Card title="Kvittering">
        <p>Bestillingsnummer: {this.props.match.params.id}</p>
        <p>Kunde: {this.bestilling.fornavn} {this.bestilling.etternavn}</p>
        <div className="row">
          {/*Viser informasjon om sykler*/}
          <div className="col-2">
            <h5>Sykler</h5>
            <p>Terreng: {this.sykkelInfo("terreng")}</p>
            <p>Tandem: {this.sykkelInfo("tandem")}</p>
            <p>El: {this.sykkelInfo("el")}</p>
          </div>
          {/*Viser informasjon om utstyr*/}
          <div className="col-2">
            <h5>Utstyr</h5>
            <p>Hjelmer: {this.utstyrInfo("hjelm")}</p>
            <p>Barnevogner: {this.utstyrInfo("barnevogn")}</p>
            <p>Barnesete: {this.utstyrInfo("barnesete")}</p>
          </div>
        </div>
        {/*Viser informasjon om tid og sted*/}
        <h5>Tid og sted</h5>
        <div className="row">
          <div className="col-2">
            <h6>Hente</h6>
            <p>Dato: {this.bestilling.start.toLocaleDateString()}</p>
            <p>Tid: {("0" + this.bestilling.start.getHours()).slice(-2)}:{("0" + this.bestilling.start.getMinutes()).slice(-2)}</p>
            <p>Hentedted: {this.bestilling.lager}</p>
          </div>
          <div className="col-2">
            <h6>Levere</h6>
            <p>Dato: {this.bestilling.start.toLocaleDateString()}</p>
            <p>Tid: {("0" + this.bestilling.slutt.getHours()).slice(-2)}:{("0" + this.bestilling.slutt.getMinutes()).slice(-2)}</p>
            <p>Leveringssted: {this.bestilling.sted}</p>
          </div>

        </div>
        <NavLink to="/eksisKunde">Tilbake</NavLink>
        </Card>
      </div>
    )
  }

  //Finner antall sykler for hver type
  sykkelInfo(type) {
    for(var i = 0;i<this.sykler.length;i++) {
      if(this.sykler[i].sykkeltype == type) {
        return this.sykler[i].t;
      }
    }
    return 0;
  }

  //Finner antall utstyr for hver type
  utstyrInfo(type) {
    for(var i = 0;i<this.utstyr.length;i++) {
      if(this.utstyr[i].utstyrtype == type) {
        return this.utstyr[i].t;
      }
    }
    return 0;
  }

  //Henter informasjon om bestillingen
  mounted() {
    console.log(this.props.location.pathname);
    kundeService.kvittering(this.props.match.params.id,bestilling => {
      this.bestilling = bestilling;
      console.log(this.bestilling);

    })
    kundeService.kvitteringSykler(this.props.match.params.id,sykler => {
      this.sykler = sykler;
      console.log(this.sykler);
    })
    kundeService.kvitteringUtstyr(this.props.match.params.id,utstyr => {
      this.utstyr = utstyr;
      console.log(this.utstyr);
    })
  }
}


// export AktiveBestillinger;
// export Test;
