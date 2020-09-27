import React from "react";
import ListGroup from "./common/listGroup";
import Table from "./table";

const MoviesForm = ({
  movies,
  genres,
  selectedGenre,
  onGenreSelect,
  onDelete,
  onLike,
  onSort,
  onPageChange,
  pageSize,
  currentPage,
  sortColumn,
  user,
}) => {
  return (
    <div className="row">
      <div className="col-2">
        <ListGroup
          genres={genres}
          onGenreSelect={onGenreSelect}
          selectedGenre={selectedGenre}
        />
      </div>
      <div className="col">
        {
          <Table
            allMovies={movies}
            allGenres={genres}
            onDelete={onDelete}
            onLike={onLike}
            pageSize={pageSize}
            onPageChange={onPageChange}
            currentPage={currentPage}
            onSort={onSort}
            selectedGenre={selectedGenre}
            sortColumn={sortColumn}
            user={user}
          />
        }
      </div>
    </div>
  );
};

export default MoviesForm;
