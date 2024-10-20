"use client";

import { apiAccessToken, apiKey, baseUrl } from "@/lib/constants";
import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "@/components/MovieCard";
import { useMovie } from "@/hooks/useMovie";
import LoaderSpin from "@/components/LoaderSpin";
import { redirect } from "next/navigation";

export default function FavoritePage() {
  const [pending, setPending] = useState(false);
  const { isLogin, favMovies, setFavMovies, sessId } = useMovie();

  useEffect(() => {
    if (!isLogin) {
      redirect("/login");
    }
  }, [isLogin]);

  useEffect(() => {
    setPending(true);
    axios
      .get(`${baseUrl}/account/21375178/favorite/movies?api_key=${apiKey}&session_id=${sessId}`, {
        params: {
          language: "en-US",
          page: "1",
          sort_by: "created_at.desc",
        },
        headers: { Authorization: `Bearer ${apiAccessToken}` },
      })
      .then((res) => {
        setFavMovies(res.data.results);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setPending(false);
      });
  }, [setFavMovies, sessId]);

  if (pending) return <LoaderSpin />;

  return (
    <section className="grow py-4">
      <div className="container">
        <h1 className="text-2xl font-bold mb-2 text-primary">Favorite Movies</h1>
        {favMovies.length === 0 && <p className="italic">No favorite movies have been added yet.</p>}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {favMovies.map((item, i) => (
            <MovieCard key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
