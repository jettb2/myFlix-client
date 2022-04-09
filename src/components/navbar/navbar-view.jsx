import { react } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './navbar-view.scss';

export function NavbarView({ user }) {
    const onLoggedOut = () => {
        localStorage.clear();
        window.open('/', '_self');
    };

    const isAuth = () => {
        if (typeof window == "undefined") {
            return false;
        }
        if (localStorage.getItem("token")) {
            return localStorage.getItem("token");
        } else {
            return false;
        }
    };
    console.log("user", user)
    return (
        <Navbar className="main-nav" sticky="top" expand="lg" variant="dark">
            <Container fluid>
                <Navbar.Brand className="navbar-logo" href="/">Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        {isAuth() && (
                            <Nav.Link href={"#"}><Link to={`/profile/${user}`}> {`${user}`} </Link> </Nav.Link>
                        )}
                        {isAuth() && (
                            <Button variant="link" onClick={() => {
                                onLoggedOut()
                            }}>Logout</Button>
                        )}
                        {!isAuth() && (
                            <Nav.Link href="/">Login</Nav.Link>
                        )}
                        {/* {!isAuth() && (
                            <Nav.Link href="/register">Register</Nav.Link>
                        )} */}
                        {!isAuth() && (
                            <Nav.Link href="/">Home</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}


