import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { Card, List, Row, Column, NavBar, Button, Form } from './widgets';
import { ansatteService, bestillingService } from './services';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

//google map

//før kopieres spørringene til services
//import { Bestilling, bestillingService } from './services';
import { connection } from './mysql_connection';
{/*
class Menu extends Component {
  render() {
    return (
      <Row>
        <Column>
          <NavBar brand="Home (Landing)" />
        </Column>
        <Column>
          <NavBar>
            <NavBar.Link to="/bestillingsreg">Registrere bestilling</NavBar.Link>
            <NavBar.Link to="/statistikk">Statistikk</NavBar.Link>
            <NavBar.Link to="/kalender">Kalender</NavBar.Link>
          </NavBar>
        </Column>
        <Column right>
          <Button.Danger small>Logg ut</Button.Danger>
        </Column>
      </Row>
    );
  }
}

*/}

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
            <h6>Dagens innleveringer</h6>
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
                      <th>Leveringssted</th>
                    </tr>
                    {this.innleveringer.map(innlevering => (
                      <tr key={innlevering.leieid} to={'/1/' + innlevering.leieid}>
                        <td>{innlevering.leieid}</td>
                        <td>
                          {innlevering.fornavn} {innlevering.etternavn}
                        </td>
                        <td>{innlevering.antall}</td>
                        <td>{innlevering.sykkeltype}</td>
                        <td>{innlevering.utstyrtype}</td>
                        <td>{innlevering.sted}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </List>
            </Card>
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
      'SELECT leieid, brukerid, fornavn, etternavn, COUNT(id) as antall, if(GROUP_CONCAT(`sykler_sykkelid`) IS NULL,"Ingen sykler",GROUP_CONCAT(`sykler_sykkelid`) ) as sykkelid, if(GROUP_CONCAT(`sykkeltype`) IS NULL,"Ingen sykler",GROUP_CONCAT(`sykkeltype`) ) as sykkeltype, if(GROUP_CONCAT(`utstyr_utstyrid`) IS NULL,"Ingen utstyr",GROUP_CONCAT(`utstyr_utstyrid`) ) as utstyrid, if(GROUP_CONCAT(`utstyrtype`) IS NULL,"Ingen utstyr",GROUP_CONCAT(`utstyrtype`) ) as utstyrtype, sted FROM leietaker l JOIN kunder k on l.kunder_brukerid=k.brukerid LEFT JOIN leietaker_has_sykler ls on l.leieid=ls.leietaker_leieid LEFT JOIN leietaker_has_utstyr lu on l.leieid=lu.leietaker_leieid LEFT JOIN sykler s on ls.sykler_sykkelid=s.id LEFT JOIN utstyr u on lu.utstyr_utstyrid=u.utstyrid JOIN sted on l.hentested=sted.stedid GROUP BY leieid',
      (error, results) => {
        if (error) return console.error(error);

        this.bestillinger = results;
      }
    );
    connection.query(
      'SELECT leieid, brukerid, fornavn, etternavn, COUNT(id) as antall, if(GROUP_CONCAT(`sykler_sykkelid`) IS NULL,"Ingen sykler",GROUP_CONCAT(`sykler_sykkelid`) ) as sykkelid, if(GROUP_CONCAT(`sykkeltype`) IS NULL,"Ingen sykler",GROUP_CONCAT(`sykkeltype`) ) as sykkeltype, if(GROUP_CONCAT(`utstyr_utstyrid`) IS NULL,"Ingen utstyr",GROUP_CONCAT(`utstyr_utstyrid`) ) as utstyrid, if(GROUP_CONCAT(`utstyrtype`) IS NULL,"Ingen utstyr",GROUP_CONCAT(`utstyrtype`) ) as utstyrtype, sted FROM leietaker l JOIN kunder k on l.kunder_brukerid=k.brukerid LEFT JOIN leietaker_has_sykler ls on l.leieid=ls.leietaker_leieid LEFT JOIN leietaker_has_utstyr lu on l.leieid=lu.leietaker_leieid LEFT JOIN sykler s on ls.sykler_sykkelid=s.id LEFT JOIN utstyr u on lu.utstyr_utstyrid=u.utstyrid JOIN sted on l.leveringssted=sted.stedid GROUP BY leieid',
      (error, results) => {
        if (error) return console.error(error);

        this.innleveringer = results;
      }
    );
  }
}


export default AktivBestilling

{/*
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

ReactDOM.render(
  <HashRouter>
    <div>
      <Menu />
      <Route exact path="/" component={AktivBestilling} />
      <Route exact path="/students/:leieid" component={EndreBestilling} />

      <Route exact path="/" component={SimpleMap} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
*/}
