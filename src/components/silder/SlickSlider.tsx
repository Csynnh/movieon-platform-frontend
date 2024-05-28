import { Movie, MovieDetail } from '@/api/type';
import { FC } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import Banner from '../../components/banner/Banner';
import './index.scss';
interface SlickSliderProps {
  sliders: MovieDetail[];
}

const SlickSlider: FC<SlickSliderProps> = ({ sliders }) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    speed: 800,
    autoplaySpeed: 4000,
  };

  return (
    <div className='slider-container'>
      <Slider {...settings}>
        {[...sliders].map((slide: Movie | any) => {
          return (
            <div key={slide._id}>
              <Banner
                movieId={slide?._id}
                image={slide?.poster}
                time={slide?.runtime}
                type={slide?.genres}
                language={slide?.languages}
                title={slide?.title}
                description={slide?.fullplot}
              ></Banner>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default SlickSlider;
