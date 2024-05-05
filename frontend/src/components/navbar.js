import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import '../assets/navdropdown.css';

function logout(){
  sessionStorage.removeItem('token');
}

function NavigationBar({ getToken }){
  
  const [UID, setUID] = useState();
  useEffect(() => {
    if(getToken){
        const token = sessionStorage.getItem('token');
        fetch('http://127.0.0.1:8081/verifyToken', {
          method:'GET',
          headers: {
            'jwt-token': token,
          },
        })
        .then(res => res.json())
        .then((data) => {
          fetch('http://127.0.0.1:8081/userdata', {
            method:'POST',
            body: JSON.stringify({"username":data.username}),
            headers: {'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" ,"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"},
          })
          .then(res => res.json())
          .then(data => {
            setUID(data[0].UID)
          })
        })
      
    }
  }, [])

  if(getToken){
    return (
      <Navbar expand="lg" className="bg-body-tertiary w3-deep-purple">
        <Container >
          <Navbar.Brand href="/home" style={{color:'white'}}>TUNItter</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" >
            <Nav className="me-auto" >
              <Nav.Link href="/home" style={{color:'white'}}>Home</Nav.Link>
              <Nav.Link onClick={ logout } href='/' style={{color:'white'}}>Logout</Nav.Link>
              <NavDropdown title="Options" id="basic-nav-dropdown" >
                <NavDropdown.Item href={"/userpage?UID=" + UID} id="myposts">
                  My posts
                </NavDropdown.Item>
                <NavDropdown.Item href="/account">Account</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      );
  }
  else{
    return (
      <Navbar expand="lg" className="bg-body-tertiary w3-deep-purple">
        <Container>
          <Navbar.Brand href="/" style={{color:'white'}}>TUNItter</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home" style={{color:'white'}}>Home</Nav.Link>
              <Nav.Link href='/login' style={{color:'white'}}>Login</Nav.Link>
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      );
  }
  
}

NavigationBar.propTypes = {
  getToken: PropTypes.func.isRequired
};

export default NavigationBar;