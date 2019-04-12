import React from 'react';
import { Component } from 'react-simplified';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { ansatteService, bestillingService } from '../services/services';
import { connection } from '../services/mysql_connection';


import createHashHistory from "history/createHashHistory";
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student



class BestillingsOversikt extends Component {
  bestillinger = [];


  render() {
    return (
      <div className="container">
      <form className="pb-3 pt-4">
        <div className="row">
          <div className="col-3">
            <input type="date" className="form-control" id="dato" onInput={this.finnBestillinger}/>
          </div>
          <div className="col">
            <button type="button" className="btn btn-secondary" onClick={this.reset} >
              X
            </button>
          </div>
        </div>
      </form>

        <table className="table table-hover">
          <thead className="thead-light">
            <tr>
              <th>BestillingsID</th>
              <th>Kunde</th>
              <th>Antall sykler</th>
              <th>Hentetid</th>
              <th>Hentested</th>
              <th>Leveringstid</th>
              <th>Leveringssted</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.bestillinger.map(bestilling => (
              <tr key={bestilling.leieid}>
                <td>{bestilling.leieid}</td>
                <td>{bestilling.fornavn} {bestilling.etternavn}</td>
                <td>{bestilling.antall}</td>
                <td>{("0" + bestilling.start.getHours()).slice(-2)}:{("0" + bestilling.start.getMinutes()).slice(-2)}<br></br>{bestilling.start.toLocaleDateString()}</td>
                <td>{bestilling.lager}</td>
                <td>{("0" + bestilling.slutt.getHours()).slice(-2)}:{("0" + bestilling.slutt.getMinutes()).slice(-2)} {bestilling.start.toLocaleDateString()}</td>
                <td>{bestilling.sted}</td>
                <td>
                  <button type="button" className="btn btn-primary" key={bestilling.leieid} onClick={()=>history.push("/bestillingsOversikt/"+ bestilling.leieid + "/edit")} >
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

  // Søk etter bestilling med hentetid
  finnBestillinger() {
    bestillingService.getBestilling(dato.value,results => {
      this.bestillinger = results;
    })
  }

  // Nullstill datofeltsøk
  reset() {
    bestillingService.getAllBest(results => {
        this.bestillinger = results;
      }
    )
    dato.value = ""
  }

  mounted() {
    bestillingService.getAllBest(results => {
        this.bestillinger = results;
      }
    )
  }

}

export default BestillingsOversikt;
