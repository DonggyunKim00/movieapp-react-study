import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function Detail() {
  const [movieInfo, setMovieInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams(); // id 값을 찾는곳
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json(); // 내가 클릭한 영화의 정보가 들어있음
    setMovieInfo(json.data.movie.url);
    setLoading((current) => !current);
  };
  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <h1>
          <a href={movieInfo} target='_blank'>
            Go to torrent page
          </a>
        </h1>
      )}
    </div>
  );
}
export default Detail;
