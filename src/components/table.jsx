import React, { Component } from "react";
import { Link } from "react-router-dom";
import Pagination from "../components/common/pagination";
import { paginate } from "../utils/paginate";
import Navbar from "../components/navbar";
import MTable from "../components/mtable";
import Like from "../components/common/like";
import auth from "../services/authService";
import _ from "lodash";

class Table extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like liked={movie.liked} onLike={() => this.props.onLike(movie)} />
      ),
    },
    ,
  ];

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      allMovies,
      sortColumn,
      selectedGenre,
    } = this.props;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const paginatedMovies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, paginatedMovies };
  };

  deleteColumn = {
    key: "delete",
    content: (movie) => (
      <button
        className="btn btn-danger"
        onClick={() => this.props.onDelete(movie)}
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) {
      this.columns.push(this.deleteColumn);
    }
  }

  render() {
    const {
      pageSize,
      currentPage,
      onPageChange,
      sortColumn,
      onSort,
      user,
    } = this.props;

    const { totalCount, paginatedMovies } = this.getPagedData();

    return (
      <>
        {user && (
          <Link to="/movies/new">
            <button className="btn btn-primary m-2">New Movie</button>
          </Link>
        )}
        <MTable
          data={paginatedMovies}
          sortColumn={sortColumn}
          onSort={onSort}
          columns={this.columns}
        />
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          onPageChange={onPageChange}
          currentPage={currentPage}
        />
      </>
    );
  }
}

export default Table;
