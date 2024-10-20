"use client";

import axios from "axios";
import { Heart, Loader2 } from "lucide-react";
import { apiAccessToken, apiKey, baseUrl } from "@/lib/constants";
import { useMovie } from "@/hooks/useMovie";
import { Movie } from "@/lib/types";
import { toast } from "sonner";
import { useState } from "react";

export default function AddToFavoriteBtn({ movieId, item }: { movieId: number; item: Movie }) {
  const { favMovies, setFavMovies, sessId } = useMovie();
  const [pending, setPending] = useState(false);
  const favIds = favMovies.map((item) => item.id);

  const onClick = async () => {
    setPending(true);

    axios
      .post(
        `${baseUrl}/account/21375178/favorite?api_key=${apiKey}&session_id=${sessId}`,
        {
          media_type: "movie",
          media_id: movieId,
          favorite: favMovies.map((i) => i.id).includes(item?.id) ? false : true,
        },
        {
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            Authorization: `Bearer ${apiAccessToken}`,
          },
        }
      )
      .then(() => {
        if (favIds.includes(item?.id)) {
          setFavMovies(favMovies.filter((i) => i.id !== item?.id));
          toast.success(`Removed ${item.title} from favorite successfully`);
        } else {
          setFavMovies([...favMovies, item]);
          toast.success(`Added ${item.title} to favorite successfully`);
        }
      })
      .catch((error) => {
        toast.error(`Failed to add ${item.title} to favorite`);
        console.error(error);
      })
      .finally(() => {
        setPending(false);
      });
  };

  const title = favIds.includes(item?.id) ? `Remove ${item.title} from favorite` : `Add ${item.title} to favorite`;

  return (
    <button type="button" onClick={onClick} title={title} className="absolute right-2 top-2">
      {pending ? (
        <Loader2 className="animate-spin size-6 text-red-500" />
      ) : (
        <Heart className={`size-6 ${favIds.includes(item?.id) ? "fill-red-500" : ""} text-red-500`} />
      )}
    </button>
  );
}
