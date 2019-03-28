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
  innleveringer = [];

  render() {

    return (

      <div className="container pt-5">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Kunde</th>
                <th scope="col">Antall sykler</th>
                <th scope="col">Sykkeltype</th>
                <th scope="col">Ekstra utstyr</th>
                <th scope="col">Hentested</th>
              </tr>
            </thead>
            <tbody>
            {this.bestillinger.map(bestilling => (
              <tr>
                <td><input value={bestilling.fornavn} onChange={e => (this.bestilling.fornavn = e.target.value)}/></td>
                <td><input value={bestilling.antall} onChange={e => (this.bestilling.antall = e.target.value)}/></td>
                <td><input value={bestilling.sykkeltype} onChange={e => (this.bestilling.sykkeltype= e.target.value)}/></td>
                <td><input value={bestilling.utstyrtype} onChange={e => (this.bestilling.utstyrtype= e.target.value)}/></td>
                <td><input value={bestilling.sted} onChange={e => (this.bestilling.sted = e.target.value)}/></td>

              </tr>
            ))}
            </tbody>
          </table>
          <button type="button" className="btn btn-success m-2" onClick={this.save}>
            Lagre
          </button>
          <button type="button" className="btn btn-danger m-2" onClick={this.cancel}>
            Avbryt
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

  cancel() {
    history.push('/nat');
  }
}

export { BestEdit };
