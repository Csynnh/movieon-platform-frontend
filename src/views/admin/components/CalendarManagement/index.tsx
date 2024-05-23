import { Button, Col, DatePicker, Form, Modal, Select, Space, Table, TableColumnsType } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import CinemasSelection from '../../../../components/showtime/CinemasSelection';
import DateSelection, { dateData } from '../../../../components/showtime/DateSelection';
import CloseForm from '../../CloseForm';
import { useEffect, useState } from 'react';
import { Cinema, Movie, TheaterType } from '../../../../api/type';
import useTheaters from '../../../../api/listTheaterByCinemaId';
import useCalendars from '../../../../api/listCalendar';
import { convertToDate, convertToIOSDate } from '../../Dashboard';
import useCinemasData from '../../../../api/listCinemasData';
import dayjs from 'dayjs';
import { addCalendar } from '../../../../api/addCalendar';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import { removeCalendar } from '../../../../api/removeCalendar';
import useMoviesData from '../../../../api/listMoviesData';

export const CalendarManagement = () => {
  const [listCinema, setListCinema] = useState<Cinema[]>([]);
  const [cinemaSelected, setCinemaSelected] = useState<string>();
  const [dateSelected, setDateSelected] = useState(dateData[0].value);
  const [selectedCalendar, setSelectedCalendar] = useState<any>();
  const [dialogOpened, setDialogOpened] = useState(false);
  const [submiting, setSubmiting] = useState<boolean>(false);
  const [movieOptions, setMovieOptions] = useState<any[]>([]);
  const cinemaData: Cinema[] = useCinemasData();
  const dataMovie = useMoviesData();

  const [openFormWithAction, setOpenFormWithAction] = useState<any>({
    open: false,
    action: '',
  });
  const {
    data: theaterData,
    isLoading: isLoadingTheater,
    refetch: refetchListTheaterData,
  } = useTheaters(cinemaSelected);
  const {
    data: calendarData,
    refetch,
    isLoading,
  } = useCalendars({
    cinemaId: cinemaSelected,
    date: convertToDate(dateSelected),
  });
  useEffect(() => {
    if (cinemaSelected) {
      refetch();
      refetchListTheaterData();
    }
  }, [cinemaSelected]);

  const [form] = Form.useForm();
  const handleSelectCinema = (event: any) => {
    event && setCinemaSelected(event);
  };
  useEffect(() => {
    if (cinemaData) {
      setListCinema(cinemaData);
      setCinemaSelected(cinemaData[0]?._id);
    }
  }, [cinemaData?.length]);
  useEffect(() => {
    if (dataMovie) {
      const movies = dataMovie.map((item) => ({
        ...item,
        released: new Date(item.released).toLocaleDateString(),
      }));
      setMovieOptions(
        movies?.map((item) => ({
          value: item?._id,
          label: item?.title,
        })),
      );
    }
  }, [dataMovie.length]);
  const columns: TableColumnsType<any> = [
    {
      title: 'Movie name',
      width: 100,
      dataIndex: 'movie',
      key: 'name',
      fixed: 'left',
      render: (movie: Movie) => <span>{movie?.title}</span>,
      sorter: true,
    },
    {
      title: 'Theater',
      width: 100,
      dataIndex: 'theater',
      key: 'theater',
      render: (theater: TheaterType) => <span>{theater?.name}</span>,
      sorter: true,
    },
    {
      title: 'Show time',
      width: 100,
      dataIndex: 'showTime',
      key: 'showTime',
      render: (time: string) => <span>{dayjs(time).format('DD/MM/YYYY HH:mm')}</span>,
      sorter: true,
    },
    {
      title: (
        <Button
          disabled={isLoadingTheater || isLoading || !cinemaData?.length}
          className='dashboard-action-btn'
          type='primary'
          onClick={() => {
            form.resetFields(['movieId', 'theaterId', 'showTime']);
            setSelectedCalendar(null);
            setOpenFormWithAction({ open: true, action: 'add' });
          }}
        >
          Add
        </Button>
      ),
      width: 50,
      align: 'center',
      key: 'action',
      className: 'dashboard-action',
      render: (_: any, record: any) => (
        <Button
          className='dashboard-action-btn'
          onClick={() => {
            handleEditCalendar(record);
            setSelectedCalendar(record);
          }}
        >
          Edit
        </Button>
      ),
    },
  ];
  const handleSubmitForm = async (values: any) => {
    setSubmiting(true);
    if (!selectedCalendar?._id) {
      try {
        const res: any = await addCalendar(
          convertToIOSDate(values.showTime),
          values.movieId,
          values.theaterId,
        );
        if (res?._id) {
          Toastify({
            text: `Thêm lịch chiếu thành công`,
            duration: 3000,
            style: {
              background: 'linear-gradient(to right, #00b09b, #96c93d)',
            },
          }).showToast();
          setOpenFormWithAction({
            open: false,
            action: '',
          });
          refetch();
        }
      } catch (error) {
        //
      }
    } else {
      try {
        const res: any = await addCalendar(
          convertToIOSDate(values.showTime),
          values.movieId,
          values.theaterId,
          selectedCalendar?._id,
        );
        if (res?._id) {
          refetch();
          Toastify({
            text: `Cập nhật lịch chiếu thành công`,
            duration: 3000,
            style: {
              background: 'linear-gradient(to right, #00b09b, #96c93d)',
            },
          }).showToast();

          setOpenFormWithAction({
            open: false,
            action: '',
          });
        }
      } catch (error) {
        //
      }
    }
    form.resetFields(['movieId', 'theaterId', 'showTime']);
    setOpenFormWithAction({
      open: false,
      action: '',
    });
    setSubmiting(false);
  };
  const handleRemoveCalendar = async () => {
    setSubmiting(true);
    const res: any = await removeCalendar(selectedCalendar?._id);
    if (res?.status === 204) {
      Toastify({
        text: `Xóa lịch chiếu thành công`,
        duration: 3000,
        style: {
          background: 'linear-gradient(to right, #d7e200, #b6a842)',
        },
      }).showToast();
      refetch();
    } else {
      Toastify({
        text: `Xóa lịch chiếu thất bại`,
        duration: 3000,
        style: {
          background: 'linear-gradient(to right, #ff416c, #ff4b2b)',
        },
      }).showToast();
    }
    setOpenFormWithAction({
      open: false,
      action: '',
    });
    setDialogOpened(false);
    setSubmiting(false);
    form.resetFields(['movieId', 'theaterId', 'showTime']);
  };
  const handleEditCalendar = async (calendar: any) => {
    form.setFieldsValue({
      movieId: calendar?.movie?._id,
      theaterId: calendar?.theater?._id,
      showTime: dayjs(calendar?.showTime),
    });
    setOpenFormWithAction({ open: true, action: 'edit' });
  };
  const handleChangeOpenForm = () => {
    setOpenFormWithAction({
      open: false,
      action: '',
    });
    form.resetFields(['movieId', 'theaterId', 'showTime']);
  };
  const disabledDate = (current: any) => {
    return current && (current < dayjs().add(-1, 'day') || current > dayjs().add(30, 'day'));
  };
  return (
    <div className='dashboard-right'>
      <div className='dashboard-container'>
        <CinemasSelection
          cinemas={listCinema}
          handleSelect={handleSelectCinema}
          value={cinemaSelected}
        ></CinemasSelection>
        <DateSelection
          dateSelected={dateSelected}
          setDateSelected={setDateSelected}
        ></DateSelection>
      </div>
      <div className={`dashboard-wrapper ${openFormWithAction?.open ? 'open-form' : ''}`}>
        <Table
          loading={isLoadingTheater || isLoading || submiting}
          columns={columns}
          dataSource={calendarData}
          // scroll={{ x: 767 }}
          bordered
        />
        {openFormWithAction?.open && (
          <div className='dashboard-form'>
            <div className='dashboard-form-container'>
              <Form form={form} onFinish={handleSubmitForm}>
                <CloseForm handle={handleChangeOpenForm}></CloseForm>
                <div className='dashboard-form-title'>
                  <p>Thêm lịch chiếu</p>
                </div>
                <div className='dashboard-form-input'>
                  <div className='dashboard-field'>
                    <Col>
                      <Form.Item name={'movieId'} label={'Tên phim'}>
                        <Select options={movieOptions}></Select>
                      </Form.Item>
                    </Col>
                  </div>
                  <div className='dashboard-field'>
                    <Col>
                      <Form.Item name={'theaterId'} label={'Phòng chiếu'}>
                        <Select
                          options={theaterData?.map((item) => ({
                            value: item?._id,
                            label: item?.name,
                          }))}
                        ></Select>
                      </Form.Item>
                    </Col>
                  </div>
                  <div className='dashboard-field'>
                    <Col>
                      <Form.Item
                        name={'showTime'}
                        label={'Lịch chiếu'}
                        rules={[
                          {
                            required: true,
                            message: 'Vui lý nhap thoi gian chieu phim',
                          },
                        ]}
                      >
                        <DatePicker
                          format='YYYY-MM-DD HH:mm'
                          showTime
                          disabledDate={disabledDate}
                        ></DatePicker>
                      </Form.Item>
                    </Col>
                  </div>
                </div>
                <Space.Compact style={{ width: '100%' }}>
                  <Button loading={submiting} disabled={submiting} type='primary' htmlType='submit'>
                    Submit
                  </Button>
                  {openFormWithAction?.action === 'edit' && (
                    <Button
                      danger
                      style={{
                        width: '25%',
                      }}
                      loading={submiting}
                      disabled={submiting}
                      type='text'
                      onClick={() => !dialogOpened && setDialogOpened(true)}
                    >
                      <DeleteOutlined />
                    </Button>
                  )}
                </Space.Compact>
              </Form>
            </div>
          </div>
        )}
      </div>
      <Modal
        title='Remove calendar'
        open={dialogOpened}
        onOk={handleRemoveCalendar}
        onCancel={() => setDialogOpened(false)}
      >
        <p
          style={{
            fontStyle: 'italic',
            textAlign: 'center',
          }}
        >
          Bạn có chắc chắn muốn xóa lịch chiếu <strong>{selectedCalendar?.movie?.title}</strong> tại{' '}
          <strong>
            {selectedCalendar?.theater?.name} - {selectedCalendar?.theater?.cinema?.name}
          </strong>{' '}
          vào lúc <strong>{dayjs(selectedCalendar?.showTime).format('DD/MM/YYYY HH:mm')}</strong>?
        </p>
      </Modal>
    </div>
  );
};
