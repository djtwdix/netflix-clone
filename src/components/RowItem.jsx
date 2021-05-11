import React, { useEffect, useState } from "react";
import axios from "../axios/instance";

function RowItem({ movie, baseURL }) {
  const [trailer, setTrailer] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);

  /*   useEffect(() => {
    axios
      .get(
        `/movie/${movie?.id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
      )
      .then((res) => {
        if (res.data.results.length) {
          setTrailer(res.data.results[0].key);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [movie]); */

  return (
    <div
      className="row__posterContainer"
      onMouseEnter={() => setShowTrailer(false)}
      onMouseLeave={() => setShowTrailer(false)}
    >
      {showTrailer ? (
        <iframe
          className="row__video"
          title={movie?.name}
          width="100%"
          autoPlay
          controls={false}
          rel={false}
          src={`https://www.youtube.com/embed/${trailer}?controls=0`}
        />
      ) : (
        <img
          className="row__poster"
          src={baseURL + movie?.backdrop_path}
          alt={movie?.name}
        />
      )}
    </div>
  );
}

export default RowItem;
