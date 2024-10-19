import { Movie } from "@/lib/types";
import { create } from "zustand";

type MovieState = {
  movies: Movie[];
  setMovies: (movies: Movie[]) => void;
  favMovies: Movie[];
  setFavMovies: (movies: Movie[]) => void;
};

export const useMovie = create<MovieState>((set) => ({
  movies: [],
  setMovies: (movies) => set((state) => ({ ...state, movies })),
  favMovies: [],
  setFavMovies: (movies) => set((state) => ({ ...state, favMovies: movies })),
}));
