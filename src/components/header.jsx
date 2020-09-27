import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    const { user } = this.props;
    return (
      <nav className="navbar navbar-light bg-light navbar-expand-lg">
        <span className="navbar-brand" href="#">
          Navbar
        </span>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <Link className="nav-link" to="/movies">
                Movies
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/rentals">
                Rentals
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/customers">
                Customers
              </Link>
            </li>
            {!user && (
              <React.Fragment>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </React.Fragment>
            )}
            {user && (
              <React.Fragment>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    {user.name}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/logout">
                    Logout
                  </Link>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
