import React from "react";
import { Container, Row, Col, Card, Alert, Form, Button, InputGroup } from "react-bootstrap";
import { useAuth } from "../provider/AuthProvider";

// Login Page
const Login = () => {
  const { login, defaultCompany } = useAuth();
  const [error, setError] = React.useState();

  const refCompany = React.createRef();
  const refEmail = React.createRef();
  const refPassword = React.createRef();

  /**
   * Submit Login Request
   * @param {*} e form submit event
   */
  const submitLogin = (e) => {
    e.preventDefault(); // Prevent default page refresh
    setError(undefined); // Clear any existing errors
    login(
      refCompany.current.value,
      refEmail.current.value,
      refPassword.current.value,
      () => {
        // Page will automatically redirect on success
      },
      (err) => {
        setError("Failed to Login"); // Set failed login message
      }
    );
  };

  return (
    <Container className="d-flex align-items-center min-vh-100">
      <Row className="justify-content-center w-100">
        <Col xs={12} lg={6}>
          <Card>
            <Card.Header>{process.env.REACT_APP_NAME}</Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={submitLogin}>
                <Form.Group>
                  <Form.Label>Company</Form.Label>
                  <InputGroup>
                    <Form.Control type="company" ref={refCompany} defaultValue={defaultCompany || ""} autoFocus={!defaultCompany} />
                    <InputGroup.Append>
                      <InputGroup.Text>.locateinv.com</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" ref={refEmail} autoFocus={defaultCompany} />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={refPassword} />
                </Form.Group>

                <Button variant="primary" type="submit" className="float-right">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
