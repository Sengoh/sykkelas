//Dette er fila for innlogging!!
import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { connection } from './services/mysql_connection'
import { Card, List, Row, Column, NavBar, Button, Form } from './komponenter/widgets';
import { ansatteService } from './services/services';


let remote = require('electron').remote;
let session = remote.session;
session.defaultSession.cookies.set({
  name:"ansatt",
  value: "0",
  url: "http://localhost/"
},
err => {
  if(err) console.log("Error ", err);
});
session.defaultSession.cookies.get({},(err,cookies) => {
  if(err) console.error(err);
  console.log(cookies[0].value);
})
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

          <div className="card w-50" style={{marginTop: '25vh'}}>
            <div className="card-header">
              <h4>Sykkelutleie AS</h4>
              <h5>Logg inn</h5>

            </div>

            <div className="card-body">
             <form ref={element => (this.form = element)} className='login-form' onSubmit={this.handleSubmit}>

                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">E-post</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={event => this.epost = event.target.value}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPass">Passord</label>
                    <input type="password" className="form-control" id="exampleInputPass" aria-describedby="emailHelp" onChange={event => this.passord = event.target.value}/>
                  </div>
                  <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Husk meg</label>
                  </div>
                  <p>perpet@sykkelas.no:1234<br></br>test@test:test</p>
                  <button type="submit" onClick={this.login} className="btn btn-primary float-right">Logg inn</button>
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
        console.log(ansatte[0].ansattid);
        if(ansatte.length > 0){
          this.ansatte = ansatte;
          session.defaultSession.cookies.set({
            name:"ansatt",
            value: "" + ansatte[0].ansattid + "",
            url: "http://localhost/"
          },
          err => {
            if(err) console.log("Error ", err);
          });
          alert("Velkommen " + this.ansatte[0].fornavn + " " + this.ansatte[0].etternavn + ", Epost: " + this.ansatte[0].epost);

          window.location.href = "./landing.html";

        } else {
          alert("Skriv inn riktig epost og passord.")
        }
    });
  }

}

export default LogIn;
