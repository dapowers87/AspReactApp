import React, { Fragment, useState, useEffect } from "react";
import { List } from "semantic-ui-react";
import { IValue } from "../../models/Value";
import axios from 'axios'

const ValuesLister = () => {

  const [values, setValues] = useState<IValue[]>([]);

  useEffect(() => {
    console.log('backendurl= ' + process.env.REACT_APP_BACKEND_URL)
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/values`).then(response => {
      setValues(response.data);
    });
  }, []);

  return (
    <Fragment>
      <List style={{marginTop: '40px'}} >
        {values.map(value => (
          <List.Item key={value.id}>{value.value}</List.Item>
        ))}
      </List>
    </Fragment>
  );
};

export default ValuesLister;
