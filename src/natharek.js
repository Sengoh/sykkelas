import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { Card, List, Row, Column, NavBar, Button, Form } from './widgets';

// import {  } from './services';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

import GoogleMapReact from 'google-map-react';

class Menu extends Component {
  render() {
    return (
      <NavBar brand="Aktive bestillinger">
        <NavBar.Link to="/calendar">Kalender</NavBar.Link>
        <NavBar.Link to="/map">Map</NavBar.Link>
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
                      <td>fijfre</td>
                      <td>Antall sykler</td>
                      <td>Sykkeltype</td>
                      <td>Ekstra utstyr</td>
                      <td>Sted</td>
                      <td>Velg</td>
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
                      <td>Velg</td>
                    </tr>
                  </tbody>
                </table>
              </List>
            </Card>
          </List>
        </Card>
      </div>
    );
  }
}
{
class SimpleMap extends Component {
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
      <div style={{ height: '70vh', width: '50%' }}>
        <GoogleMapReact defaultCenter={this.props.center} defaultZoom={this.props.zoom}>
          <AnyReactComponent lat={59.955413} lng={30.337844} text={'Kreyser Avrora'} />
        </GoogleMapReact>
      </div>
    );
  }
}

class Bestilloversikt extends Component {
  render() {
    return <Card title="Sykkelutleie AS">Logg inn for ansatte</Card>;
  }
}

ReactDOM.render(
  <HashRouter>
    <div>
      <Menu />
      <Route exact path="/" component={AktivBestilling} />

      <Route exact path="/map" component={SimpleMap} />
    </div>
  </HashRouter>,
  document.getElementById('natharek')
);
