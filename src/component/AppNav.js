import { Link } from "@reach/router";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useAuth } from "../provider/AuthProvider";
import APP_NAME from "../constant/APP_NAME";

// Primary Navigation Menu for App
const AppNav = () => {
  const { session, logout } = useAuth();

  return (
    <Navbar bg="light" expand="lg" collapseOnSelect tabIndex={-1}>
      <Navbar.Brand as={Link} to="/">
        {APP_NAME}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse>
        <Nav className="mr-auto">
          <Nav.Item>
            {/* Define links for any primary pages below */}
            <Nav.Link as={Link} to="/customer">
              Customers
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Nav className="navbar-right">
          <NavDropdown title={`${session.first_name} ${session.last_name}`}>
            <NavDropdown.Item
              onClick={() => {
                logout();
              }}
            >
              Log Out
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNav;
