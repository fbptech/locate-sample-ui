import axios from "axios";
import React from "react";
import { Row, Col, Table, Pagination } from "react-bootstrap";

// Customer List Component
const CustomerList = () => {
  const [customers, setCustomers] = React.useState([]);
  const [page, setPage] = React.useState(1);

  // Load customer data on component mount and page state change
  React.useEffect(() => {
    const axiosSource = axios.CancelToken.source();
    axios
      .get("/customer", { params: { perPage: 15, page: page, embed: "customertype,status,default_email.email,default_phone.phone" }, cancelToken: axiosSource.token })
      .then(({ data }) => setCustomers(data.data))
      .catch((err) => {});
    return axiosSource.cancel; // Cancel request on component unmount
  }, [page]);

  return (
    <React.Fragment>
      <Row className="justify-content-end">
        <Col xs="auto">
          <Pagination>
            <Pagination.Prev disabled={page === 1} onClick={() => setPage(page - 1)} />
            <Pagination.Item active>{page}</Pagination.Item>
            <Pagination.Next onClick={() => setPage(page + 1)} />
          </Pagination>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Type</th>
            <th>Status</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => {
            return (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.number}</td>
                <td>{customer.customertype.name}</td>
                <td>{customer.status.name}</td>
                <td>{customer.default_email && customer.default_email.email.email_address}</td>
                <td>{customer.default_phone && customer.default_phone.phone.phone_number}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </React.Fragment>
  );
};
export default CustomerList;
