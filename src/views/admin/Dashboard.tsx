import {
  Button,
  Col,
  DatePicker,
  Form,
  Layout,
  Modal,
  Select,
  Space,
  Table,
  TableColumnsType,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { addCalendar } from "../../api/addCalendar";
import getTenant from "../../api/getTenant";
import useCalendars from "../../api/listCalendar";
import listCinemasData from "../../api/listCinemasData";
import useMoviesData from "../../api/listMoviesData";
import useTheaters from "../../api/listTheaterByCinemaId";
import { removeCalendar } from "../../api/removeCalendar";
import { Cinema, Movie, TenantType, TheaterType } from "../../api/type";
import Search from "../../components/header/components/Search/Search";
import CinemasSelection from "../../components/showtime/CinemasSelection";
import DateSelection, {
  dateData,
} from "../../components/showtime/DateSelection";
import CloseForm from "./CloseForm";
import "./Dashboard.scss";
import Tenant from "./Tenant";
import { DeleteOutlined } from "@ant-design/icons";
import Logo from "../../components/logo/Logo";
import { NavLink } from "react-router-dom";

export const convertToDate = (date: string) => {
  const [day, month, year] = date.split("/");
  const result = `${year}/${month}/${day} 00:00:00`;
  return result;
};
const convertToIOSDate = (date: string) => {
  return dayjs(date).format("YYYY/MM/DD HH:mm:ss");
};
const Dashboard = () => {
  const [tenant, setTenant] = useState<TenantType>();
  const [movieOptions, setMovieOptions] = useState<any[]>([]);
  const [cinemaSelected, setCinemaSelected] = useState<string>();
  const [listCinemaWithAction, setListCinema] = useState<Cinema[]>([]);
  const [openFormWithAction, setOpenFormWithAction] = useState<any>({
    open: false,
    action: "",
  });
  const [submiting, setSubmiting] = useState<boolean>(false);
  const [dateSelected, setDateSelected] = useState(dateData[0].value);
  const [selectedCalendar, setSelectedCalendar] = useState<any>();
  const [dialogOpened, setDialogOpened] = useState(false);
  const tenantInLocal = localStorage.getItem("tenant");
  const cinemaData: Cinema[] = listCinemasData();
  const data = useMoviesData();
  useEffect(() => {
    if (cinemaData) {
      setListCinema(cinemaData);
      setCinemaSelected(cinemaData[0]?._id);
    }
  }, [cinemaData?.length]);

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
    refetch();
    refetchListTheaterData();
  }, [cinemaSelected]);
  const [form] = Form.useForm();
  const handleSelectCinema = (event: any) => {
    event.detail?.value && setCinemaSelected(event.detail?.value?._id);
  };
  const tenantData = tenantInLocal
    ? getTenant(JSON.parse(tenantInLocal).username)
    : undefined;
  useEffect(() => {
    tenantData && setTenant(tenantData);
  }, [tenantData]);
  useEffect(() => {
    if (data) {
      const movies = data.map((item) => ({
        ...item,
        released: new Date(item.released).toLocaleDateString(),
      }));
      setMovieOptions(
        movies?.map((item) => ({
          value: item?._id,
          label: item?.title,
        }))
      );
    }
  }, [data.length]);

  const handleChangeOpenForm = () => {
    setOpenFormWithAction({
      open: false,
      action: "",
    });
  };
  const handleSubmitForm = async (values: any) => {
    setSubmiting(true);
    if (!values.calendarId) {
      const res: any = await addCalendar(
        convertToIOSDate(values.showTime),
        values.movieId,
        values.theaterId
      );
      if (res?._id) {
        Toastify({
          text: `Thêm lịch chiếu thành công`,
          duration: 3000,
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
        }).showToast();
        setOpenFormWithAction({
          open: false,
          action: "",
        });
        refetch();
      }
    } else {
      const res: any = await addCalendar(
        convertToIOSDate(values.showTime),
        values.movieId,
        values.theaterId,
        values.calendarId
      );
      if (res?._id) {
        refetch();
        Toastify({
          text: `Cập nhật lịch chiếu thành công`,
          duration: 3000,
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
        }).showToast();

        setOpenFormWithAction({
          open: false,
          action: "",
        });
      }
    }
    setSubmiting(false);
  };
  const handleRemoveCalendar = async () => {
    const res: any = await removeCalendar(selectedCalendar?.calendarId);
    if (res?.status === 204) {
      Toastify({
        text: `Xóa lịch chiếu thành công`,
        duration: 3000,
        style: {
          background: "linear-gradient(to right, #d7e200, #b6a842)",
        },
      }).showToast();
      refetch();
    } else {
      Toastify({
        text: `Xóa lịch chiếu thất bại`,
        duration: 3000,
        style: {
          background: "linear-gradient(to right, #ff416c, #ff4b2b)",
        },
      }).showToast();
    }
    !dialogOpened && setDialogOpened(true);
  };
  const handleEditCalendar = async (calendar: any) => {
    form.setFieldsValue({
      movieId: calendar?.movie?._id,
      theaterId: calendar?.theater?._id,
      showTime: dayjs(calendar?.showTime),
    });
    setOpenFormWithAction({ open: true, action: "edit" });
  };
  const disabledDate = (current: any) => {
    return current && (current < dayjs() || current > dayjs().add(30, "day"));
  };

  const columns: TableColumnsType<any> = [
    {
      title: "Movie name",
      width: 100,
      dataIndex: "movie",
      key: "name",
      fixed: "left",
      render: (movie: Movie) => <span>{movie?.title}</span>,
      sorter: true,
    },
    {
      title: "Theater",
      width: 100,
      dataIndex: "theater",
      key: "theater",
      render: (theater: TheaterType) => <span>{theater?.name}</span>,
      sorter: true,
    },
    {
      title: "Show time",
      width: 100,
      dataIndex: "showTime",
      key: "showTime",
      render: (time: string) => (
        <span>{dayjs(time).format("DD/MM/YYYY HH:mm")}</span>
      ),
      sorter: true,
    },
    {
      title: (
        <Button
          disabled={isLoadingTheater || isLoading || !cinemaData?.length}
          className="dashboard-action-btn"
          type="primary"
          onClick={() => {
            setOpenFormWithAction({ open: true, action: "add" });
          }}
        >
          Add
        </Button>
      ),
      width: 50,
      align: "center",
      key: "action",
      className: "dashboard-action",
      render: (_: any, record: any) => (
        <Button
          className="dashboard-action-btn"
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

  return (
    <Layout className="dashboard">
      <div className="dashboard-search">
        <div className="dashboard-logo">
          <Logo></Logo>
        </div>
        <Search></Search>
      </div>
      <div className="dashboard-wrap">
        <div className="dashboard-left">
          <div className="dashboard-admin">
            <Tenant tenantData={tenant}></Tenant>
            <div className="dashboard-admin-info">
              <h4>Admin</h4>
              <span>{tenant?.username}</span>
            </div>
          </div>
          <div className="dashboard-menu">
            <ul>
              <li>
                <div className="dashboard-menu-wrap">
                  <a href="#">Lịch chiếu</a>
                </div>
              </li>
              <li>
                <div className="dashboard-menu-wrap">
                  <a href="/admin/addpopcorn">Bắp nước</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="dashboard-right">
          <div className="dashboard-container">
            <CinemasSelection
              cinemas={listCinemaWithAction}
              handleSelect={handleSelectCinema}
              value={cinemaSelected}
            ></CinemasSelection>
            <DateSelection
              dateSelected={dateSelected}
              setDateSelected={setDateSelected}
            ></DateSelection>
          </div>
          <div
            className={`dashboard-wrapper ${
              openFormWithAction?.open ? "open-form" : ""
            }`}
          >
            <Table
              loading={isLoadingTheater || isLoading}
              columns={columns}
              dataSource={calendarData}
              // scroll={{ x: 767 }}
              bordered
            />
            {openFormWithAction?.open && (
              <div className="dashboard-form">
                <div className="dashboard-form-container">
                  <Form form={form} onFinish={handleSubmitForm}>
                    <CloseForm handle={handleChangeOpenForm}></CloseForm>
                    <div className="dashboard-form-title">
                      <p>Thêm lịch chiếu</p>
                    </div>
                    <div className="dashboard-form-input">
                      <div className="dashboard-field">
                        <Col>
                          <Form.Item name={"movieId"} label={"Tên phim"}>
                            <Select options={movieOptions}></Select>
                          </Form.Item>
                        </Col>
                      </div>
                      <div className="dashboard-field">
                        <Col>
                          <Form.Item name={"theaterId"} label={"Phòng chiếu"}>
                            <Select
                              options={theaterData?.map((item) => ({
                                value: item?._id,
                                label: item?.name,
                              }))}
                            ></Select>
                          </Form.Item>
                        </Col>
                      </div>
                      <div className="dashboard-field">
                        <Col>
                          <Form.Item
                            name={"showTime"}
                            label={"Lịch chiếu"}
                            rules={[
                              {
                                required: true,
                                message: "Vui lý nhap thoi gian chieu phim",
                              },
                            ]}
                          >
                            <DatePicker
                              format="YYYY-MM-DD HH:mm"
                              showTime
                              disabledDate={disabledDate}
                            ></DatePicker>
                          </Form.Item>
                        </Col>
                      </div>
                    </div>
                    <Space.Compact style={{ width: "100%" }}>
                      <Button
                        loading={submiting}
                        disabled={submiting}
                        type="primary"
                        htmlType="submit"
                      >
                        Submit
                      </Button>
                      {openFormWithAction?.action === "edit" && (
                        <Button
                          danger
                          style={{
                            width: "25%",
                          }}
                          loading={submiting}
                          disabled={submiting}
                          type="text"
                          htmlType="submit"
                          onClick={handleRemoveCalendar}
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
            title="Remove calendar"
            // open={isModalOpen}
            // onOk={handleOk}
            // onCancel={handleCancel}
          >
            <p>Some contents...</p>
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
