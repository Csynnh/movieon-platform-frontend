import { NavLink } from 'react-router-dom';
import './index.scss';
import { Movie } from '../../api/type';
import { Button } from 'antd';

const MovieComponent = (props: {
  movie: Movie;
  selectedDate: string;
  selectedCinemaId: string;
}) => {
  return (
    <>
      <div className='movie__cp'>
        <div className='movie__cp-container'>
          <div className='movie__cp-poster'>
            <img src={props?.movie?.poster} alt='poster' />
          </div>
          <div className='movie__cp-content'>
            <h4 className='movie__cp-title'>{props?.movie?.title}</h4>
            <div className='movie__cp-details'>
              <p>
                <span>Thể loại: </span>
                {props?.movie?.genres.map((genre, index) => (
                  <span key={index}>
                    {index !== 0 ? ', ' : ''}
                    {genre}
                  </span>
                ))}
              </p>
              <p>
                <span>Thời lượng: </span>
                <span>{props?.movie?.runtime} phút</span>
              </p>
              <p>
                <span>Ngôn ngữ: </span>
                {props?.movie?.languages.map((lang, index) => (
                  <span key={index}>
                    {index !== 0 ? ', ' : ''}
                    {lang}
                  </span>
                ))}
              </p>
              <p>
                <span>Nội dung: </span>
                <span className='movie__cp-details-body'>{props?.movie?.fullplot} phút</span>
              </p>
            </div>
            <Button type='primary'>
              <NavLink
                to={`/movie/${encodeURIComponent(props?.movie?._id)}/${encodeURIComponent(
                  props?.selectedDate,
                )}/${encodeURIComponent(props?.selectedCinemaId)}`}
                className='movie__cp-link'
              >
                Chọn Phim
              </NavLink>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieComponent;
