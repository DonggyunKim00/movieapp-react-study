import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import styles from "./Home.module.css";
function Header() {
  return (
    <div>
      <h1 className={styles.header}>Movie Selector</h1>
    </div>
  );
}
function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState("0");
  const getMovies = async () => {
    const json = await (
      await fetch(
        "https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year"
      )
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);
  console.log(movies);
  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loader}>
          <strong>Loading...</strong>
        </div>
      ) : (
        <div>
          <Header />
          <select>
            <option>choose genre</option>
          </select>
          <hr />
          <div className={styles.movie}>
            <Movie movies={movies} />
          </div>
        </div>
      )}
    </div>
  );
}
export default Home;
