import React, { Component } from "react";
import "./App.css";
import Footer from "./components/Footer";
import NavigationBar from "./components/NavigationBar";
import LoginForm from "./components/logging/LoginForm";
import UserValidation from "./components/logging/UserValidation";
import ResetValidation from "./components/logging/ResetValidation";
import RegistrationForm from "./components/logging/RegistrationForm";
import ResetPassword from "./components/logging/ResetPassword";
import ChangePassword from "./components/logging/ChangePassword";
import LoginImage from "./components/LoginImage"
import UserPanel from "./components/UserPanel"
import FullLog from "./components/FullLog"
import FullHistory from "./components/FullHistory"
import Projects from "./components/Projects"
import Materials from "./components/Materials"
import Settings from "./components/Settings"
import BooksComponent from "./components/books/BooksComponent"
import FutureComponent from "./components/FutureComponent"
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute"
import "./css/bootstrap.min.css"
import "./css/main.css"
import "./css/style.css"

class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
        currentUser: null,
        isAuthenticated: false,
        isLoading: false
      }
  }

  render() {
    return (
        <Router>
          <div className="bg-light">
            <NavigationBar />

            <Route exact path="/" component={LoginImage} />
            <Route exact path="/" component={UserPanel} />
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/registration" component={RegistrationForm} />
            <Route exact path="/verification" component={UserValidation} />
            <Route exact path="/resetValidation" component={ResetValidation} />
            <Route exact path="/resetPassword" component={ResetPassword} />
            <Route exact path="/changePassword" component={ChangePassword} />

            <PrivateRoute path="/log" component={FullLog} />
            <PrivateRoute path="/history" component={FullHistory} />
            <PrivateRoute path="/projects" component={Projects} />
            <PrivateRoute path="/books" component={BooksComponent} />
            <PrivateRoute path="/materials" component={Materials} />
            <PrivateRoute path="/add" component={FutureComponent} />
            <PrivateRoute path="/settings" component={Settings} />

            <Footer />

          </div>
        </Router>
      );
  }
}

export default App;
