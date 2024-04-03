import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'; // Make sure this is installed too

const AppNavbar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand><LinkContainer to="/landing"><Nav.Link>Home</Nav.Link></LinkContainer></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <LinkContainer to="/landing">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/library">
            <Nav.Link>Library</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/create">
            <Nav.Link>Create</Nav.Link>
          </LinkContainer>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;
