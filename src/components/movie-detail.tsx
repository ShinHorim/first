import type { Movie } from "../types/movie";

interface MovieDetailProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
  onBack: () => void;
  rating: number;
  onRate: (rating: number) => void;
}

export default function MovieDetail({
  movie,
  onToggleBookmark,
  onBack,
  rating,
  onRate,
}: MovieDetailProps) {
  return (
    <section className="movie-detail">
      <button className="back-button" onClick={onBack}>
        ← 영화 목록
      </button>

      <div className="movie-detail-content">
        <img
          src={movie.posterPath}
          alt={movie.title}
          className="detail-poster"
        />

        <div className="detail-info">
          <h1>{movie.title}</h1>

          <p>{movie.originalTitle}</p>
          <p>{movie.releaseDate}</p>
          <p>{movie.genres.join(", ")}</p>
          <p>{movie.runtime}</p>
          <p>{movie.tagline}</p>
          <p>{movie.overview}</p>

          <button
            className="detail-bookmark-button"
            onClick={() => onToggleBookmark(movie.id)}
            aria-pressed={movie.isBookmarked}
          >
            {movie.isBookmarked ? "♥ 북마크 해제" : "♡ 북마크"}
          </button>

          <div className="rating">
            <p>평점</p>

            {[1, 2, 3, 4, 5].map((score) => (
              <button
                key={score}
                className="rating-button"
                onClick={() => onRate(score)}
              >
                {score <= rating ? "★" : "☆"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}