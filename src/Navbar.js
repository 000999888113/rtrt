import React from 'react';
import { Navbar, Nav, NavDropdown,Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';



const CNav= () =>{
    return(
        <Navbar bg="dark" variant="dark" expand="lg">
             <LinkContainer to="/">
                <Navbar.Brand>
                    <Button variant="dark">Home</Button>
                </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                {/* Dropdown for Root of Equation */}
                <NavDropdown title="Root of Equation" id="basic-nav-dropdown">
                    <LinkContainer to="/bisection">
                        <NavDropdown.Item>Bisection</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/falseposition">
                        <NavDropdown.Item>False Position</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/onepointed">
                        <NavDropdown.Item>One-pointed</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/taylor">
                        <NavDropdown.Item>Taylor</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/newtonraphson">
                        <NavDropdown.Item>Newton</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/secant">
                        <NavDropdown.Item>Secant</NavDropdown.Item>
                    </LinkContainer>
                </NavDropdown>

                {/* Dropdown for ax + b Equation */}
                <NavDropdown title="Ax + B" id="basic-nav-dropdown">
                    <LinkContainer to="/cramer">
                        <NavDropdown.Item>Cramer</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/gaussjordan">
                        <NavDropdown.Item>Gauss-Jordan</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/matrixinversion">
                        <NavDropdown.Item>Matrix Inversion</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/lu">
                       <NavDropdown.Item>LU-Decompose</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/cholesky">
                       <NavDropdown.Item>Cholesky</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/jacobi">
                       <NavDropdown.Item>Jacobi</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/gaussseidal">
                       <NavDropdown.Item>Gauss-seidal</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/conjugate">
                       <NavDropdown.Item>Conjugate-gradient</NavDropdown.Item>
                    </LinkContainer>
                  
                </NavDropdown>
                <NavDropdown title="Interpolation" id="basic-nav-dropdown">
                    <LinkContainer to="/newtondivide">
                        <NavDropdown.Item>Newtondivide</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/lagrange">
                        <NavDropdown.Item>Lagrange</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/spline">
                        <NavDropdown.Item>Spline</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/least-square">
                        <NavDropdown.Item>least-square</NavDropdown.Item>
                    </LinkContainer>
                    
                  
                </NavDropdown>

                <NavDropdown title="Integration" id="basic-nav-dropdown">
                    <LinkContainer to="/trapezoidal">
                        <NavDropdown.Item>Trapezoidal</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/simpson">
                        <NavDropdown.Item>Simpson</NavDropdown.Item>
                    </LinkContainer>
                </NavDropdown>

                
                <NavDropdown title="Differential" id="basic-nav-dropdown">
                    <LinkContainer to="/trapezoidal">
                        <NavDropdown.Item>Forward</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/simpson">
                        <NavDropdown.Item>Backward</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/simpson">
                        <NavDropdown.Item>Central</NavDropdown.Item>
                    </LinkContainer>
                </NavDropdown>





            </Nav>
            </Navbar.Collapse>
    </Navbar>


    )


}
export default CNav;