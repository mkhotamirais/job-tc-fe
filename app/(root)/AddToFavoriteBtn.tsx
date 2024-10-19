"use client";

import axios from "axios";
import { Heart } from "lucide-react";
import { apiAccessToken, apiKey, baseUrl } from "@/lib/constants";
import { useMovie } from "@/hooks/useMovie";
import { Movie } from "@/lib/types";
import { toast } from "sonner";

export default function AddToFavoriteBtn({ movieId, item }: { movieId: number; item: Movie }) {
  const { favMovies, setFavMovies } = useMovie();
  const favIds = favMovies.map((item) => item.id);

  const onClick = async () => {
    axios
      .post(
        `${baseUrl}/account/21375178/favorite?api_key=${apiKey}&session_id=${localStorage.getItem("session_id")}`,
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
      });
  };

  const title = favIds.includes(item?.id) ? `Remove ${item.title} from favorite` : `Add ${item.title} to favorite`;

  return (
    <button type="button" onClick={onClick} title={title} className="absolute right-2 top-2">
      <Heart className={`size-6 ${favIds.includes(item?.id) ? "fill-red-500" : ""} text-red-500`} />
    </button>
  );
}
