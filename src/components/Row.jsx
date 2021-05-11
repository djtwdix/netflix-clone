import React, { useEffect, useState } from "react";
import axios from "../axios/instance";
import RowItem from "./RowItem";

function Row({ title, fetchURL }) {
  const [movies, setMovies] = useState([]);

  const baseURL = "https://images.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchURL]);

  return (
    <div className="row">
      <h2 className="row__title">{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <RowItem key={movie?.id} baseURL={baseURL} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Row;
