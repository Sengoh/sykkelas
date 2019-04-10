import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { connection } from "./mysql_connection";
import { Card, List, Row, Column, NavBar, Button, Form } from './widgets';
import {bikeService} from './bikeservice';
import {bestillingService} from './services'
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import



import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export class LagerMeny extends Component {
  render() {
    return (
      <div className="container d-flex justify-content-center" style={{ marginTop: "35vh" }}>
      <div className="card border-dark">
        <div className="card-body">

        <button
          type="button"
          className="btn btn-light m-2"
          onClick={this.routeChange1}
        >
          Utlevering
        </button>
        <button
          type="button"
          className="btn btn-light m-2"
          onClick={this.routeChange2}
        >
          Sykkelverksted
        </button>

        </div>
      </div>
    </div>
    )
  }
  routeChange1() {
    history.push("/utleie");
  }
  routeChange2() {
    history.push("/sykkel");
  }
}

/*<button className="btn btn-primary btn-large centerButton"
type="submit" autoFocus onClick={e => this.input = event.target.value}>Send</button>*/



export class BikeList extends Component {
  sykler = [];

  render() {
    return (
      <div className="container">
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

      </div>
    );
  }

  mounted() {
    bikeService.getBikes(sykler => {
      this.sykler = sykler;
    });
  }
}

export class BikeDetails extends Component {
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
      <p>Sykkelstatus: {this.sykkelstatus.statusid}</p>
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
						<button type="button" id="knapp1" title="Lagre" onClick={this.save}>Lagre</button>
						<button type="button" id="knapp2" title="Back" onClick={this.back}>Tilbake</button>


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

export class Utleie extends Component {
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

// ReactDOM.render(
//   <HashRouter>
//     <div>
//     <Menu />
//     <Route exact path="/sykkel" component={BikeList} />
//     <Route exact path="/sykkel/:id/" component={BikeDetails} />
//     <Route exact path="/utleie" component={Utleie} />
//     <Route exact path="/" component={Home} />
//     <Route exact path="/sykler" component={BikeList} />
//     </div>
//   </HashRouter>,
//   document.getElementById('admin')
// );
    // <Route exact path="/" component={Home} />
