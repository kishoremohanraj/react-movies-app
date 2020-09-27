import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import MoviesForm from "./moviesForm";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id != movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === "404") {
        toast.error("The movie has already been deleted!");

        this.setState({ movies: originalMovies });
      }
    }
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  render() {
    const {
      movies,
      genres,
      selectedGenre,
      currentPage,
      pageSize,
      sortColumn,
    } = this.state;

    const { user } = this.props;

    return (
      <>
        <MoviesForm
          genres={genres}
          onGenreSelect={this.handleGenreSelect}
          selectedGenre={selectedGenre}
          movies={movies}
          genres={genres}
          onDelete={this.handleDelete}
          onLike={this.handleLike}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
          currentPage={currentPage}
          onSort={this.handleSort}
          selectedGenre={selectedGenre}
          sortColumn={sortColumn}
          user={user}
        />
      </>
    );
  }
}

export default Movies;
