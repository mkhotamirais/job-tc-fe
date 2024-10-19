import AddToFavoriteBtn from "@/app/(root)/AddToFavoriteBtn";
import { basicImage } from "@/lib/constants";
import { Movie } from "@/lib/types";
import Image from "next/image";
import React from "react";

export default function MovieCard({ item, favBtn = true }: { item: Movie; favBtn?: boolean }) {
  return (
    <div key={item?.id} className="relative min-w-48 max-w-min border rounded-xl overflow-hidden">
      {favBtn && <AddToFavoriteBtn movieId={item?.id} item={item} />}
      <Image
        src={`${basicImage}${item.poster_path}`}
        width={400}
        height={400}
        alt="now playing movie"
        className="object-cover object-center w-full h-64"
        priority
      />
      <h2 className="h-16 flex items-center justify-center p-2 text-center font-semibold">{item?.original_title}</h2>
    </div>
  );
}
