import React, { Fragment, useState, useEffect } from "react";
import { Grid, Item, Label } from "semantic-ui-react";
import { IValue } from "../../models/Value";
import axios from "axios";

const ValuesLister = () => {
  const [values, setValues] = useState<IValue[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/values`)
      .then(response => {
        if (response) {
          setValues(response.data);
        }
      });
  }, []);

  return (
    <Fragment>
      <Label>
        This is an example of returning dummy data from a backend API using a RESTful interface.
      </Label>
      <Grid style={{ marginTop: "7em" }}>
        <Grid.Column width={3}>
          <Item.Group divided>
            {values.map(value => (
              <Item key={value.id}>
                <Item.Header>{value.value}</Item.Header>
              </Item>
            ))}
          </Item.Group>
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

export default ValuesLister;
