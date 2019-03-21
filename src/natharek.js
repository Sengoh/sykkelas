import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';

import { connection } from './mysql_connection';
import { bestillingService } from './services';
import { Card, List, Row, Column, NavBar, Button, Form } from './widgets';

import GoogleMapReact from 'google-map-react';
//import { ansatteService } from './services'; fortsatt logget inn som ansatt ved redigering av siden

import { connection } from "./mysql_connection"
import { Card, List, Row, Column, NavBar, Button, Form } from './widgets';
import { ansatteService } from './services';

//import {styles} from './style.js';

//import {loginstyle} from "./login.css";

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Menu extends Component {
  render() {
    return (
      <NavBar brand="Aktive bestillinger">
        <NavBar.Link to="/andre">Andre sider</NavBar.Link>

class Menu extends Component {
  render() {
    return (
      <NavBar brand="WhiteBoard">
        <NavBar.Link to="/students">Students</NavBar.Link>
      </NavBar>
    );
  }
}

class AktivBestilling extends Component {
  render() {
    return (
      <div>
        <Card title="Aktive Bestillinger">
          <List>
            <br />
            <h5>Dagens bestillinger</h5>
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
                      <th>Sted</th>
                      <th>Sjekk</th>
                    </tr>
                    <tr>
                      <td>123</td>
                      <td>kundenavn</td>
                      <td>Antall sykler</td>
                      <td>Sykkeltype</td>
                      <td>Ekstra utstyr</td>
                      <td>Sted</td>
                      <td>
                        <input type="checkbox" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </List>
            </Card>
            <br />
            <h5>Dagens innleveringer</h5>
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
                      <th>Sted</th>
                      <th>Ankommet</th>
                    </tr>
                    <tr>
                      <td>678</td>
                      <td>fijfre</td>
                      <td>Antall sykler</td>
                      <td>Sykkeltype</td>
                      <td>Ekstra utstyr</td>
                      <td>Sted</td>
                      <td>
                        <input type="checkbox" />
                      </td>
                    </tr>
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
}

class GKart extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <Card>
        <div style={{ height: '70vh', width: '45%' }}>
          <GoogleMapReact defaultCenter={this.props.center} defaultZoom={this.props.zoom}>
            <AnyReactComponent lat={59.955413} lng={30.337844} text={'Kreyser Avrora'} />
          </GoogleMapReact>
        </div>
        <div>Kalender ved siden av?</div>
      </Card>
    );
  }
}

class Kalender extends Component {
  kunder = [];

  render() {
    return (
      <Card>
        <ul>
          {this.kunder.map(kunde => (
            <li key={kunde.brukerid}>
              {kunde.leieid}
              {kunde.fornavn}
              {kunde.etternavn}
            </li>
          ))}
        </ul>
      </Card>
    );
  }

  mounted() {
    bestillingService.getLeie(kunder => {
      this.kunder = kunder;
    });
  }
}

class Home extends Component {
  render() {
    return <Card title="Sykkelutleie AS">Logg inn for ansatte</Card>;
  }
}

ReactDOM.render(
  <HashRouter>
    <div>
      <Menu />
      <Route exact path="/" component={AktivBestilling} />
      <Route exact path="/" component={GKart} />
      <Route exact path="/" component={Kalender} />
    </div>
  </HashRouter>,
  document.getElementById('natharek')
);
