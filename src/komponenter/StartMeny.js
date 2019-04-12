import * as React from "react";
import { Component } from "react-simplified";
import ReactDOM from "react-dom";
import { NavLink, HashRouter, Route } from "react-router-dom";
import { connection } from '../services/mysql_connection';
import { ansatteService } from '../services/services';

import createHashHistory from "history/createHashHistory";
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class AnsattM extends Component {
  render() {
    return (
      <div>
      <div className="container d-flex justify-content-center" style={{ marginTop: "30vh" }}>
        <i className="fas fa-bicycle fa-7x"></i>
      </div>
      <h3 className="d-flex justify-content-center">SykkelUtleie AS</h3>

      <div className="container d-flex justify-content-center pt-3" >

      <div className="card border-dark">
        <div className="card-body">
          <button
            type="button"
            className="btn btn-light m-2"
            onClick={this.routeChange1}
          >
            Registrer bestilling
          </button>
          <button
            type="button"
            className="btn btn-light m-2"
            onClick={this.routeChange2}
          >
            Bestillingsoversikt
          </button>
          <button
            type="button"
            className="btn btn-light m-2"
            onClick={this.routeChange3}
          >
            Lager
          </button>
          </div>
          </div>
        </div>
      </div>
    );
  }
  routeChange1() {
    history.push("/regB");
  }
  routeChange2() {
    history.push("/bestillingsOversikt");
  }
  routeChange3() {
    history.push("/admin");
  }
}

export default AnsattM;
