import React from "react";

function RowItem({ movie, baseURL }) {
  return (
    <div className="row__posterContainer">
      <img
        className="row__poster"
        src={baseURL + movie?.backdrop_path}
        alt={movie?.name}
      />
    </div>
  );
}

export default RowItem;
