import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { connection } from "./mysql_connection";
import { Card, List, Row, Column, NavBar, Button, Form } from './widgets';
import {bikeService} from './bikeservice';
import {bestillingService} from './services'
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
    return <div>Lagersiden</div>;
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
  sykkel = [];



  render() {
    if(!this.sykkelstatus) return null;
    let sykkelid = this.props.match.params.id;



    return(
      <Row title='Detaljer'>
      <Column>
      <p>Sykkelid: {sykkelid}</p>
      <label htmlFor='statusmeny'>Status: </label>
      <br/>
      <select id='statusmeny' defaultValue={this.sykkel.status}>
        {this.sykkelstatus.map(status => (

          <option value={status.statusid} key={status.statusid}>
              {status.statusmelding}
          </option>
        ))}
      </select>

      <br/>

      <div>
            <textarea id="obj" value={this.sykkel.fritekst} placeholder="Fritekst" maxLength="255" onInput={this.countChars} title="FeedbackMessage"></textarea>
            <p>Gjenstående tegn: <span id="charNum">255</span></p>
						<button type="button" id="fritekst" title="Lagre" onClick={this.save}>Lagre</button>
						<button type="button" id="fritekst" title="Back" onClick={this.back}>Tilbake</button>


                </div>
          </Column>
      </Row>
    );
  }

  mounted() {
    bikeService.getBikeStatus(sykkelstatus => {
      this.sykkelstatus = sykkelstatus;
    console.log(sykkelstatus);
  });
    bikeService.getBikeState(this.props.match.params.id, sykkel => {
   this.sykkel = sykkel;
   console.log(sykkel);
});

  }
 countChars(e){
    var maxLength = 255;
    var currentText = e.target.value;
    var strLength = currentText.length;
    var charRemain = (maxLength - strLength);

    this.sykkel.fritekst = e.target.value;

    if(charRemain < 0){
        document.getElementById("charNum").innerHTML = '<span style="color: red;">You have exceeded the limit of '+maxLength+' characters</span>';
    }else{
        document.getElementById("charNum").innerHTML = charRemain;
    }
}
save() {

  bikeService.updateBike(statusmeny.options[statusmeny.selectedIndex].value, obj.value, this.props.match.params.id, results => {

    history.push('/utleie');
  });
  }

back() {
  history.push('/utleie')
}

aktiver(){
document.getElementById("knapp").disabled = false;
}
}


class Utleie extends Component {
  best = [];

render(){
  return(
<div>

<input type="date" className="form-control" id="dato" onInput={this.handleClick}/>
<p>Collapsible Set:</p>
<button className="collapsible">Bestilling 1</button>
<div className="content">
<div>
<p>Hei</p>
  {this.best.map(best => (
    <div key={status.leieid}>
        {best.fornavn}
        <br/>
        <NavLink to={'/sykkel/' + best.sykkelid}>
        <Column>{best.sykkeltype}</Column>
        </NavLink>
        <br />
        {best.sted}
    </div>
  ))}
</div>
</div>
<button className="collapsible">Open Section 2</button>
<div className="content1">
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
</div>
<button className="collapsible">Open Section 3</button>
<div className="content1">
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
</div>
</div>
  );
}
mounted(){
  bikeService.collapsible();

  }
  handleClick(e) {
  e.preventDefault();
  bestillingService.getBestilling(dato.value,results => {
  this.best = results;
  console.log(this.best);
});
  console.log('The link was clicked.');
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
