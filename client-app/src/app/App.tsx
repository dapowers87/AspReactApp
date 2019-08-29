import React, { Fragment } from "react";
import logo from "../logo.svg";
import "./App.css";
import NavBar from "../features/nav/NavBar";
import { Route } from "react-router";
import ValuesLister from "../features/values/ValuesLister";

const App: React.FC = () => {
  return (
    <Fragment>
      <NavBar />
      <Route exact path={"/"}
        render={() => (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            <a
              className="App-link"
              href="https://github.com/dapowers87/AspReactApp"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub repos for this project
            </a>
          </p>
          <p>
            <a
              className="App-link"
              href="./david_powers_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              My Resume
            </a>
          </p>
        </header>
      </div>)} />
      <Route path="/ValuesLister" component={ValuesLister}/>
    </Fragment>
  );
};

export default App;
