import React from 'react';
import { Component } from 'react-simplified';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { connection } from "./mysql_connection"
import { Card, List, Row, Column, NavBar, Button, Form } from './widgets';
import { ansatteService, bestillingService } from './services';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student


class BestEdit extends Component {
  bestillinger = [];
  state = {
    start: "",
    slutt: "",
    hente: "",
    levere: "",
    hentested: null,
    leveringssted: null,
    gruppe: null
  }

  render() {

    return (

      <div className="container pt-5">
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th scope="col">BestillingsID</th>
                <th scope="col">Kunde</th>
                <th scope="col">Antall sykler</th>
                <th scope="col">Hentetid</th>
                <th scope="col">Hentested</th>
                <th scope="col">Leveringstid</th>
                <th scope="col">Leveringssted</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
            {this.bestillinger.map(bestilling => (
              <tr key={bestilling.leieid}>
                <td>{bestilling.leieid}</td>
                <td>{bestilling.fornavn} {bestilling.etternavn}</td>
                <td>{bestilling.antall}</td>
                <td>{bestilling.start.getHours()}:{bestilling.start.getMinutes()} {bestilling.start.getDate()}.{bestilling.start.getMonth()}.{bestilling.start.getFullYear()}</td>
                <td>{bestilling.lager}</td>
                <td>{bestilling.slutt.getHours()}:{bestilling.slutt.getMinutes()} {bestilling.slutt.getDate()}.{bestilling.slutt.getMonth()}.{bestilling.slutt.getFullYear()}</td>
                <td>{bestilling.sted}</td>
                <td>
                  <button type="button" className="btn btn-danger" key={bestilling.leieid} onClick={()=>history.push("/kunde/"+ bestilling.leieid + "/edit")} >
                    Slett
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
          <hr className="pt-3 pb-4"></hr>
          <div>
            <h4>Endre bestilling</h4>
          </div>
          {this.bestillinger.map(bestilling => (

          <form>
            <div className="form-row pt-5">
               <div className="col mb-3">
                 <label htmlFor="exampleInputEmail1">Fra</label>
                 <input type="date" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={this.state.start} onChange={event => this.setState({ start: event.target.value})}/>
               </div>
               <div className="col mb-3">
                 <label htmlFor="exampleInputEmail1">Hentetid</label>
                 <input type="time" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={this.state.hente} onChange={event => this.setState({ hente: event.target.value})} />
               </div>
               <div className="col mb-3">
                 <label htmlFor="exampleInputEmail1">Hentested</label>
                 <select className="custom-select" onChange={event => this.setState({ hentested: event.target.value})}>
                   <option defaultValue>Velg sted</option>
                   <option value="1">Haugastøl</option>
                   <option value="2">Finse</option>
                 </select>
               </div>
             </div>

            <div className="form-row">
               <div className="col mb-3">
                 <label htmlFor="exampleInputPass">Til</label>
                 <input type="date" className="form-control" id="exampleInputPass" aria-describedby="emailHelp" value={this.state.slutt} onChange={event => this.setState({ slutt: event.target.value})} />
               </div>
               <div className="col mb-3">
                 <label htmlFor="exampleInputPass">Leveringstid</label>
                 <input type="time" className="form-control" id="exampleInputPass" aria-describedby="emailHelp" value={this.state.levere} onChange={event => this.setState({ levere: event.target.value})} />
               </div>
               <div className="col mb-3">
                 <label htmlFor="exampleInputPass">Leveringssted</label>
                 <select className="custom-select" onChange={event => this.setState({ leveringssted: event.target.value})}>
                   <option defaultValue>Velg sted</option>
                   <option value="1">Haugastøl</option>
                   <option value="2">Finse</option>
                   <option value="3">Flåm</option>
                   <option value="4">Voss</option>
                   <option value="5">Myrdal</option>
                 </select>
               </div>
             </div>

             <div className="form-row pt-5">

                <div className="col-4 mb-3">
                <h6>Gruppebestilling</h6>
                  <div className="form-check mb-2">
                   <input className="form-check-input" type="checkbox" id="autoSizingCheck" onChange={() => gruppe.disabled ? gruppe.disabled = false : gruppe.disabled = true} />
                   <label className="form-check-label" htmlFor="autoSizingCheck">
                     Gruppe
                   </label>
                 </div>
                 <div className="col mb-3">
                   <label htmlFor="gruppe">Antall personer</label>
                   <input type="number" id="gruppe" className="form-control" aria-describedby="emailHelp" value={this.state.gruppe} onChange={event => (this.state.gruppe = event.target.value)} disabled />
                 </div>
                </div>



              </div>


            </form>
          ))}
          <button type="button" className="btn btn-danger m-2 float-right" onClick={this.cancel}>
            Avbryt
          </button>
          <button type="button" className="btn btn-success m-2 float-right" onClick={this.save}>
            Lagre
          </button>

      </div>
    );
  }

  mounted() {
      bestillingService.getBest(this.props.match.params.leieid, bestilling => {
      this.bestillinger = bestilling;
      console.log(this.props.match.params.leieid);
    });

    console.log(this.bestillinger);
  }

  save() {
    bestillingService.updateBest(this.state.start + " " + this.state.hente + ":00", this.state.slutt + " " + this.state.levere + ":00", this.state.hentested, this.state.leveringssted, this.state.gruppe, this.props.match.params.leieid, () => {

    });
    history.push('/nat');

  }

  delete() {
    bestillingService.updateBest(this.bestillinger, () => {
      history.push('/nat');
    });
  }

  cancel() {
    history.push('/nat');
  }
}

export { BestEdit };
