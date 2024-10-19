"use client";

import { apiAccessToken, apiKey, baseUrl } from "@/lib/constants";
import { useEffect } from "react";
import axios from "axios";
import MovieCard from "@/components/MovieCard";
import { useMovie } from "@/hooks/useMovie";

export default function FavoritePage() {
  const { favMovies, setFavMovies } = useMovie();

  useEffect(() => {
    axios
      .get(
        `${baseUrl}/account/21375178/favorite/movies?api_key=${apiKey}&session_id=${localStorage.getItem(
          "session_id"
        )}`,
        {
          params: {
            language: "en-US",
            page: "1",
            sort_by: "created_at.desc",
          },
          headers: { Authorization: `Bearer ${apiAccessToken}` },
        }
      )
      .then((res) => {
        setFavMovies(res.data.results);
      })
      .catch((err) => console.error(err));
  }, [setFavMovies]);

  return (
    <section className="py-4">
      <div className="container">
        <div className="flex flex-wrap gap-2">
          {favMovies.map((item) => (
            <MovieCard key={item?.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
