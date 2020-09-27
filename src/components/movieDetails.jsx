import React from "react";

const MovieDetails = ({ match, history }) => {
  return (
    <div>
      <h1>Movie Details - {match.params.id}</h1>
      <button
        className="btn btn-primary"
        onClick={() => history.push("/movies")}
      >
        Back
      </button>
    </div>
  );
};

export default MovieDetails;
