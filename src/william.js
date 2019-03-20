//Dette er fila for destinasjonssiden!
import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { connection } from "./mysql_connection"
import { Card, List, Row, Column, NavBar, Button, Form } from './widgets';
import { ansatteService } from './services';

//import {styles} from './style.js';

//import {loginstyle} from "./login.css";

//win.loadUrl(`file://${__dirname}/page.html`);

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Menu extends Component {
  render() {
    return (
      <NavBar brand="Sykkelutleie AS">
        <NavBar.Link to="/kunder">Eventuell meny</NavBar.Link>
      </NavBar>
    );
  }
}

class Home extends Component {
  render() {
    return <Card title="Endre bestilling"></Card>;
  }
}


class BestDetails extends Component {
  kunder = null;
  brukerid = 1;



  render() {
    if (!this.kunder) return null;

    return (

      <div className="container pt-5">
        <Card>

          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Fornavn</th>
                <th scope="col">Etternavn</th>
                <th scope="col">Adresse</th>
                <th scope="col">Telefon</th>
                <th scope="col">Postnr.</th>
                <th scope="col">Poststed</th>
                <th scope="col">E-post</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.kunder.fornavn}</td>
                <td>{this.kunder.etternavn}</td>
                <td>{this.kunder.addresse}</td>
                <td>{this.kunder.telefon}</td>
                <td>{this.kunder.postnr}</td>
                <td>{this.kunder.poststed}</td>
                <td>{this.kunder.epost}</td>
              </tr>
            </tbody>
          </table>
          <button type="button" className="btn btn-primary m-2" onClick={this.edit}>
            Endre bestilling
          </button>
          <button type="button" className="btn btn-danger m-2" onClick={this.delete}>
            Slett bestilling
          </button>

        </Card>

      </div>


    );

  }

  mounted() {
    ansatteService.getKunde(this.brukerid, kunder => {
      this.kunder = kunder;
    });
  }

  edit() {
    history.push('/kunder/' + this.brukerid + '/edit');
  }

  delete() {
    ansatteService.deleteBest(this.props.match.params.id, () => history.push('/students'));
  }

}

class KundeEdit extends Component {
  kunder = null;

  render() {
    if (!this.kunder) return null;

    return (

      <div className="container pt-5">
        <Card>

          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Fornavn</th>
                <th scope="col">Etternavn</th>
                <th scope="col">Adresse</th>
                <th scope="col">Telefon</th>
                <th scope="col">Postnr.</th>
                <th scope="col">Poststed</th>
                <th scope="col">E-post</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="text" className="form-control" value={this.kunder.fornavn} onChange={e => (this.kunder.fornavn = e.target.value)} /></td>
                <td><input type="text" className="form-control" value={this.kunder.etternavn} onChange={e => (this.kunder.etternavn = e.target.value)} /></td>
                <td><input type="text" className="form-control" value={this.kunder.addresse} onChange={e => (this.kunder.addresse = e.target.value)} /></td>
                <td><input type="text" className="form-control" value={this.kunder.telefon} onChange={e => (this.kunder.telefon = e.target.value)} /></td>
                <td><input type="text" className="form-control" value={this.kunder.postnr} onChange={e => (this.kunder.postnr = e.target.value)} /></td>
                <td><input type="text" className="form-control" value={this.kunder.poststed} onChange={e => (this.kunder.poststed = e.target.value)} /></td>
                <td><input type="text" className="form-control" value={this.kunder.epost} onChange={e => (this.kunder.epost = e.target.value)} /></td>
              </tr>
            </tbody>
          </table>
          <button type="button" className="btn btn-success m-2" onClick={this.save}>
            Lagre
          </button>
          <button type="button" className="btn btn-danger m-2" onClick={this.cancel}>
            Avbryt
          </button>

        </Card>

      </div>
    );
  }

  mounted() {
    ansatteService.getKunde(this.props.match.params.id, kunder => {
      this.kunder = kunder;
    });
  }

  save() {
    studentService.updateStudent(this.student, () => {
      history.push('/students/' + this.props.match.params.id);
    });
  }

  cancel() {
    history.push('/kunder');
  }
}


ReactDOM.render(
  <HashRouter>
    <div>
      <Menu />
      <Route exact path="/" component={Home} />
      <BestDetails />
      <Route exact path="/kunder" component={BestDetails} />
      <Route exact path="/kunder/:id/edit" component={KundeEdit} />
    </div>
  </HashRouter>,
  document.getElementById('william')
);
