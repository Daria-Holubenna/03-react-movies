const APIKey = import.meta.env.VITE_TMDB_TOKEN;
import axios from "axios";
import type { Movie } from "../../types/movie";

interface MovieHttpRequest {
  results: Movie[];
}

export default async function fetchMovies(query: string): Promise<Movie[]> {
  const response = await axios.get<MovieHttpRequest>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query,
      },
      headers: {
        Authorization: `Bearer ${APIKey}`,
      },
    }
  );
  return response.data.results;
}
