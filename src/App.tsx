import { useState } from "react";
import MovieGrid from "./components/movie-grid";
import Pagination from "./components/pagination";
import Header from "./components/header";
import MovieDetail from "./components/movie-detail";
import type { Movie } from "./types/movie";
import { movies as initialMovies } from "./data/movies";
import "./App.css";

const MOVIES_PER_PAGE = 5;

export default function App() {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  // 영화별 평점 저장
  const [ratings, setRatings] = useState<Record<number, number>>({});

  function handleToggleBookmark(movieId: number) {
    setMovies((currentMovies) =>
      currentMovies.map((movie) =>
        movie.id === movieId
          ? { ...movie, isBookmarked: !movie.isBookmarked }
          : movie,
      ),
    );
  }

  function handleSelectMovie(movieId: number) {
    setSelectedMovieId(movieId);
  }

  function handleBackToList() {
    setSelectedMovieId(null);
  }

  function handleRateMovie(movieId: number, rating: number) {
    setRatings((currentRatings) => ({
      ...currentRatings,
      [movieId]: rating,
    }));
  }

  const totalPages = Math.ceil(movies.length / MOVIES_PER_PAGE);

  const startIndex = (currentPage - 1) * MOVIES_PER_PAGE;

  const currentMovies = movies.slice(
    startIndex,
    startIndex + MOVIES_PER_PAGE,
  );

  const selectedMovie = movies.find(
    (movie) => movie.id === selectedMovieId,
  );

  return (
    <>
      <Header />

      <main className="main-content">
        {selectedMovieId === null ? (
          <>
            <h1>영화 목록</h1>

            <MovieGrid
              movies={currentMovies}
              onToggleBookmark={handleToggleBookmark}
              onSelectMovie={handleSelectMovie}
            />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        ) : selectedMovie ? (
          <MovieDetail
            movie={selectedMovie}
            onToggleBookmark={handleToggleBookmark}
            onBack={handleBackToList}
            rating={ratings[selectedMovie.id] ?? 0}
            onRate={(rating) =>
              handleRateMovie(selectedMovie.id, rating)
            }
          />
        ) : null}
      </main>
    </>
  );
}