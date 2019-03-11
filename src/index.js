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
  test = "";
  form = null;
  test2 = "";

  constructor(props) {
      super(props);
      this.state = {value: ''};

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({value: event.target.value});
    }

    handleSubmit(event) {
      //alert('A name was submitted: ' + this.state.value);
      this.test = this.state.value;

      alert(this.ansatte[0]);
      event.preventDefault();


    }



  render() {
    return (
      <div>
        <div>
          </div>
          <form ref={element => (this.form = element)} className='login-form' onSubmit={this.handleSubmit}>
          <div className="flex-row">
            <Card>
              <Form.Label>Brukernavn: </Form.Label>
              <Form.Input id="username" className='lf--input' placeholder='Brukernavn' type='text' onChange={event => this.test = event.target.value}/>
              <Form.Label>Passord: </Form.Label>
              <Form.Input id="password" className='lf--input' placeholder='Passord' type='password'/>
              <Button.Success onClick={this.login}>Logg inn</Button.Success>

            </Card>
          </div>
          <div className="flex-row">
          </div>
          <input className='lf--submit' type='submit' value='LOGIN'/>
        </form>
        </div>

    );

  }
  login(){
    if (!this.form.checkValidity()) return;
    connection.query('select * from ansatte where epost=?',[this.test], (error, results) => {
      if (error) return console.error(error);

      if(results.length > 0){
        this.ansatte = results;
        this.ree();
      } else {
        alert("Skriv inn riktig epost.")
      }
      //console.log(this.ansatte[0])
      // this.ansatte = results;
      // console.log(this.ansatte[0].fornavn)
      // this.ree();
    });
    // ansatteService.getAnsatt(ansatte => {
    //     console.log(ansatte);
    //     //this.ansatte = ansatte;
    // });
    // alert("hello " + this.test);
    // for(let i = 0;i<=this.ansatte.length;i++) {
    //   //alert(this.ansatte[0].fornavn);
    //   console.log(this.ansatte.length);
    // }
    //
    // <div>
    // {this.ansatte.map(ansatt => (
    //     <p key={ansatt.ansattid}>Haha {ansatt.fornavn}</p>
    // ))}
    // </div>
    // alert("hello " + this.ansatte[0]);
  }

  ree(){
    alert("Velkommen " + this.ansatte[0].fornavn)
  }
  // mounted() {
  //   connection.query('select fornavn,etternavn from ansatte', (error, results) => {
  //     if (error) return console.error(error);
  //
  //     this.ansatte = results;
  //   });
  // }
  // mounted() {
  //   connection.query('select * from ansatte left join stilling on ansatte.stilling_stillingid = stilling.stillingid where epost=?',[ansatt.epost], (error, results) => {
  //     if (error) return console.error(error); // If error, show error in console (in red text) and return
  //
  //     this.ansatte = results;
  //   });
  // }

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
