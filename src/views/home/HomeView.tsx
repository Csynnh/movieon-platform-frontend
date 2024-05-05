import SlickSlider from "../../components/silder/SlickSlider";
import { BannerProps } from "../../components/banner/Banner";
import poster from "../../asset/image/posterFilm.png";
import "./index.scss";
import Showtime from "../../components/showtime/Showtime";
import { useEffect, useState } from "react";
import useMoviesData from "../../api/listMoviesData";
import Loading from "../../components/loading/Loading";
import { Movie } from "../../api/type";
const HomeView = () => {
  const dummy: { image: {}; description: string; id: number; title: string }[] =
    [
      {
        id: 1,
        image: poster,
        title: "Hello",
        description: "This is description",
      },
      {
        id: 2,
        image: poster,
        title: "Hello",
        description: "This is description",
      },
    ];
  const [movieData, setMovieData] = useState<Movie[]>([]);
  const data = useMoviesData({ limit: 8 });
  useEffect(() => {
    if (data) {
      setMovieData(data);
    }
  }, [data]);
  return (
    <Loading spinning={!movieData.length}>
      <div className="home">
        <SlickSlider sliders={dummy as BannerProps[]} />
        <Showtime data={movieData} />
      </div>
    </Loading>
  );
};

export default HomeView;
