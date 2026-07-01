import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'

function NavbarComponent({ onLoginClick }) {
  return (
    <Navbar expand="lg" fixed="top" className="navbar-custom">
      <Container>
        <Navbar.Brand href="#home" className="fw-bold fs-4 text-dark">
          <span className="text-instantes">instantes</span>
        </Navbar.Brand>

        {/* Botão de login direto no mobile */}
        <button
          className="btn-login-nav d-lg-none"
          onClick={onLoginClick}
        >
          Login
        </button>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <button
              className="login-button d-none d-lg-block"
              onClick={onLoginClick}
            >
              Login
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent
