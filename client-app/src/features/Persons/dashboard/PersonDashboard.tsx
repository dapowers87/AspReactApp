import React, { useContext, useEffect } from "react";
import { Grid, Button, Icon } from "semantic-ui-react";
import PersonList from "./PersonList";
import PersonStore from "../../../app/stores/personStore";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const PersonDashboard: React.FC = () => {
  const personStore = useContext(PersonStore);

  useEffect(() => {
    personStore.loadPersons();
  }, [personStore]);

  return (
    <Grid>
      <Grid.Column width={5}>
        <Button as={Link} to="/Person" icon>
          <Icon name="add user" />
        </Button>
        <PersonList />
      </Grid.Column>
    </Grid>
  );
};

export default observer(PersonDashboard);
