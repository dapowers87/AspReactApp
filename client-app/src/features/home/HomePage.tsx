import React from "react";
import logo from "../../assets/logo.png";
import {Image} from 'semantic-ui-react'

const HomePage = () => {
  return (
    <div className="App">
      <header style={{marginTop:'40px'}} className="App-header">
        <Image style={{marginLeft:'2em', resizeMode:'contain'}} src={logo} alt="logo" />
        <br/>
        <p>
          <a
            className="App-link"
            href="https://github.com/dapowers87/AspReactApp"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub repo for this project
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
