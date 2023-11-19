

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import "./Navbar.css";

const Navigation = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username'); // Retrieve username

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token from local storage
    localStorage.removeItem('username');
    navigate('/login'); // Redirect the user to the login page
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{width: "100vw",  position:"sticky",top:"0px " , }} >
  <Navbar.Brand as={Link} to="/data">Home</Navbar.Brand>
  <div className='containerunique'>
  <Link to="/postquestion" className="small-screen link">Post your question</Link>
  <Link to="/answerquestion" className="small-screen link">Answer quiries</Link>
  </div>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="ml-auto">
      <NavDropdown title={username} id="collasible-nav-dropdown" className="right-dropdown ">
        <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
        

      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
</Navbar>

  );
};

export default Navigation; 





