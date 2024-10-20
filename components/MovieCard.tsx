import AddToFavoriteBtn from "@/app/(root)/AddToFavoriteBtn";
import { useMovie } from "@/hooks/useMovie";
import { basicImage } from "@/lib/constants";
import { Movie } from "@/lib/types";
import Image from "next/image";
import React from "react";

export default function MovieCard({ item }: { item: Movie }) {
  const { isLogin } = useMovie();
  return (
    <div className="relative border shadow-xl rounded-xl overflow-hidden">
      {isLogin ? <AddToFavoriteBtn movieId={item?.id} item={item} /> : null}
      <Image
        src={`${basicImage}${item.poster_path}`}
        width={400}
        height={300}
        alt="now playing movie"
        className="object-cover object-center w-full h-60"
        priority
        placeholder="blur"
        blurDataURL={`${basicImage}${item.poster_path}`}
      />
      <h2 className="h-16 flex items-center justify-center p-2 text-center font-medium">
        {item?.original_title?.substring(0, 36)}
        {item?.original_title.length > 36 ? "..." : ""}
      </h2>
    </div>
  );
}
