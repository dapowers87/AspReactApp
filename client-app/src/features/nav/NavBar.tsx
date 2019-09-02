import React from "react";
import { Menu, Container } from "semantic-ui-react";
import { NavLink, Link } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <div>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item header as={NavLink} exact to='/'>
            Home
          </Menu.Item>
          <Menu.Item name="Values Lister"  as={Link} to='/ValuesLister' />
          <Menu.Item name="Mongo Persons List"  as={Link} to='/Persons' />
          <Menu.Item name="Project Diagram"  as={Link} to='/Diagram' />
        </Container>
      </Menu>
    </div>
  );
};

export default NavBar;
