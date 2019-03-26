import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { connection } from "./mysql_connection"
import { Card, List, Row, Column, NavBar, Button, Form } from './widgets';
import { ansatteService } from './services';
import { kundeService } from './services';
import { bestillingService } from './services';

//import {styles} from './style.js';

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


export class AktiveBestillinger extends Component {
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
export class Test extends Component {
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

  //Variabler for sykkelvalg
  terreng = 0;
  tandem = 0;
  el = 0;
  hente = null;
  levere = null;
  querySjekk = 0;
  sykkelSjekk = 0;

  temp = 0;
  tempM = null;
  sql = "";
  sykler = [[],[],[]];
  utstyr = [[],[],[]];
  current = null;
  lager = [];
  steder = [];
  antallPersoner = 1;

  ahhh = null;
  kjørte = false;

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
    if(this.sykkelSjekk == 6) {
      if(this.querySjekk == 6) {
        ansatteService.insertLeie(this.fraDato + " " + this.henteTid + ":00", this.tilDato + " " + this.levereTid + ":00", this.props.match.params.id, 1, hente.options[hente.selectedIndex].value, levere.options[levere.selectedIndex].value,this.antallPersoner,leier => {
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
              for(var i = 0;i<this.utstyr.length;i++) {
                for(var j = 0;j<this.utstyr[i].length;j++) {
                  ansatteService.insertUtstyr(this.current,parseInt(this.utstyr[i][j].utstyrid),sykkel => {
                    console.log("Complete utstyr");
                  })
                }
              }
              console.log("Complete leie");
              alert("Bestilling gjennomført")
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
  handleSubmit(event) {
    errorTerreng.innerHTML = "";
    errorTandem.innerHTML = "";
    errorEl.innerHTML = "";
    errorHjelm.innerText = "";
    errorBarn.innerText = "";
    errorBagasje.innerText = "";
    this.sykkelSjekk = 0;
    this.querySjekk = 0;
    if(!gruppe.disabled && gruppe.value != 0) {
      this.antallPersoner += parseInt(gruppe.value);
    }

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
    if(!tandem.disabled && tandem.value != 0) {
      console.log("test");

      ansatteService.getSykkel("tandem",parseInt(tandem.value),sykler => {
        if(sykler.length == tandem.value) {
          console.log("yea");
          this.sykler[1] = sykler;
          this.querySjekk++;
          this.sykkelSjekk++;
          this.handleSykkel();
          //this.sykler[0] = sykler;
        } else {
          errorTandem.innerHTML = "Ikke nok sykler.";
          this.sykler[1] = [];
          console.log(this.sykler[1]);
          this.sykkelSjekk++;
          this.handleSykkel();
        }

      })
    } else {
      this.querySjekk++;
      this.sykkelSjekk++;
      this.handleSykkel();
    }
    if(!el.disabled && el.value != 0) {
      console.log("test");
      ansatteService.getSykkel("el",parseInt(el.value),sykler => {
        if(sykler.length == el.value) {
          console.log("yea");
          this.sykler[2] = sykler;
          this.querySjekk++;
          this.sykkelSjekk++;
          this.handleSykkel();
          //this.sykler[0] = sykler;
        } else {
          errorEl.innerHTML = "Ikke nok sykler.";
          this.sykler[2] = [];
          this.elSjekk = false;
          console.log(this.sykler[2]);
          this.sykkelSjekk++;
          this.handleSykkel();
        }

      })
    } else {
      this.querySjekk++;
      this.sykkelSjekk++;
      this.handleSykkel();
    }
    if(hjelm.value != 0) {
      ansatteService.getUtstyr("hjelm",parseInt(hjelm.value),utstyr=> {
        if(utstyr.length == hjelm.value) {
          this.utstyr[0] = utstyr;
          this.querySjekk++;
          this.sykkelSjekk++;
          this.handleSykkel();
        } else {
          errorHjelm.innerText = "Ikke nok hjelmer.";
          this.utstyr[0] = [];
          this.sykkelSjekk++;
          this.handleSykkel();
        }
      })
    } else {
      this.querySjekk++;
      this.sykkelSjekk++;
      this.handleSykkel();
    }
    if(barnevogn.value != 0) {
      ansatteService.getUtstyr("barnevogn",parseInt(barnevogn.value),utstyr => {
        if(utstyr.length == barnevogn.value) {
          this.utstyr[1] = utstyr;
          this.querySjekk++;
          this.sykkelSjekk++;
          this.handleSykkel();
        } else {
          errorBarn.innerText = "Ikke nok barnevogner.";
          this.utstyr[1] = [];
          this.sykkelSjekk++;
          this.handleSykkel();
        }
      })
    } else {
      this.querySjekk++;
      this.sykkelSjekk++;
      this.handleSykkel();
    }
    if(bagasje.value != 0) {
      ansatteService.getUtstyr("bagasjevogn",parseInt(bagasje.value),utstyr => {
        if(utstyr.length == bagasje.value) {
          this.utstyr[2] = utstyr;
          this.querySjekk++;
          this.sykkelSjekk++;
          this.handleSykkel();
        } else {
          errorBagasje.innerText = "Ikke nok bagasjevogner.";
          this.utstyr[2] = [];
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
              <td><Button.Danger><NavLink to="/Sivert" style={{color:'white',textDecoration:'none'}}>Avbryt</NavLink></Button.Danger></td>
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
            <div><span>Antall</span> <input id="terreng" placeholder='0' style={{width: 8 + 'em',display: "inline"}} type="number" className="form-control form-control-sm" min='0' disabled onChange={e => e.target.value<0 ? e.target.value = 0 : e.target.value = e.target.value} /> <br /></div>
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
          <span className="error" id="errorT"></span><br />
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
        <div className="col-sm-2">Bagasjevogn</div>
        <div className="col-sm-10">
          <div className="form-check">
            <label className="form-check-label">
              Antall
            </label>
            <input className="form-control form-control-sm" style={{width: 8 + 'em'}} type="number" id="bagasje" min='0' onChange={e => e.target.value<0 ? e.target.value = 0 : e.target.value = e.target.value} />
            <span className="error" id="errorBagasje"></span><br />
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
    errorD.innerHTML = "";

    //Sjekker om hentedatoen skjer etter leveringdatoen, og endrer leveringdatoen hvis den er det
    if(this.fraDato > this.tilDato) {
      errorD.innerHTML = "Hentedato er etter leveringdato. Leveringdato er endret til hentedato";
      this.tilDato = this.fraDato;
    }

    //Sjekker om hentedatoen skjer i fortiden, og endrer den hvis den er det
    if(this.fraDato < (this.yyyy + "-0" + this.mm + "-" + this.dd)) {
      errorD.innerHTML = "Valgt dato er feil. Endret til dagens dato.";
      this.fraDato = (this.yyyy + "-0" + this.mm + "-" + this.dd)
    }
  }
  endreTid() {
    errorT.innerHTML = "";

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
      this.levereTid = this.henteTid;
      errorT.innerHTML = "Hentetid kan ikke være etter leveringstid. Leveringstid endret.";
    }

    //Sjekker om hentetiden skjer i fortiden, og endrer den hvis den er det
    if(this.fraDato == (this.yyyy + "-0" + this.mm + "-" + this.dd) && this.henteTid < this.t + ":" + this.m) {
      this.henteTid = this.t + ":" + this.m;
      errorT.innerHTML = "Hentetider er i fortiden. Hentetid endret.";
    }

  }
  //
  //onClick={()=>history.push("/")}
  mounted() {
    this.fraDato = new Date();
    this.ahh = new Date();
    console.log(this.ahh);
    this.dd = this.fraDato.getDate();
    this.mm = this.fraDato.getMonth()+1;
    this.yyyy = this.fraDato.getFullYear();
    console.log(this.yyyy);
    this.fraDato = this.yyyy + "-0" + this.mm + "-" + this.dd;
    console.log(this.fraDato);
    this.tilDato = this.fraDato;
    this.henteTid = new Date();
    this.tid = new Date();
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
    kundeService.getKunde(this.props.match.params.id,kunde =>{
      this.kunde = kunde;
    })
    // bestillingService.finnLager(lager => {
    //   this.lager = lager;
    // })
    bestillingService.finnSted(sted => {
      this.steder = sted[0];
      this.lager = sted[1];
    })
  }
}

// export AktiveBestillinger;
// export Test;
