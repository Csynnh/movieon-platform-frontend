import poster from "../../asset/image/posterFilm.png";
import { BannerProps } from "../../components/banner/Banner";
import Showtime from "../../components/showtime/Showtime";
import SlickSlider from "../../components/silder/SlickSlider";
import "./index.scss";
const HomeView = () => {
  const dummy: {
    image: any;
    description: string;
    id: number;
    title: string;
  }[] = [
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

  return (
    <div className="home">
      <SlickSlider sliders={dummy as BannerProps[]} />
      <Showtime />
    </div>
  );
};

export default HomeView;
