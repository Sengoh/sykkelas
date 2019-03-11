import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { connection } from './mysql_connection';
import { Card, List, Row, Column, NavBar, Button, Form } from './widgets';

import GoogleMapReact from 'google-map-react';
//import { ansatteService } from './services'; fortsatt logget inn som ansatt ved redigering av siden

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

const AnyReactComponent = ({ text }) => <div>{text}</div>;

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
// // <Calendar onChange={this.onChange} value={this.state.date} />
class AktivBestilling extends Component {
  render() {
    return (
      <div>
        <div />
        <Card title="Aktive Bestillinger">
          <List>
            Dagens bestillinger
            <Card>
              <List>
                <table>
                  <tbody>
                    <tr>
                      <td>Bestilling ID:</td>
                      <td>Kunde</td>
                      <td>Antall sykler</td>
                      <td>Sykkeltype</td>
                      <td>Ekstra utstyr</td>
                      <td>Sted</td>
                      <td>Velg</td>
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
            {'\n'}
            <Card title="Dagens innleveringer">
              <Card>
                <List>
                  <table>
                    <tbody>
                      <tr>
                        <td>Bestilling ID:</td>
                        <td>Kunde</td>
                        <td>Antall sykler</td>
                        <td>Sykkeltype</td>
                        <td>Ekstra utstyr</td>
                        <td>Sted</td>
                        <td>Velg</td>
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
            </Card>
          </List>
        </Card>
      </div>
    );
  }
}

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
  document.getElementById('root')
);
