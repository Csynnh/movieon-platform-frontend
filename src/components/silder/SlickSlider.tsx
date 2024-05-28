import Banner, { BannerProps } from '../../components/banner/Banner';
import { FC } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import './index.scss';
import useTopTrending from '@/api/listTopTrending';
import { Movie } from '@/api/type';
interface SlickSliderProps {
  sliders: BannerProps[];
}

const SlickSlider: FC<SlickSliderProps> = ({ sliders }) => {
  const listTheaterTrending = useTopTrending();
  // console.log(listTrending);

  const listMovieTrending = listTheaterTrending.map((item) => item.movie);
  console.log(listMovieTrending);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 4000,
  };
  return (
    <div className='slider-container'>
      <Slider {...settings}>
        {[...sliders, ...listMovieTrending].map((slide: Movie | any) => {
          return (
            <div key={slide._id}>
              <Banner
                // id={slide._id}
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
