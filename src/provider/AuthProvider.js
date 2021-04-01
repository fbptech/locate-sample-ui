import React from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies(); // Initialize cookie plugin

const LOCATE_URL = "locateinv.com";
const COOKIE_COMPANY = { NAME: "company", PATH: "/" };
const COOKIE_SESSION = { NAME: "api_key", PATH: "/" };
const AuthContext = React.createContext();

// Check for existing cookies
let defaultSessionKey = cookies.get(COOKIE_SESSION.NAME, { path: COOKIE_SESSION.PATH });
let defaultCompany = cookies.get(COOKIE_COMPANY.NAME, { path: COOKIE_COMPANY.PATH });

// Authentication Provider for App
class AuthProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false,
      session: {},
      loading: false,
      defaultCompany: defaultCompany,
    };
  }

  componentDidMount() {
    // Check if cookie values were provided
    if (defaultCompany && defaultSessionKey) {
      this.onLogin(defaultCompany, defaultSessionKey);
      this.updateSession();
    }
  }

  onLogin = (company, session) => {
    // Set axios default values and interceptors
    axios.defaults.auth = { username: session, password: session };
    axios.defaults.baseURL = `https://${company}.${LOCATE_URL}`;
    axios.interceptors.response.use(
      (res) => res,
      (err) => {
        // Remove session cookie and reload app on unauthorized response
        if (err.response && err.response.status === 401) {
          cookies.remove(COOKIE_SESSION.NAME, { path: COOKIE_SESSION.PATH });
          window.location.reload();
        }
        return Promise.reject(err);
      }
    );
  };

  /**
   * Update Session
   * Calls the server to get the latest session information
   * @param {*} callback Function called after session is successfully loaded
   */
  updateSession = (callback = () => {}) => {
    this.setState({ ...this.state, loading: true });
    axios
      .get("/session")
      .then((res) => {
        this.setState({ ...this.state, isAuth: true, session: res.data }, callback);
      })
      .finally(() => {
        this.setState({ ...this.state, loading: false });
      });
  };

  /**
   * Login
   * @param {*} company Company name to prefix url
   * @param {*} email User email address
   * @param {*} password User password
   * @param {*} callbackSuccess Function called on login success
   * @param {*} callbackFailure Function called on login failure
   */
  login = (company, email, password, callbackSuccess, callbackFailure) => {
    axios.post(`https://${company}.${LOCATE_URL}/login`, { email: email, password: password }).then(
      // Login Success
      (res) => {
        let session = res.data.session_token;
        this.onLogin(company, session);
        // Update cookies
        cookies.set(COOKIE_SESSION.NAME, session, { path: COOKIE_SESSION.PATH });
        cookies.set(COOKIE_COMPANY.NAME, company, { path: COOKIE_COMPANY.PATH });
        // Get latest session information
        this.updateSession(callbackSuccess);
      },
      // Login Failure
      (err) => {
        callbackFailure(err);
      }
    );
  };

  /**
   * Logout
   */
  logout = () => {
    cookies.remove(COOKIE_SESSION.NAME, { path: COOKIE_SESSION.PATH }); // Clear session cookie
    axios.post("/logout").finally(() => {
      window.location.reload();
    });
  };

  render() {
    return <AuthContext.Provider value={{ login: this.login, logout: this.logout, ...this.state }} {...this.props} />;
  }
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
