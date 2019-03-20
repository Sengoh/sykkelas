//Dette er fila for innlogging!!
import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { connection } from "./mysql_connection"
import { Card, List, Row, Column, NavBar, Button, Form } from './widgets';
import { ansatteService } from './services';

//import {styles} from './style.js';

//import {loginstyle} from "./login.css";

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class LogIn extends Component{
  ansatte = [];
  epost = "";
  passord = "";
  form = null;


  render() {
    return (
      <div className="container h-100">
        <div className="d-flex justify-content-center">

          <div className="card w-50 mt-5">
            <div className="card-header">
              <h4>Sykkelutleie AS</h4>
              <h5>Logg inn</h5>

            </div>

            <div className="card-body">
             <form ref={element => (this.form = element)} className='login-form' onSubmit={this.handleSubmit}>

                  <div className="form-group">
                    <label for="exampleInputEmail1">E-post</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={event => this.epost = event.target.value}/>
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPass">Passord</label>
                    <input type="password" className="form-control" id="exampleInputPass" aria-describedby="emailHelp" onChange={event => this.passord = event.target.value}/>
                  </div>
                  <div class="form-group form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                    <label class="form-check-label" for="exampleCheck1">Husk meg</label>
                  </div>
                  <button type="submit" onClick={this.login} className="btn btn-primary float-right">Logg inn</button>
                  <br></br><a href='./landing.html'>Midlertidig bypass</a>

              </form>
            </div>

          </div>
        </div>
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
          window.location.href = "./index.html";

        } else {
          alert("Skriv inn riktig epost og passord.")
        }
    });
  }

}

export default LogIn;
