import React, { Fragment } from "react";
import diagram from "../../assets/aspreactapp_diagram.jpg";
import { Label, Image } from "semantic-ui-react";

const Diagram = () => {
  return (
    <Fragment>
      <Label ribbon>Diagram of the AspReactApp Project</Label>
      <Image fluid src={diagram} size="huge" />
    </Fragment>
  );
};

export default Diagram;
