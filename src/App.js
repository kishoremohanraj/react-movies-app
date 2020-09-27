import React, { Component } from "react";
import Movies from "./components/movies";
import MovieDetails from "./components/movieDetails";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import Header from "./components/header";
import Register from "./components/register";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import MovieForm from "./components/movieForm";
import NotFound from "./components/notFound";
import auth from "./services/authService";
import MoviesForm from "./components/moviesForm";
import ProtectedRoute from "./components/common/protectedRoute";
import "./App.css";
class App extends Component {
  state = {};
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <>
        <Header user={user} />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={user} />}
            />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/register" component={Register} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </>
    );
  }
}

export default App;
