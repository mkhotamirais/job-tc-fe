"use client";

import { apiAccessToken, apiKey, baseUrl } from "@/lib/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard";
import { useMovie } from "@/hooks/useMovie";

export default function MoviePage() {
  const [pending, setPending] = useState(false);
  const { movies, setMovies, setFavMovies } = useMovie();

  useEffect(() => {
    setPending(true);
    axios
      .get(`${baseUrl}/movie/now_playing?api_key=${apiKey}`)
      .then((res) => {
        setMovies(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setPending(false);
      });

    axios
      .get(
        `${baseUrl}/account/21375178/favorite/movies?api_key=${apiKey}&session_id=${localStorage.getItem(
          "session_id"
        )}`,
        {
          headers: { Authorization: `Bearer ${apiAccessToken}` },
        }
      )
      .then((res) => {
        setFavMovies(res.data.results);
      })
      .catch((err) => console.error(err));
  }, [setFavMovies, setMovies]);

  if (pending) return <div>loading...</div>;

  return (
    <div className="py-4">
      <div className="container">
        <h1 className="text-xl font-bold mb-2">Now Playing</h1>
        <div className="flex flex-wrap gap-2">
          {movies?.map((item) => (
            <MovieCard key={item?.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
