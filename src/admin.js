import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { connection } from "./mysql_connection";
import { BackButton, Card, List, Row, Column, NavBar, Button, Form } from './widgets';
import {bikeService} from './bikeservice';
import {bestillingService} from './services'
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import



import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export class LagerMeny extends Component {
  render() {
    return (
      <div className="container d-flex justify-content-center" style={{ marginTop: "35vh" }}>
      <div className="card border-dark">
        <div className="card-body">

        <button
          type="button"
          className="btn btn-light m-2"
          onClick={this.routeChange1}
        >
          Utlevering
        </button>
        <button
          type="button"
          className="btn btn-light m-2"
          onClick={this.routeChange2}
        >
          Sykkelverksted
        </button>

        </div>
      </div>
    </div>
    )
  }
  routeChange1() {
    history.push("/utleie");
  }
  routeChange2() {
    history.push("/sykkel");
  }
}



export class BikeList extends Component {
  sykler = [];

  render() {
    return (
      <div className="container">
        <h3 className="mt-5 mb-4">Sykkelverksted</h3>
        <table className="table table-hover">
          <thead className="thead-light">
            <tr>
              <th>Merke</th>
              <th>Modell</th>
              <th>Sykkeltype</th>
              <th>Tilgjengelig</th>
              <th>Info</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {this.sykler.map(sykkel => (
          <tr key={sykkel.id}>
            <td>{sykkel.merke}</td>
            <td>{sykkel.modell}</td>
            <td>{sykkel.sykkeltype}</td>
            <td>{sykkel.tilgjengelig}</td>
            <td>{sykkel.fritekst}</td>
            <td>
              <button type="button" className="btn btn-primary" onClick={()=>history.push("/sykkel/" + sykkel.id)} >
                Endre
              </button>
            </td>
          </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }

  mounted() {
    bikeService.getBikes(sykler => {
      this.sykler = sykler;
    });
  }
}

export class BikeDetails extends Component {
  statusid = '';
  sykkelstatus = null;
  statusmelding = '';
  sykkel = [];



  render() {
    {/*Må ha dei to neste linjene for å sørge for at data vert henta frå databasen før innholdet blir teikna*/}
    if(!this.sykkelstatus) return null;
    if(!this.sykkel.status) return null;
    let sykkelid = this.props.match.params.id;



    return(
      <div className="container">
      <h4 className="pt-4">Sykkelid: {sykkelid}</h4>
        <form>
          <div class="form-group">
            <label htmlFor="statusmeny">Status</label>
            <select class="form-control" id='statusmeny' defaultValue={this.sykkel.status}>
              {this.sykkelstatus.map(status => (

                <option value={status.statusid} key={status.statusid}>
                    {status.statusmelding}
                </option>
              ))}
            </select>
          </div>
          <div class="form-group">
          {/*Må begrense friteksten til 255 chars pga. varchar255 i databasen*/}
            <label htmlFor="exampleFormControlTextarea1">Fritekst</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" id="obj" value={this.sykkel.fritekst} maxLength="255" onInput={this.countChars} title="FeedbackMessage" rows="3"></textarea>
            <p>Gjenstående tegn: <span id="charNum">255</span></p>
          </div>
          <button type="button" class="btn btn-success m-2" id="fritekst" title="Lagre" onClick={this.save}>Lagre</button>
          <BackButton type="button" id="fritekst" title="Back">Avbryt</BackButton>
        </form>

      </div>
    );
  }

    mounted() {
      bikeService.getBikeStatus(sykkelstatus => {
        this.sykkelstatus = sykkelstatus;

    });
      bikeService.getBikeState(this.props.match.params.id, sykkel => {
     this.sykkel = sykkel;

  });

    }
   countChars(e){
      var maxLength = 255;
      var currentText = e.target.value;
      var strLength = currentText.length;
      var charRemain = (maxLength - strLength);

      this.sykkel.fritekst = e.target.value;

      if(charRemain < 0){
          document.getElementById("charNum").innerHTML = '<span style="color: red;">You have exceeded the limit of '+maxLength+' characters</span>';
      }else{
          document.getElementById("charNum").innerHTML = charRemain;
      }
  }
  save() {

    bikeService.updateBike(statusmeny.options[statusmeny.selectedIndex].value, obj.value, this.props.match.params.id, results => {
      history.push('/utleie');
    });
    bikeService.updateBikeTilgj();
    }

  aktiver(){
  document.getElementById("knapp").disabled = false;
  }
}

export class Utleie extends Component {
  best = [];
  sykler = [];
  utstyr = [];

render(){
  return(
    <div className="container">
      <div class="pt-5">
        <h4>Utlevering</h4>
      </div>
      <form>
        <div class="form-group">
          <label htmlFor="dato">Dato</label>
          <input type="date" class="form-control" id="dato" onInput={this.handleClick} aria-describedby="emailHelp" placeholder="Enter email"/>
        </div>
      </form>
      {this.best.map((best,index) => (
          <div key={status.leieid}>
          {/*toLocaleDateString fjernar ekstra informasjon frå tidsformatet gitt av databasen: (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString)*/}
          <button className="collapsible">Bestilling {" " + best.start.toLocaleDateString([], {hour: '2-digit', minute:'2-digit'})} - {" " + best.slutt.toLocaleDateString([], {hour: '2-digit', minute:'2-digit'})}</button>
          <div className="content">
              {best.fornavn + ' ' + best.etternavn}
              <br />
              Sykler i denne bestillingen:
              <ol>
              {this.sykler[index] != null ?
                this.sykler[index].map(sykkel => (
                <li key={sykkel.sykler_sykkelid}><NavLink to={'/sykkel/' + sykkel.sykler_sykkelid}>
                <Column> {sykkel.sykkeltype}, ID: {sykkel.sykler_sykkelid}</Column>
                </NavLink></li>
              ))
            : <Column> Ingen sykler </Column>}
              </ol>
              <br />
              Utstyr i denne bestillingen:
              <ol>
              {this.utstyr[index] != null ?
                this.utstyr[index].map(utstyr => (
                <li key={utstyr.utstyr_utstyrid}>
                <Column> {utstyr.utstyrtype}, ID: {utstyr.utstyr_utstyrid}</Column>
                </li>
              ))
            : <Column> Ingen utstyr </Column>}
              </ol>
              <br />
              Leveringssted:
              <Column> {best.sted} </Column>
              <br />
              Hentested:
              <Column> {best.lager} </Column>
      </div>
      </div>
      ))}
      </div>
      )}

mounted(){
document.getElementById('dato').valueAsDate = new Date();

}
  handleClick(e) {
  e.preventDefault();
  bestillingService.getBestilling(dato.value,results => {
  this.best = results;
    for(let i = 0;i<this.best.length;i++) {
      bestillingService.getSykler(this.best[i].leieid, sykler => {
        this.sykler.push(sykler);

      });
      bestillingService.getUtstyr(this.best[i].leieid, utstyr => {
        this.utstyr.push(utstyr);

      });
    }
  bikeService.collapsible();
});
}
}
