import React from "react";

const Navbar = ({ count }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      Showing {count !== 0 ? count : "no"} movies from the database.
    </nav>
  );
};

export default Navbar;
