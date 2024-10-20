"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { apiAccessToken, apiKey, baseUrl } from "@/lib/constants";
import axios from "axios";
import { Heart, LogIn, LogOut } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMovie } from "@/hooks/useMovie";

export default function AuthBtn() {
  const { favMovies, setFavMovies, isLogin, setIsLogin, sessId } = useMovie();
  const router = useRouter();

  const onLogout = () => {
    axios
      .delete(`${baseUrl}/authentication/session?api_key=${apiKey}&session_id=${sessId}`, {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${apiAccessToken}`,
        },
      })
      .then(() => {
        toast.success("Logged out successfully");
        localStorage.removeItem("session_id");
        localStorage.removeItem("guest_session_id");
        window.location.href = "/";
        router.push("/");
        setIsLogin(false);
        setFavMovies([]);
      })
      .catch((err) => {
        toast.error("Logout failed");
        console.log(err);
      });
  };

  return (
    <>
      {isLogin ? (
        <div className="flex gap-4 items-center">
          <Link href="/favorite" title="favorite movies" className="flex gap-1 items-center">
            <Heart className={`size-5 stroke-red-500`} />
            <div className="text-red-500 text-sm">{favMovies.length}</div>
          </Link>
          <Button onClick={onLogout} title="Logout" variant={"link"} size={"icon"}>
            <LogOut className="scale-125" />
          </Button>
        </div>
      ) : (
        <Link title="login" href="/login">
          <LogIn className="size-5 text-primary" />
        </Link>
      )}
    </>
  );
}
