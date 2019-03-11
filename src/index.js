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

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Menu extends Component {
  render() {
    return (
      <NavBar brand="WhiteBoard">
        <NavBar.Link to="/students">Students</NavBar.Link>
      </NavBar>
    );
  }
}

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
          <div className="flex-row">
            <Card>
              <Form.Label>Epost: </Form.Label>
              <Form.Input id="username" className='lf--input' placeholder='Epost' type='text' onChange={event => this.epost = event.target.value}/>
              <Form.Label>Passord: </Form.Label>
              <Form.Input id="password" className='lf--input' placeholder='Passord' type='password' onChange={event => this.passord = event.target.value}/>
              <Button.Success onClick={this.login}>Logg inn</Button.Success>

            </Card>
          </div>
          <div className="flex-row">
          </div>
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
          alert("Velkommen " + this.ansatte[0].fornavn + " " + this.ansatte[0].etternavn + ", Epost: " + this.ansatte[0].epost)
        } else {
          alert("Skriv inn riktig epost og passord.")
        }
    });
  }

}



ReactDOM.render(
  <HashRouter>
    <div>
    <Route exact path="/" component={Home} />

      <LogIn />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
