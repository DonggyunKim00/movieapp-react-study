import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import OneMovie from "../components/OneMovie";
import styles from "./Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const [toggle, setToggle] = useState(true);
  const onClick = () => {
    setToggle((current) => !current);
  };
  return (
    <div>
      <nav className={styles.navbar}>
        <div>
          <h1 className={styles.navtitle}>Movie Selector</h1>
        </div>
        <ul id={toggle ? styles.hidden : null} className={styles.navmenu}>
          <li>Home</li>
          <li>FAQ</li>
          <li>developer</li>
          <li>Github</li>
        </ul>
        <div className={styles.toggleBtn}>
          <FontAwesomeIcon onClick={onClick} icon={faBars} />
        </div>
      </nav>
    </div>
  );
}
function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [index, setIndex] = useState("select");
  const [select, setSelect] = useState([]);

  const onSelect = (event) => {
    setIndex(event.target.value);
    setSelect(movies[event.target.value]);
  };
  console.log(select);
  console.log(index);

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
  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loader}>
          <strong>Loading...</strong>
        </div>
      ) : (
        <div>
          <Header />
          <select value={index} onChange={onSelect}>
            <option value='select' key='select'>
              Select Movie!
            </option>
            <option value='showAll' key='showAll'>
              Show all Movie!
            </option>
            {movies.map((movie, idx) => (
              <option value={idx} key={idx}>
                {movie.title} ({movie.year})
              </option>
            ))}
          </select>
          <hr />
          {index === "select" ? <h1>Select Movie!</h1> : null}
          {index === "showAll" ? (
            <div className={styles.movie}>
              <Movie movies={movies} />
            </div>
          ) : null}
          {index === "select" || index === "showAll" ? null : (
            <OneMovie select={select} />
          )}
        </div>
      )}
    </div>
  );
}
export default Home;
