import React, { useContext, useEffect } from "react";
import { Grid, Button, Icon } from "semantic-ui-react";
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
    <Grid>
      <Grid.Column width={10}>
        <Button as={Link} to="/createPerson" icon>
          <Icon name="add user" />
        </Button>
        <PersonList />
      </Grid.Column>
    </Grid>
  );
};

export default observer(PersonDashboard);
