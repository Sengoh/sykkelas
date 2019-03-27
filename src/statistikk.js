import * as React from "react";
import { Component } from "react-simplified";
import ReactDOM from "react-dom";
import { NavLink, HashRouter, Route } from "react-router-dom";
import { Card, List, Row, Column, NavBar, Button, Form } from "./widgets";

import createHashHistory from "history/createHashHistory";
const history = createHashHistory();

class Home extends Component {
  render() {
    return (
      <AnsattM>
        <Nav />
      </AnsattM>
    );
  }
}

class Nav extends Component {
  render() {
    return (
      <NavBar to="/aMeny" brand="Sykkelutleie AS">
        <NavBar.Link to="/statistikk">Statistikk</NavBar.Link>
        <NavBar.Link to="/loggut">Logg ut</NavBar.Link>
      </NavBar>
    );
  }
}

class Statistikk extends Component {
  render() {
    return (
      <div>
        <div>
          <ul class="nav nav-tabs">
            <li class="nav-item">
              <a class="nav-link active" to={"/nat"}>
                Bestillingsoversikt
              </a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                data-toggle="dropdown"
                to={"/nat"}
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Kundeoversikt
              </a>
              <div class="dropdown-menu">
                <a class="dropdown-item" to={"/nat"}>
                  Dagens
                </a>
                <a class="dropdown-item" href="#">
                  Ukentlig
                </a>
                <a class="dropdown-item" href="#">
                  Månedlig
                </a>
                <div class="dropdown-divider" />
                <a class="dropdown-item" href="#">
                  Årlig
                </a>
              </div>
            </li>
          </ul>
        </div>

        <div data-spy="scroll" data-target="#navbar-example2" data-offset="0">
          <h4 id="fat">@fat</h4>
          <p>...</p>
          <h4 id="mdo">@mdo</h4>
          <p>...</p>
          <h4 id="one">one</h4>
          <p>...</p>
          <h4 id="two">two</h4>
          <p>...</p>
          <h4 id="three">three</h4>
          <p>...</p>
        </div>
      </div>
    );
  }
}

let statistikk = document.getElementById("statistikk");

if (statistikk)
  ReactDOM.render(
    <div>
      <HashRouter>
        <div>
          <Nav />
          <Route exact path="/" component={Home} />
          <Route exact path="/(statistikk)" component={Nav} />

          <Route exact path="/statistikk" component={Statistikk} />
          <Route
            exact
            path="/loggut"
            render={() => {
              window.location.href = "public/login.html";
            }}
          />
        </div>
      </HashRouter>
    </div>,
    statistikk
  );
export default Statistikk;
