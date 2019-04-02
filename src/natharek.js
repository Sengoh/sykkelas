import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { Card, List, Row, Column, NavBar, Button, Form } from './widgets';
import { ansatteService, bestillingService } from './services';


import createHashHistory from "history/createHashHistory";
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

//google map

//før kopieres spørringene til services
//import { Bestilling, bestillingService } from './services';
import { connection } from "./mysql_connection";


class AktivBestilling extends Component {
  bestillinger = [];
  innleveringer = [];

  render() {
    return (
      <div>
        <Card title="Aktive Bestillinger">
          <Row>
            <Column width={6} />
            <Column right width={6}>
              <input id="kalender" type="date" />
            </Column>
          </Row>
          <List>
            <br />
            <h6>Dagens bestillinger</h6>
            <Card>
              <List>
                <table>
                  <tbody>
                    <tr>
                      <th>BestillingsID</th>
                      <th>Kunde</th>
                      <th>Antall sykler</th>
                      <th>Sykkeltype</th>
                      <th>Ekstra utstyr</th>
                      <th>Hentested</th>
                    </tr>
                    {this.bestillinger.map(bestilling => (
                      <tr key={bestilling.leieid}>

                        <td>{bestilling.leieid}</td>
                        <td>
                          {bestilling.fornavn} {bestilling.etternavn}
                        </td>
                        <td>{bestilling.antall}</td>
                        <td>{bestilling.sykkeltype}</td>
                        <td>{bestilling.utstyrtype}</td>
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
              </List>
            </Card>
            <br />

          </List>
        </Card>
      </div>
    );
  }

  edit () {
    history.push('/kunde/edit');
    console.log(this.bestilling.leieid);
  }

  mounted() {



    connection.query(
      'SELECT leieid, brukerid, fornavn, etternavn, COUNT(id) AS antall, IF( GROUP_CONCAT(`sykler_sykkelid`) IS NULL, "Ingen sykler", GROUP_CONCAT(`sykler_sykkelid`) ) AS sykkelid, IF( GROUP_CONCAT(`sykkeltype`) IS NULL, "Ingen sykler", GROUP_CONCAT(`sykkeltype`) ) AS sykkeltype, IF( GROUP_CONCAT(`utstyr_utstyrid`) IS NULL, "Ingen utstyr", GROUP_CONCAT(`utstyr_utstyrid`) ) AS utstyrid, IF( GROUP_CONCAT(`utstyrtype`) IS NULL, "Ingen utstyr", GROUP_CONCAT(`utstyrtype`) ) AS utstyrtype, lager, sted, START, slutt FROM leietaker l JOIN kunder k ON l.kunder_brukerid = k.brukerid LEFT JOIN leietaker_has_sykler ls ON l.leieid = ls.leietaker_leieid LEFT JOIN leietaker_has_utstyr lu ON l.leieid = lu.leietaker_leieid LEFT JOIN sykler s ON ls.sykler_sykkelid = s.id LEFT JOIN utstyr u ON lu.utstyr_utstyrid = u.utstyrid JOIN lager ON l.hentested = lager.lagerid JOIN sted ON l.leveringssted = sted.stedid GROUP BY leieid',
      (error, results) => {
        if (error) return console.error(error);

        this.bestillinger = results;
      }
    );

  }
}

export default AktivBestilling;

/*
class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 63.430637,
      lng: 10.39509
    },
    zoom: 9
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '70vh', width: '100%' }}>
        <GoogleMapReact defaultCenter={this.props.center} defaultZoom={this.props.zoom} />
      </div>
    );
  }
}
*/
