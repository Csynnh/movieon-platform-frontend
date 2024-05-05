import Banner, { BannerProps } from "../../components/banner/Banner";
import { FC } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./index.scss";
interface SlickSliderProps {
  sliders: BannerProps[];
}

const SlickSlider: FC<SlickSliderProps> = ({ sliders }) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 4000,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {[...sliders].map((slide: BannerProps) => {
          return (
            <div key={slide.id}>
              <Banner
                id={slide.id}
                description={slide.description}
                image={slide.image}
                title={slide.title}
              ></Banner>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default SlickSlider;
