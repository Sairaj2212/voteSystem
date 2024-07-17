import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './AdminCss/App.css';
import { Navbar, Nav, Container } from 'react-bootstrap';

const VerticalMenu = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="sm" className="w-100">
      <Container fluid className='d-flex justify-content-between'>
        <div>
          <Navbar.Brand href="/" className="fs-2" style={{ fontFamily: 'Fantasy' }}>JANASTHRA</Navbar.Brand>
        </div>
        <div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="w-100">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/request-details" className='Hov'>Request Details</Nav.Link>
              <Nav.Link as={Link} to="/mla" className='Hov'>MLA Candidates</Nav.Link>
              <Nav.Link as={Link} to="/mp" className='Hov'>MP Candidates</Nav.Link>
              <Nav.Link as={Link} to="/vote-casting" className='Hov'>Vote Casting</Nav.Link>
              <Nav.Link as={Link} to="/results" className='Hov'>Results</Nav.Link>
              <Nav.Link as={Link} to="/dynamic-slot" className='Hov'>Dynamic Slotting</Nav.Link>
              <Nav.Link as={Link} to="/logout" className='Hov'>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
};

export default VerticalMenu;
