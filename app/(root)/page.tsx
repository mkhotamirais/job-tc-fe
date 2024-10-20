"use client";

import { apiAccessToken, apiKey, baseUrl } from "@/lib/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard";
import { useMovie } from "@/hooks/useMovie";
import LoaderSpin from "@/components/LoaderSpin";
import { Button } from "@/components/ui/button";

export default function MoviePage() {
  const [pending, setPending] = useState(false);
  const { movies, setMovies, popularMovies, setPopularMovies, setFavMovies, sessId } = useMovie();
  const [page, setPage] = useState(2);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    setPending(true);
    axios
      .get(`${baseUrl}/movie/now_playing?api_key=${apiKey}`)
      .then((res) => {
        setMovies(res.data.results.slice(0, 6));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setPending(false));

    setLoadingMore(true);
    axios
      .get(`${baseUrl}/movie/popular?api_key=${apiKey}&page=1`)
      .then((res) => {
        setPopularMovies(res.data.results.slice(0, 6));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoadingMore(false));

    axios
      .get(`${baseUrl}/account/21375178/favorite/movies?api_key=${apiKey}&session_id=${sessId}`, {
        headers: { Authorization: `Bearer ${apiAccessToken}` },
      })
      .then((res) => setFavMovies(res.data.results))
      .catch((err) => console.error(err));
  }, [setFavMovies, setMovies, setPopularMovies, sessId]);

  const onMoreMovies = () => {
    setPage((prev) => prev + 1);
    setLoadingMore(true);
    axios
      .get(`${baseUrl}/movie/popular?api_key=${apiKey}&page=${page}`)
      .then((res) => {
        setPopularMovies([...popularMovies, ...res.data.results.slice(0, 6)]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoadingMore(false));
  };

  if (pending) return <LoaderSpin />;

  return (
    <section className="grow">
      <div className="py-6">
        <div className="container">
          <h1 className="text-2xl font-bold mb-2 text-primary">Now Playing</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {movies?.map((item, i) => (
              <MovieCard key={i} item={item} />
            ))}
          </div>
        </div>
      </div>
      <div className="py-6 bg-secondary">
        <div className="container">
          <h1 className="text-2xl font-bold mb-2 text-primary">Popular Movies</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {popularMovies?.map((item, i) => (
              <MovieCard key={i} item={item} />
            ))}
          </div>
          <div>{loadingMore && <LoaderSpin />}</div>
          {popularMovies.length < 30 && (
            <div className="flex items-center justify-center py-4">
              <Button onClick={onMoreMovies}>More Movies</Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
