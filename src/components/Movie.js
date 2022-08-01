import { Link } from "react-router-dom";
import styles from "./Movie.module.css"; // movie정보에 집중

function Movie({ movies }) {
  return (
    <div className={styles.container}>
      {movies.map((movie) => (
        // 밑의 div는 h2,p,ul,img를 나타낸것
        <div className={styles.movie} key={movie.id}>
          <img className={styles.movieimg} src={movie.medium_cover_image} />
          <h2 className={styles.movietitle}>
            <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
          </h2>
          <h3 className={styles.movieyear}>{`(${movie.year})`}</h3>
          <p>
            {movie.summary.length > 235
              ? `${movie.summary.slice(0, 235)}...`
              : movie.summary}
          </p>
          <ul className={styles.moviegenres}>
            {movie.genres.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Movie;
