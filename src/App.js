import React from "react";
import { Container } from "react-bootstrap";
import { Router } from "@reach/router";
import "./App.css";
import { useAuth } from "./provider/AuthProvider";
import Login from "./page/Login";
import Home from "./page/Home";
import Loading from "./component/Loading";
import AppNav from "./component/AppNav";
import Customer from "./page/Customer";

// App Entry Point
const App = () => {
  const { loading, isAuth } = useAuth();

  return loading ? (
    <Loading />
  ) : isAuth ? (
    // Authenticated Routes
    <React.Fragment>
      <AppNav />
      <Container fluid className="mt-4">
        <Router primary={false}>
          {/* Define primary page routes below */}
          <Home path="/" />
          <Customer path="/customer" />
        </Router>
      </Container>
    </React.Fragment>
  ) : (
    <Login />
  );
};

export default App;
