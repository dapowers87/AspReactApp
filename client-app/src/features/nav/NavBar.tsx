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
          <Menu.Item name="Values Lister"  as={Link} to='./ValuesLister' />
        </Container>
      </Menu>
    </div>
  );
};

export default NavBar;
