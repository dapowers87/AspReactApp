import React, { useState, useEffect } from "react";
import logo from "../logo.svg";
import "./App.css";
import axios from "axios";
import { List } from "semantic-ui-react";
import { IValue } from "../models/Value";

interface IState {
  values: IValue[];
}

const App: React.FC = () => {
  const [values, setValues] = useState<IValue[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5050/api/values").then(response => {
      setValues(response.data);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>Hello World!</p>
        <p><a
          className="App-link"
          href="https://github.com/dapowers87/AspReactApp"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub repos for this project
        </a></p>
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
      <List>
        {values.map(value => (
          <List.Item key={value.id}>{value.value}</List.Item>
        ))}
      </List>
    </div>
  );
};

export default App;
