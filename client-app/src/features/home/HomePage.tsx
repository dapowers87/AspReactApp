import React from "react";
import logo from "../../assets/logo.svg";

const HomePage = () => {
  return (
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
    </div>
  );
};

export default HomePage;
