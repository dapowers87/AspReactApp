import React, { Fragment } from "react";
import "./App.css";
import NavBar from "../features/nav/NavBar";
import { Route } from "react-router";
import ValuesLister from "../features/values/ValuesLister";
import { Container } from "semantic-ui-react";
import PersonDashboard from "../features/Persons/dashboard/PersonDashboard";
import HomePage from "../features/home/HomePage";
import PersonForm from "../features/Persons/form/PersonForm";
import { ToastContainer } from "react-toastify";
import Diagram from "../features/diagram/Diagram";

const App: React.FC = () => {
  return (
    <Fragment>
      <ToastContainer position="bottom-right" />
      <Route exact path={"/"} component={HomePage} />
      <NavBar />
      <Route
        path={"/(.+)"}
        render={() => (
          <Container style={{ paddingTop: "7em" }}>
            <Route path="/ValuesLister" component={ValuesLister} />
            <Route path="/Persons" component={PersonDashboard} />
            <Route path="/Diagram" component={Diagram} />
            <Route path="/Person/:id" component={PersonForm} />
            <Route
              path={["/createPerson", "/manage/:id"]}
              component={PersonForm}
            />
          </Container>
        )}
      />
    </Fragment>
  );
};

export default App;
