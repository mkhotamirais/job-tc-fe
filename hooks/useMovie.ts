import { Movie } from "@/lib/types";
import { create } from "zustand";

type MovieState = {
  sessId: string | null;
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
  movies: Movie[];
  setMovies: (movies: Movie[]) => void;
  popularMovies: Movie[];
  setPopularMovies: (movies: Movie[]) => void;
  favMovies: Movie[];
  setFavMovies: (movies: Movie[]) => void;
};

export const useMovie = create<MovieState>((set) => ({
  sessId: typeof window !== "undefined" ? localStorage.getItem("session_id") : null,
  isLogin: false,
  setIsLogin: (isLogin) => set({ isLogin }),
  movies: [],
  setMovies: (movies) => set((state) => ({ ...state, movies })),
  popularMovies: [],
  setPopularMovies: (movies) => set((state) => ({ ...state, popularMovies: movies })),
  favMovies: [],
  setFavMovies: (movies) => set((state) => ({ ...state, favMovies: movies })),
}));
