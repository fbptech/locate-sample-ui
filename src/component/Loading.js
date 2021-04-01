import { Row, Col, Spinner } from "react-bootstrap";

// Loading Component
const Loading = () => {
  return (
    <Row className="justify-content-center my-3">
      <Col xs="auto">
        <h4>
          <Spinner animation="border" /> Loading...
        </h4>
      </Col>
    </Row>
  );
};

export default Loading;
