import React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { Card, List, Row, Column, NavBar, Button, Form } from './widgets';
import { ansatteService, bestillingService } from './services';


import createHashHistory from "history/createHashHistory";
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

import { connection } from "./mysql_connection";


class AktivBestilling extends Component {
  bestillinger = [];

  render() {
    return (
      <div className="container">
        <table className="table">
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
                <td>{bestilling.start.getHours()}:{bestilling.start.getMinutes()} {bestilling.start.getDate()}.{bestilling.start.getMonth()}.{bestilling.start.getFullYear()}</td>
                <td>{bestilling.lager}</td>
                <td>{bestilling.slutt.getHours()}:{bestilling.slutt.getMinutes()} {bestilling.slutt.getDate()}.{bestilling.slutt.getMonth()}.{bestilling.slutt.getFullYear()}</td>
                <td>{bestilling.sted}</td>
                <td>
                  <button type="button" className="btn btn-primary" key={bestilling.leieid} onClick={()=>history.push("/kunde/"+ bestilling.leieid + "/edit")} >
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

  edit () {
    history.push('/kunde/edit');
    console.log(this.bestilling.leieid);
  }

  mounted() {
    connection.query(
      'SELECT leieid, brukerid, fornavn, etternavn, COUNT(id) AS antall, IF( GROUP_CONCAT(`sykler_sykkelid`) IS NULL, "Ingen sykler", GROUP_CONCAT(`sykler_sykkelid`) ) AS sykkelid, IF( GROUP_CONCAT(`sykkeltype`) IS NULL, "Ingen sykler", GROUP_CONCAT(`sykkeltype`) ) AS sykkeltype, IF( GROUP_CONCAT(`utstyr_utstyrid`) IS NULL, "Ingen utstyr", GROUP_CONCAT(`utstyr_utstyrid`) ) AS utstyrid, IF( GROUP_CONCAT(`utstyrtype`) IS NULL, "Ingen utstyr", GROUP_CONCAT(`utstyrtype`) ) AS utstyrtype, lager, sted, start, slutt FROM leietaker l JOIN kunder k ON l.kunder_brukerid = k.brukerid LEFT JOIN leietaker_has_sykler ls ON l.leieid = ls.leietaker_leieid LEFT JOIN leietaker_has_utstyr lu ON l.leieid = lu.leietaker_leieid LEFT JOIN sykler s ON ls.sykler_sykkelid = s.id LEFT JOIN utstyr u ON lu.utstyr_utstyrid = u.utstyrid JOIN lager ON l.hentested = lager.lagerid JOIN sted ON l.leveringssted = sted.stedid GROUP BY leieid',
      (error, results) => {
        if (error) return console.error(error);

        this.bestillinger = results;
      }
    );

  }
}

export default AktivBestilling;
