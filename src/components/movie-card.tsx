import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
  onSelectMovie: (movieId: number) => void;
}

export default function MovieCard({
  movie,
  onToggleBookmark,
  onSelectMovie,
}: MovieCardProps) {
  return (
    <article
      className="movie-card"
      onClick={() => onSelectMovie(movie.id)}
    >
      <div className="poster-wrapper">
        <img src={movie.posterPath} alt={movie.title} />

        <button
          className="bookmark-button"
          onClick={(event) => {
            event.stopPropagation();
            onToggleBookmark(movie.id);
          }}
          aria-pressed={movie.isBookmarked}
        >
          {movie.isBookmarked ? "♥" : "♡"}
        </button>
      </div>

      <h2>{movie.title}</h2>
      <p>{movie.releaseDate}</p>
    </article>
  );
}