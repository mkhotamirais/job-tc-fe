"use client";

import { Movie } from "@/lib/types";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function MoviePage() {
  const [data, setData] = useState<Movie[]>([]);

  useEffect(() => {
    const getData = async () => {
      await axios
        .get("https://api.themoviedb.org/3/movie/now_playing?api_key=42efea6e97551441f95f83358126d7a8")
        .then((res) => {
          console.log(res.data.results);
          setData(res.data.results);
        })
        .then((err) => {
          console.log(err);
        })
        .finally(() => {
          console.log("selesai");
        });
    };
    getData();
  }, []);

  return (
    <div className="py-4">
      <div className="container">
        <h1 className="text-xl font-bold mb-2">Now Playing</h1>
        <div className="flex flex-wrap gap-2">
          {data.map((item) => (
            <div key={item?.id} className="min-w-48 max-w-min border rounded-xl overflow-hidden">
              <Image
                src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                width={400}
                height={400}
                alt="now playing movie"
                className="object-cover object-center w-full h-64"
              />
              <h2 className="h-16 flex items-center justify-center p-2 text-center font-semibold">
                {item?.original_title}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
