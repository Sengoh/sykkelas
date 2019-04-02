import React from 'react';
import { Component } from 'react-simplified';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { connection } from "./mysql_connection"
import { Card, List, Row, Column, NavBar, Button, Form } from './widgets';
import { ansatteService, bestillingService } from './services';


//win.loadUrl(`file://${__dirname}/page.html`);

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student


class BestEdit extends Component {
  bestillinger = [];

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
                <th scope="col">Leveringstid</th>
                <th scope="col">Hentested</th>
                <th scope="col">Leveringssted</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
            {this.bestillinger.map(bestilling => (
              <tr>
                <td>{bestilling.leieid}</td>

                <td>{bestilling.fornavn} {bestilling.etternavn}</td>
                <td>{bestilling.antall}</td>
                <td><input className="form-control" value={bestilling.sykkeltype} onChange={e => (this.bestilling.sykkeltype= e.target.value)}/></td>
                <td><input className="form-control" value={bestilling.utstyrtype} onChange={e => (this.bestilling.utstyrtype= e.target.value)}/></td>
                <td><input className="form-control" value={bestilling.sted} onChange={e => (this.bestilling.sted = e.target.value)}/></td>

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
                 <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={this.state.hentested} onChange={event => this.setState({ hentested: event.target.value})}/>
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
                 <input type="text" className="form-control" id="exampleInputPass" aria-describedby="emailHelp" value={this.state.leveringssted} onChange={event => this.setState({ leveringssted: event.target.value})} />
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
    });
{/*
    connection.query(
      'SELECT leieid, brukerid, fornavn, etternavn, COUNT(id) as antall, if(GROUP_CONCAT(`sykler_sykkelid`) IS NULL,"Ingen sykler",GROUP_CONCAT(`sykler_sykkelid`) ) as sykkelid, if(GROUP_CONCAT(`sykkeltype`) IS NULL,"Ingen sykler",GROUP_CONCAT(`sykkeltype`) ) as sykkeltype, if(GROUP_CONCAT(`utstyr_utstyrid`) IS NULL,"Ingen utstyr",GROUP_CONCAT(`utstyr_utstyrid`) ) as utstyrid, if(GROUP_CONCAT(`utstyrtype`) IS NULL,"Ingen utstyr",GROUP_CONCAT(`utstyrtype`) ) as utstyrtype, sted FROM leietaker l JOIN kunder k on l.kunder_brukerid=k.brukerid LEFT JOIN leietaker_has_sykler ls on l.leieid=ls.leietaker_leieid LEFT JOIN leietaker_has_utstyr lu on l.leieid=lu.leietaker_leieid LEFT JOIN sykler s on ls.sykler_sykkelid=s.id LEFT JOIN utstyr u on lu.utstyr_utstyrid=u.utstyrid JOIN sted on l.leveringssted=sted.stedid GROUP BY leieid',
      (error, results) => {
        if (error) return console.error(error);

        this.innleveringer = results;
      }
    );

    */}
  }

  save() {
    bestillingService.updateBest(this.bestillinger, () => {
      history.push('/nat');
    });
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
