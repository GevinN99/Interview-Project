import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {IoIosLogOut} from 'react-icons/io';
import {CgProfile} from 'react-icons/cg';
import './Navbar.css';

const TopNavbar = () => {
    const isLoggedIn = localStorage.getItem('auth-token') !== null;

    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        window.location.href = '/';
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="fixed-top">
            <Navbar.Brand className="mx-auto fw-bold ml-3" as={Link} to="/">UserHub</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mx-auto">
                    {isLoggedIn ? (
                        <>
                            <Nav.Link as={Link} to="/users" className="nav-link">Users</Nav.Link>
                        </>
                    ) : (
                        <div className="text-light">Welcome to UserHub</div>
                    )}
                </Nav>
                <Nav>
                    {isLoggedIn ? (
                        <>
                            <Nav.Link as={Link} to="/profile" className="nav-link"><CgProfile/></Nav.Link>
                            <Nav.Link onClick={handleLogout} className="nav-link"><IoIosLogOut/></Nav.Link>
                        </>
                    ) : (
                        <Nav.Link as={Link} to="/login" className="nav-link nav-text">Login</Nav.Link>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default TopNavbar;
