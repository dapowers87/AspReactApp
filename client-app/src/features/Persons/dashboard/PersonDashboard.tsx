import React, { useContext, useEffect, Fragment } from "react";
import { Grid, Button, Icon, Label } from "semantic-ui-react";
import PersonList from "./PersonList";
import PersonStore from "../../../app/stores/personStore";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";

const PersonDashboard: React.FC = () => {
  const personStore = useContext(PersonStore);

  useEffect(() => {
    personStore.loadPersons();
  }, [personStore]);

  if (personStore.isLoading)
    return <LoadingComponent content="Loading People..." />;

  return (
    <Fragment>
      <Label style={{maxWidth: '35em'}}>This is a demo of a CRUD system for person entities stored in a MongoDB collection. The backend system follows CQRS standards.</Label>
      <Grid style={{marginTop:'1em'}}>
        <Grid.Column width={8}>
          <Button as={Link} to="/createPerson" color='green' icon>
            <Icon name="add user" />
          </Button>
          <PersonList />
        </Grid.Column>
      </Grid>
    </Fragment> 
  );
};

export default observer(PersonDashboard);
