import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { connection } from '../services/mysql_connection'
import { Card, List, Row, Column, NavBar, Button, Form } from './widgets';
import { ansatteService, bestillingService } from '../services/services';
import {Kunde, Bestilling, Ekstrautstyr } from "./BestillingNyKunde";


import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export class BestMeny extends Component{
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
            Ny kunde
          </button>
          <button
            type="button"
            className="btn btn-light m-2"
            onClick={this.routeChange2}
          >
            Eksisterende kunde
          </button>
          </div>
        </div>
      </div>

    )
  }
  routeChange1() {
    history.push("/nyKunde");
  }
  routeChange2() {
    history.push("/eksisKunde");
  }
}


// Brukes som en wrapper for alle komponentene i BestillingNyKunde.js.
// Muliggjør øverføring av props og states mellom komponentene
export class Best extends Component {

  state = {
    fn: "",
    en: "",
    epost: "",
    tlf: null,
    bid: null,
    vis: ""
  }

  ons(navn, verdi) {
    this.setState({ [navn]: verdi})
  }
  ons1(verdi) {
    this.setState({ bid: verdi})
  }
  ons2() {
    this.setState({ vis: "container d-block"})
  }

  render() {
    return(
      <div>
        <Kunde forn={this.state.fn} onChange={this.ons} onClick={this.ons2}/>
        <Bestilling fn={this.state.fn} en={this.state.en} tlf={this.state.tlf} epost={this.state.epost} onClick={this.ons1} v={this.state.vis}/>
        <Ekstrautstyr bid={this.state.bid}/>
      </div>

    );
  }
}
