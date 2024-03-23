import React from 'react';
import { LinkContainer } from 'react-router-bootstrap'; // Import LinkContainer
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Make sure to import Link

const NavBar2 = () => {
  return (
    <Navbar bg="light" expand="lg">
      {/* Use LinkContainer for the brand/logo redirect */}
      <LinkContainer to="/home">
        <Navbar.Brand>YourBrand</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {/* Use LinkContainer for navigation links */}
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
          {/* Utilize Link for the search button if it redirects to a search page. Otherwise, handle the search logic within an onClick handler. */}
          <Button variant="outline-success" as={Link} to="/search">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar2;



{/*import React from 'react';
import { Link } from 'react-router-dom';
import '../Web.css'; 

const NavBar2 = () => {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">YourBrand</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
            <a class="nav-item nav-link active" href="#">Home <span class="sr-only">(current)</span></a>
            <a class="nav-item nav-link" href="#">Library</a>
            <a class="nav-item nav-link" href="#">Create</a>
            </div>
            <form class="form-inline ml-auto">
                <input 
                    class="form-control mr-sm-2" 
                    type="search" 
                    placeholder="Search" 
                    aria-label="Search"
                />

            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>
        </nav>
    );
};

export default NavBar2;
*/}

{/*The code below used to be in the above return */}

 {/*
        <nav className="navbar">
            <Link to="/landing" className="nav-button">Home</Link>
            <Link to="/library" className="nav-button">Library</Link>
            <Link to="/create" className="nav-button">Create</Link>

            <div className="search-bar">
                <input type="text" placeholder="Search..." />
                <button type="submit">Search</button>
            </div>
        </nav>
        */}

