import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { connection } from "./mysql_connection"
import { Card, List, Row, Column, NavBar, Button, Form } from './widgets';
import { ansatteService } from './services';

//import {styles} from './style.js';
//import styles from './DottedBox.css';

//import {loginstyle} from "./login.css";

//win.loadUrl(`file://${__dirname}/page.html`);

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Home extends Component {
  render() {
    return <Card title="Sykkelutleie AS">Logg inn for ansatte</Card>;
  }
}

class LogIn extends Component {
  ansatte = [];
  epost = "";
  passord = "";
  form = null;


  render() {
    return (
      <div>
        <div>
          </div>
          <form ref={element => (this.form = element)} className='login-form' onSubmit={this.handleSubmit}>
            <Card>
              <Form.Label>Epost: </Form.Label>
              <Form.Input id="username" className='lf--input' placeholder='Epost' type='text' onChange={event => this.epost = event.target.value}/>
              <Form.Label>Passord: </Form.Label>
              <Form.Input id="password" className='lf--input' placeholder='Passord' type='password' onChange={event => this.passord = event.target.value}/>
              <Button.Success onClick={this.login}>Logg inn</Button.Success>

            </Card>

        </form>
        </div>

    );

  }
  login(){
    if (!this.form.checkValidity()) return;

    ansatteService.getAnsatt(this.epost,this.passord,ansatte => {
        console.log(ansatte);
        if(ansatte.length > 0){
          this.ansatte = ansatte;
          //this.ree();

          alert("Velkommen " + this.ansatte[0].fornavn + " " + this.ansatte[0].etternavn + ", Epost: " + this.ansatte[0].epost);
          history.push('/loggedin');
        } else {
          alert("Skriv inn riktig epost og passord.")
        }
    });
  }

}

class Forside extends Component {
  //ansatte = LogIn.ansatte;

  render() {
    history.push('/');
    return(

      <div>
        {this.ansatte.map(ansatt =>(
          <div key={ansatt.ansattid}>
            Navn: {ansatt.fornavn} {ansatt.etternavn} <br />
            Epost: {ansatt.epost} <br />
            Telefon: {ansatt.telefon} <br />
          </div>
        ))}
        test
      </div>
    );

  }
}



ReactDOM.render(
  <HashRouter>
    <div>
    <Route exact path="/" component={Home} />

      <LogIn />
    <Route exact path="/loggedin" component={Forside} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
