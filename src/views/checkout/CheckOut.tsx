import combo from '../../asset/image/combo.png';

import AWS from 'aws-sdk';

import Loading from '@/components/loading/Loading';
import emailjs from '@emailjs/browser';
import { Button, Col, Form, Input, Modal, QRCode, Radio, message } from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Movie, RESPONSE, SeatResponse, TicketType } from '../../api/type';
import { convertToTime, formatDate } from '../../util/date';
import { convertToVietnamese } from '../../util/language';
import { convertToDate } from '../admin/Dashboard';
import { Combotype } from '../popcorn/PopCorn';

import './CheckOut.scss';
import MovieTicket from './MovieTicket';
import { addTicket } from '@/api/addTicket';
function dataURLtoFile(dataurl: string, filename: string): Promise<File> {
  return fetch(dataurl)
    .then((response) => response.blob())
    .then((blob) => new File([blob], filename, { type: blob.type }));
}
const CheckOut = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpenOverlay, setIsOpenOverlay] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState<any>(null);
  const qrRef = useRef<any>(null);
  const data: {
    movie: Movie;
    seats: SeatResponse[];
    showtime: string;
    popcorn: Combotype[];
  } = location?.state?.dataCheckout;
  const priceCombo = data?.popcorn?.reduce((acc, item) => acc + item.price * item.count, 0) ?? 0;

  const priceTicket = useMemo(() => {
    if (data?.seats)
      return data?.seats?.reduce?.((acc, seat) => acc + Number(seat.price), 0) * 1000;
    else return 0;
  }, [data?.seats]);
  const [total, _] = useState(priceTicket + priceCombo);

  useEffect(() => {
    if (!location?.state?.dataCheckout) {
      navigate('/');
    }
  }, [location, navigate]);
  if (!location?.state?.dataCheckout) return null;

  //Xu ly close Overlay
  const handleExit = () => {
    setIsModalVisible(false);
  };

  const handleSubmitForm = async (values: any) => {
    setIsModalVisible(false);
    setIsSubmitting(true);

    const ticket: TicketType & RESPONSE = await addTicket({
      seats: data?.seats?.map((seat) => {
        return {
          seatNumber: seat.seatNumber,
          seatType: seat.seatType,
          price: seat.price,
          calendarId: seat.calendar?._id,
        };
      }),
      customer: {
        name: values.customerName,
        email: values.customerEmail,
        phone: values.customerPhone,
      },
    });

    if (ticket?.status_code === 400) {
      setLoading(() => true);
      message.error(ticket?.detail);
      setIsSubmitting(false);
      const rollBackURL = `/movie/${data?.movie?._id}/${data?.showtime}/${data?.seats?.[0]?.calendar?._id}`;
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(navigate(rollBackURL));
        }, 1000);
      });
      setLoading(() => false);
      return;
    }

    const formEmail: any = {
      customer_name: values.customerName,
      customer_service_phone: '0333312630',
      cinema_name: ticket?.seats?.[0]?.calendar?.theater?.cinema?.name ?? 'Movieon',
      movie_title: data?.movie?.title,
      date: convertToDate(data?.showtime),
      time: convertToTime(data?.showtime),
      cinema_hall: ticket?.seats?.[0]?.calendar?.theater?.name ?? 'Movieon Lê Văn Việt',
      seat_numbers: data?.seats
        ?.map((seat) => seat?.seatType && seat?.seatType + seat?.seatNumber)
        .join(', '),
      ticket_number: ticket?._id?.slice(0, 4) ?? '1',
      order_number: ticket?._id?.slice(-4, -1) ?? '1',
      total_amount: total,
      cinema_address: ticket?.seats?.[0]?.calendar?.theater?.cinema?.address ?? 'Movieon',
      cinema_phone: '0333312630',
      cinema_website: 'movieon@service.com',
      customer_email: values.customerEmail,
    };
    setParams(formEmail);
    setIsOpenOverlay(true);
    setIsSubmitting(false);
  };
  useEffect(() => {
    if (!isOpenOverlay) {
      return;
    }

    const fetch = async () => {
      try {
        const awsAccessKeyId = import.meta.env.VITE_AWS_ACCESS_KEY_ID;
        const awsSecretAccessKey = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;
        const region = import.meta.env.VITE_AWS_REGION;
        if (awsAccessKeyId && awsSecretAccessKey && AWS && AWS.config) {
          AWS?.config?.update({
            region: region,
            accessKeyId: awsAccessKeyId,
            secretAccessKey: awsSecretAccessKey,
          });
        }
      } catch (error) {
        console.error('Error updating AWS config:', error);
      }
      const s3 = new AWS.S3();

      qrRef.current.scrollIntoView();
      const base64String = qrRef.current.querySelector('.ant-qrcode canvas').toDataURL();
      const file = await dataURLtoFile(base64String, 'image.png');
      const paramsBucket = {
        Bucket: 'movieonplatformbucket',
        Key: file.name,
        Body: file,
      };
      if (!s3) return false;
      const res: any = await s3?.upload(paramsBucket)?.promise();
      if (res) {
        const formParams = {
          ...params,
          qr_url: res.Location,
        };
        await emailjs
          .send('service_xrs8e0n', 'template_v5p5c2d', formParams, {
            publicKey: 'sg63zm_lt_eh-HRFx',
          })
          .then(
            () => {
              message.success('Đặt vé thành công');
            },
            (error) => {
              console.log('FAILED...', error);
            },
          );
        setLoading(false);
      } else {
        message.error('upload failed.');
      }
    };
    fetch();
  }, [isOpenOverlay]);
  return (
    <Loading spinning={loading}>
      <div className='checkout'>
        <div className='checkout-container'>
          <div className='checkout-header'>
            <span>
              <svg
                width='40'
                height='42'
                viewBox='0 0 40 42'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M20.2979 35.019C18.5106 35.019 18.5106 38.3397 18.5106 40H34C34 37.7862 33.4043 35.019 32.2128 35.019H20.2979ZM20.2979 35.019C19.5035 33.1741 18.5107 28.931 20.8936 26.7172C18.9078 23.95 15.6511 18.5262 18.5106 18.9689C21.3702 19.4117 24.8653 23.581 26.2553 25.6103M24.4681 23.3965V4.2138C24.4681 2.99115 23.4012 2 22.0851 2H8.38298C7.0669 2 6 2.99115 6 4.2138V28.0986C6 29.3213 7.0669 30.3124 8.38298 30.3124H19.4876M31.617 34.4655V22.0802C31.617 17.7723 24.4681 14.5413 24.4681 14.5413V23.1572M10.5 4.57922V26.7172'
                  stroke='#0B2447'
                  strokeWidth='3'
                />
              </svg>
            </span>
            <h2>Thanh toán</h2>
          </div>
          <div className='checkout-content'>
            <div className='checkout-left'>
              <div className='checkout-item'>
                <div className='checkout-item-image'>
                  <img src={data?.movie?.poster} alt='poster' />
                </div>
                <div className='checkout-item-content'>
                  <div className='checkout-item-content-header'>{data?.movie?.title}</div>
                  <div className='checkout-item-content-title'>
                    <p>Thể loại: </p>
                    {data?.movie?.genres.map((genre, index) => (
                      <span key={index}>
                        {index !== 0 ? ', ' : ''}
                        {genre}
                      </span>
                    ))}
                  </div>
                  <div className='checkout-item-content-title'>
                    <p>Rạp: </p>
                    <span>Movieon Lê Văn Việt</span>
                  </div>
                  <div className='checkout-item-content-title'>
                    <p>Địa chỉ: </p>
                    <span>Movieon Lê Văn Việt</span>
                  </div>
                  <div className='checkout-item-content-title'>
                    <p>Suất: </p>
                    <span>{formatDate(data?.showtime)}</span>
                  </div>
                  <div className='checkout-item-content-title'>
                    <p>Phòng: </p>
                    <span>10</span>
                  </div>
                  <div className='checkout-item-content-title'>
                    <p>Ghế: </p>
                    {data?.seats?.map((seat, index) => (
                      <span key={index}>
                        {index !== 0 ? ', ' : ''}
                        {seat?.seatType + '-' + seat?.seatNumber}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className='checkout-temp'>
                <p>Tạm tính</p>
                <div>
                  <span className='checkout-price'>{priceTicket}</span>
                  <span>
                    (
                    {convertToVietnamese(
                      data?.seats?.reduce?.((acc, seat) => acc + Number(seat.price), 0) * 1000,
                    )}
                    )
                  </span>
                </div>
              </div>
              {priceCombo ? (
                <>
                  <div className='checkout-item combo'>
                    <div className='checkout-image'>
                      <img src={combo} alt='combo' />
                    </div>
                    <div className='checkout-item-content'>
                      <div className='checkout-item-content-header'>Combo bắp nước</div>
                      <div className='checkout-item-content-title'>
                        <p>Đơn giá: </p>
                        <span>{priceCombo}</span>
                      </div>
                      <div className='checkout-item-content-title'>
                        <p>Tên: </p>
                        <span>{data?.popcorn?.map((item) => `${item.count} ${item.name} /`)}</span>
                      </div>
                    </div>
                  </div>
                  <div className='checkout-temp'>
                    <p>Tạm tính</p>
                    <div>
                      <span className='checkout-price'>{priceCombo} </span>
                      <span>({convertToVietnamese(priceCombo)})</span>
                    </div>
                  </div>
                </>
              ) : null}
              <div className='checkout-line'></div>
              <div className='checkout-temp'>
                <p>Tổng</p>
                <div>
                  <span className='checkout-price'>{total} </span>
                  <span>({convertToVietnamese(total)})</span>
                </div>
              </div>
            </div>
            <div className='checkout-right'>
              <Form
                autoFocus={false}
                layout='vertical'
                form={form}
                onFinish={handleSubmitForm}
                disabled={loading || isSubmitting}
              >
                <Col>
                  <Form.Item
                    required
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập trường này',
                      },
                    ]}
                    label='Tên Khách hàng'
                    name='customerName'
                  >
                    <Input placeholder='Nhap Tên Khách hàng'></Input>
                  </Form.Item>
                </Col>

                <Col>
                  <Form.Item
                    required
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập trường này',
                      },
                    ]}
                    label='Số điện thoại'
                    name='customerPhone'
                  >
                    <Input maxLength={10} placeholder='Nhap Số điện thoại'></Input>
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item
                    required
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập trường này',
                      },
                    ]}
                    label='Email'
                    name='customerEmail'
                  >
                    <Input placeholder='Nhap Email'></Input>
                  </Form.Item>
                </Col>
                <Col className='checkout-payment'>
                  <Form.Item
                    required
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập trường này',
                      },
                    ]}
                    label='Phương thức thanh toán'
                    name={'paymentMethod'}
                    className='radio'
                    initialValue={'bank'}
                    style={{
                      marginBottom: 20,
                    }}
                  >
                    <Radio.Group buttonStyle='solid'>
                      <Radio.Button value='bank'>Ngân hàng</Radio.Button>
                      <Radio.Button value='momo'>Momo</Radio.Button>
                      <Radio.Button value='vnpay'>VnPay</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Col>

                <Button
                  type='primary'
                  onClick={() => setIsModalVisible(true)}
                  loading={isSubmitting}
                >
                  Xác nhận
                </Button>
              </Form>
            </div>
          </div>
        </div>
        <Modal
          open={isOpenOverlay && params}
          title={'Bạn đã đặt vé thành công, vui lòng mang mã QR này đến quày đặt vé!'}
          onOk={async () => {
            setIsOpenOverlay(false);
            setLoading(true);
            await new Promise((resolve) => {
              setTimeout(() => {
                resolve(navigate('/'));
              }, 1000);
            });
            setLoading(false);
          }}
          footer={
            <div>
              <i>Mọi thông tin chiết tiết bao gồm cả QR đã được gửi vào email của bạn!</i>
            </div>
          }
          onCancel={async () => {
            setIsOpenOverlay(false);
            setLoading(true);
            await new Promise((resolve) => {
              setTimeout(() => {
                resolve(navigate('/'));
              }, 1000);
            });
            setLoading(false);
          }}
          cancelButtonProps={{ style: { display: 'none' } }}
        >
          <div
            className=''
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px',
            }}
            ref={qrRef}
          >
            <QRCode value={params?.ticket_number}></QRCode>
          </div>
        </Modal>
        {/* MODAL CONFIRM */}
        <Modal
          title='Xác nhận'
          open={isModalVisible}
          onOk={() => form.submit()}
          onCancel={handleExit}
        >
          <MovieTicket
            data={{
              ...data,
              ticket: params?.ticket_number,
              customerName: params?.customer_name,
              price: total,
            }}
          ></MovieTicket>
        </Modal>
      </div>
    </Loading>
  );
};

export default CheckOut;
