import useTopTrending from '@/api/listTopTrending';
import Showtime from '../../components/showtime/Showtime';
import SlickSlider from '../../components/silder/SlickSlider';
import './index.scss';
const HomeView = () => {
  const listTheaterTrending = useTopTrending();
  const listMovieTrending = listTheaterTrending.map((item) => item.movie);

  return (
    <div className='home'>
      <SlickSlider sliders={listMovieTrending} />
      <Showtime />
    </div>
  );
};

export default HomeView;
