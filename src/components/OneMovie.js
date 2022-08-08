import { Link } from "react-router-dom";
import styles from "./OneMovie.module.css"; // OneMovie정보에 집중

function OneMovie({ select }) {
  return (
    <div className={styles.container}>
      <div className={styles.movie} key={select.id}>
        <img className={styles.movieimg} src={select.medium_cover_image} />
        <h2 className={styles.movietitle}>
          <Link to={`/movie/${select.id}`}>{select.title}</Link>
        </h2>
        <h3 className={styles.movieyear}>{`(${select.year})`}</h3>
        <p>
          {select.summary.length > 235
            ? `${select.summary.slice(0, 235)}...`
            : select.summary}
        </p>
        <ul className={styles.moviegenres}>
          {select.genres.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default OneMovie;
