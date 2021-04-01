import { Container, Row, Col, Jumbotron, Button } from "react-bootstrap";

// Home Page
const Home = () => {
  return (
    <Container className="d-flex align-items-center min-vh-100">
      <Row className="justify-content-center w-100">
        <Col xs="auto">
          <Jumbotron>
            <h1>Hello, Developer!</h1>
            <p>
              This is a sample ReactJS app designed to get you started developing custom user interfaces for LOCATE Inventory. This app can be used as a template for your UI project. For more LOCATE developer resources please visit the link below.
            </p>
            <p>
              <Button variant="primary" href="https://developer.locateinv.com">
                Learn more
              </Button>
            </p>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
};
export default Home;
