import { Button } from 'antd';
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Movie, SeatRequest } from '../../api/type';
import { formatDate } from '../../util/date';
import CloseIcon from '../../views/checkout/CloseIcon';
import './CheckoutBox.scss';

const CheckoutBox = (props: {
  handle: any;
  open?: boolean;
  data?: { movie: Movie; seats: SeatRequest[]; showtime: string; cinemaId: string };
  popcorn?: any[];
}) => {
  const { handle, open, data, popcorn } = props;
  const pathname = window.location.pathname;
  const navigate = useNavigate();
  const priceTicket = useMemo(() => {
    if (!data?.seats) return 0;
    let total = data?.seats?.reduce?.((acc, seat) => acc + Number(seat.price), 0) * 1000;
    if (popcorn?.length) {
      total += popcorn.reduce((acc, item) => acc + item.price * item.count, 0);
    }

    return total;
  }, [data?.seats, popcorn]);

  const seatSelected = useCallback(() => {
    return data?.seats?.map((seat, index) => (
      <span key={index}>
        {index !== 0 ? ', ' : ''}
        {seat?.seatType + '-' + seat?.seatNumber}
      </span>
    ));
  }, [data?.seats]);

  const dataCheckout = {
    ...data,
    popcorn: popcorn,
  };

  console.log(data);

  return (
    <div className={`bill ${open ? 'isOpen' : ''}`}>
      <h4>{data?.movie?.title}</h4>
      <div className='bill-container'>
        <div className='bill-content'>
          <div className='bill-desc'>
            <span className='bill-title'>Suất: </span>
            <span>{formatDate(data?.showtime ?? '')}</span>
          </div>
          <div
            className='bill-desc'
            style={{
              maxWidth: '60%',
            }}
          >
            <span className='bill-title'>Ghế đang chọn: </span>
            <strong>{seatSelected()}</strong>
          </div>
          <div className='bill-desc'>
            <span className='bill-title'>Bắp nước: </span>
            <span>
              {props.popcorn?.length
                ? props.popcorn?.map((item) => `${item.count} ${item.name} /`)
                : 'Không có'}
            </span>
          </div>
          <div className='bill-desc'>
            <span className='bill-title'>Tạm tính: </span>
            <span>{priceTicket}đ</span>
          </div>
        </div>

        <div className='bill-link'>
          <div
            onClick={() => navigate('/popcorn', { state: { data } })}
            className={`${pathname.includes('popcorn') ? 'bill-secondary' : ''}`}
          >
            <Button>Đặt bắp nước</Button>
          </div>
          <div
            onClick={() => navigate('/checkout', { state: { dataCheckout } })}
            className={`${pathname.includes('movie') ? 'bill-secondary' : ''}`}
          >
            <Button>Thanh toán</Button>
          </div>
        </div>
        <CloseIcon handle={handle}></CloseIcon>
      </div>
    </div>
  );
};

export default CheckoutBox;
