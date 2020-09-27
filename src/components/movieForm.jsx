import React, { Component } from "react";
import Form from "./common/form";
import Joi from "joi-browser";
// import { getGenres } from "./../services/fakeGenreService";
import { replace } from "lodash";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "./../services/genreService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.label("id"),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number In Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
  };

  async componentDidMount() {
    const { data: genres } = await getGenres();
    this.setState({ genres });

    if (this.props.match.params.id === "new") return;

    try {
      const { data: movie } = await getMovie(this.props.match.params.id);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        return this.props.history.replace("/not-found");
      }
    }
  }

  mapToViewModel = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  async doSubmit() {
    await saveMovie(this.state.data);
    this.props.history.push("/movies");
  }

  render() {
    const { genres } = this.state;
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", genres)}
          {this.renderInput("numberInStock", "Number In Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "number")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
