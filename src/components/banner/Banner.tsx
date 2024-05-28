import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
import './styles.scss';
export type BannerProps = {
  movieId: number;
  image: string;
  title: string;
  time: number;
  type: any;
  language: string;
  description: string;
};
const Banner = ({ image, title, time, type, language, description, movieId }: BannerProps) => {
  return (
    <div className={'banner'}>
      <div className='banner-container'>
        <div className='banner-poster'>
          <img src={image} alt='poster' />
        </div>
        <div className='banner-content'>
          <h2 className='banner-title'>{title}</h2>
          <p className={'banner-detail'}>
            <strong>Thể loại: </strong>
            <span>{type?.map((item: any, index: number) => (index ? ' - ' + item : item))}</span>
          </p>
          <p className={'banner-detail'}>
            <strong>Thời lượng: </strong>
            <span>{time}</span>
          </p>
          <p className={'banner-detail'}>
            <strong>Ngôn ngữ: </strong>
            <span>{language}</span>
          </p>
          <p className={'banner-detail'}>
            <strong>Nội dung: </strong>
            <span>{description}</span>
          </p>

          <NavLink to={`/movie/${movieId}`} className={'banner-button'}>
            <Button type='default'>Xem chi tiết</Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Banner;
