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
import FutureComponent from "./components/FutureComponent"
import { BrowserRouter as Router, Route } from "react-router-dom";
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

/*this.loadCurrentUser = this.loadCurrentUser.bind(this);


  loadCurrentUser() {
      this.setState({
        isLoading: true
      });
      getCurrentUser()
      .then(response => {
        this.setState({
          currentUser: response,
          isAuthenticated: true,
          isLoading: false
        });
      }).catch(error => {
        this.setState({
          isLoading: false
        });
      });
    }

    componentDidMount() {
      this.loadCurrentUser();
    }*/

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
            <Route path="/log" component={FullLog} />
            <Route path="/history" component={FullHistory} />
            <Route path="/projects" component={Projects} />
            <Route path="/books" component={FutureComponent} />
            <Route path="/materials" component={FutureComponent} />
            <Route path="/add" component={FutureComponent} />
            <Route path="/settings" component={FutureComponent} />
            <Footer />

          </div>
        </Router>
      );
  }
}

export default App;
