import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { connection } from "./mysql_connection";
import { Card, List, Row, Column, NavBar, Button, Form } from './widgets';
import {bikeService} from './bikeservice';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import


import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Menu extends Component {
  render() {
    return (
      <table>
        <tbody>
          <tr>
            <td>
              <NavLink exact activeStyle={{ color: 'darkblue' }} to="/utleie">
                Utlevering
              </NavLink>
            </td>
            <td>
              <NavLink exact activeStyle={{ color: 'darkblue' }} to="/sykkel">
                Sykkelverksted
              </NavLink>
            </td>
            <td>
              <NavLink activeStyle={{ color: 'darkblue' }} to="/courses">
                Courses
              </NavLink>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

/*<button className="btn btn-primary btn-large centerButton"
type="submit" autoFocus onClick={e => this.input = event.target.value}>Send</button>*/

class Home extends Component {
  render() {
    return <div>Welcome to WhiteBoard</div>;
  }
}

class BikeList extends Component {
  sykler = [];

  render() {
    return (
      <div>
      <Card>
      <List title='sykler'>
      <Column>Trykk på sykkelen du vil endre informasjonen til</Column>

      <Row>
      <ol key={this.sykler.id}>
        {this.sykler.map(sykkel => (
          <li key={sykkel.id}>
            <NavLink activeStyle={{ color:'darkblue'}} to={'/sykkel/' + sykkel.id}>
            <Column>Merke:  {sykkel.merke}</Column>
            </NavLink>
            <Column> {sykkel.modell}</Column>
            <Column>  {sykkel.sykkeltype}</Column>
            <Column> Tilgjengelig: {sykkel.tilgjengelig}</Column>
          </li>
        ))}
      </ol>
        </Row>
        </List>
        </Card>

        <button type="button">
          New
        </button>
      </div>
    );
  }

  mounted() {
    bikeService.getBikes(sykler => {
      this.sykler = sykler;
    });
  }
}

class BikeDetails extends Component {
  statusid = '';
  sykkelstatus = null;
  statusmelding = '';



  render() {
    console.log(this.sykkelstatus);
    let sykkelid = this.props.match.params.id;
    console.log(sykkelid);
    if(!this.sykkelstatus) return null;

    return(
      <Row title='Detaljer'>
      <Column>

      <select defaultValue={sykkelid}>
        {this.sykkelstatus.map(status => (
          <option value={status.statusid} key={status.statusid}>
              {status.statusmelding}
          </option>
        ))}
      </select>
      <p>{sykkelid}</p>
      </Column>
      </Row>
    );
  }

  mounted() {
    bikeService.getBikeStatus(sykkelstatus => {
      this.sykkelstatus = sykkelstatus;
    console.log(sykkelstatus);
    //  console.log(sykkelstatus[0].statusmelding);
    });
  }
}

class Utleie extends Component {
render(){
  return(
<div>
<p>Collapsible Set:</p>
<button className="collapsible">Open Section 1</button>
<div className="content">
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
</div>
<button className="collapsible">Open Section 2</button>
<div className="content">
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
</div>
<button className="collapsible">Open Section 3</button>
<div className="content">
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
</div>
</div>
  );
}
mounted(){
  bikeService.collapsible();
}
}

ReactDOM.render(
  <HashRouter>
    <div>
    <Menu />
    <Route exact path="/sykkel" component={BikeList} />
    <Route exact path="/sykkel/:id/" component={BikeDetails} />
    <Route exact path="/utleie" component={Utleie} />
    <Route exact path="/" component={Home} />
    <Route exact path="/sykler" component={BikeList} />
    </div>
  </HashRouter>,
  document.getElementById('admin')
);
    // <Route exact path="/" component={Home} />
