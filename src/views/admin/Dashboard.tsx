import { Button } from "@hilla/react-components/Button";
import { ComboBox } from "@hilla/react-components/ComboBox";
import { ConfirmDialog } from "@hilla/react-components/ConfirmDialog";
import { DateTimePicker } from "@hilla/react-components/DateTimePicker";
import { Grid } from "@hilla/react-components/Grid.js";
import { GridColumn } from "@hilla/react-components/GridColumn";
import { GridSortColumn } from "@hilla/react-components/GridSortColumn";
import { Icon } from "@hilla/react-components/Icon";
import { TextField } from "@hilla/react-components/TextField";
import { VerticalLayout } from "@hilla/react-components/VerticalLayout";
import { yupResolver } from "@hookform/resolvers/yup";
import { addCalendar } from "../../api/addCalendar";
import getTenant from "../../api/getTenant";
import useCalendars from "../../api/listCalendar";
import listCinemasData from "../../api/listCinemasData";
import useMoviesData from "../../api/listMoviesData";
import useTheaters from "../../api/listTheaterByCinemaId";
import { removeCalendar } from "../../api/removeCalendar";
import { Cinema, TenantType } from "../../api/type";
import EditIcon from "../../asset/icon/EditIcon";
import TrashIcon from "../../asset/icon/TrashIcon";
import Loading from "../../components/loading/Loading";
import CinemasSelection from "../../components/showtime/CinemasSelection";
import DateSelection, {
  dateData,
} from "../../components/showtime/DateSelection";
import { add, format, isBefore } from "date-fns";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import * as yup from "yup";
import CloseForm from "./CloseForm";
import "./Dashboard.scss";
import DashboardAdd from "./DashboardAdd";
import Tenant from "./Tenant";
const schema = yup.object({
  movieId: yup.string().required("Movie name is required"),
  theaterId: yup.string().required("Theater is required"),
  showTime: yup.string().required("Show time is required"),
});
export const convertToDate = (date: string) => {
  const [day, month, year] = date.split("/");
  const result = new Date(`${year}-${month}-${day}`);
  return result;
};
const Dashboard = () => {
  const [tenant, setTenant] = useState<TenantType>();
  const [movieData, setMovieData] = useState<any[]>([]);
  const [cinemaSelected, setCinemaSelected] = useState<string>();
  const [listCinema, setListCinema] = useState<Cinema[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [submiting, setSubmiting] = useState<boolean>(false);
  const [dateSelected, setDateSelected] = useState(dateData[0].value);
  const [dialogOpened, setDialogOpened] = useState(false);
  const [selectedCalendar, setSelectedCalendar] = useState<any>();
  const [errorDate, setErrorDate] = useState<string>("");
  const [minDate] = useState(new Date());
  const tenantInLocal = localStorage.getItem("tenant");
  const cinemaData: Cinema[] = listCinemasData();
  const data = useMoviesData();
  useEffect(() => {
    if (cinemaData) {
      setListCinema(cinemaData);
      setCinemaSelected(cinemaData[0]?.cinemaId);
    }
  }, [cinemaData?.length]);

  const [filteredItems, setFilteredItems] = useState<any[]>([]);
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
    reset({
      movieId: "",
      theaterId: "",
      showTime: "",
    });
    refetch();
    refetchListTheaterData();
  }, [cinemaSelected]);
  useEffect(() => {
    calendarData && setFilteredItems(calendarData);
  }, [calendarData]);
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handleSelectCinema = (event: any) => {
    event.detail?.value && setCinemaSelected(event.detail?.value?.cinemaId);
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
      setMovieData(movies);
    }
  }, [data.length]);

  const handleChangeOpenForm = () => {
    setOpenForm(!openForm);
  };
  const handleSubmitForm = async (values: any) => {
    setSubmiting(true);
    if (!values.calendarId) {
      const res: any = await addCalendar(
        values.showTime,
        values.movieId,
        values.theaterId
      );
      if (res?.calendarId) {
        Toastify({
          text: `Thêm lịch chiếu thành công`,
          duration: 3000,
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
        }).showToast();
        reset({
          movieId: "",
          theaterId: "",
          showTime: "",
        });
        setOpenForm(false);
        refetch();
      }
    } else {
      const res: any = await addCalendar(
        values.showTime,
        values.movieId,
        values.theaterId,
        values.calendarId
      );
      if (res?.calendarId) {
        refetch();
        Toastify({
          text: `Cập nhật lịch chiếu thành công`,
          duration: 3000,
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
        }).showToast();

        reset({
          movieId: "",
          theaterId: "",
          showTime: "",
          calendarId: "",
        });
        setOpenForm(false);
      }
    }
    setSubmiting(false);
  };
  const handleRemoveCalendar = async (calendarId: any) => {
    const res: any = await removeCalendar(calendarId);
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
    const [day, month, year] = dateSelected.split("/");
    const timeS = new Date(`${month}/${parseInt(day) + 1}/${year}`);
    const [hours, minutes, seconds] = calendar.showTime.split(":");
    timeS.setHours(Number(hours) - 17);
    timeS.setMinutes(Number(minutes));
    timeS.setSeconds(Number(seconds));

    await setValue("calendarId", calendar?.calendarId);
    await setValue("movieId", calendar.movie?.movieId);
    await setValue("theaterId", calendar.theater?.theaterId);
    await setValue("showTime", timeS?.toISOString()?.slice(0, 16));

    setOpenForm(true);
  };

  return (
    <Loading
      spinning={
        !tenant || !listCinema || isLoadingTheater || isLoading || submiting
      }
    >
      <VerticalLayout theme="spacing" className="dashboard">
        <div className="dashboard-search">
          <div className="dashboard-admin">
            <Tenant tenantData={tenant}></Tenant>
            <div className="dashboard-admin-info">
              <h4>Admin</h4>
              <span>{tenant?.username}</span>
            </div>
          </div>
          <TextField
            placeholder="Search"
            onValueChanged={(e) => {
              const searchTerm = (e.detail.value || "").trim().toLowerCase();
              setFilteredItems(
                calendarData
                  ? calendarData?.filter(
                      ({ movie, theater, showTime }) =>
                        !searchTerm ||
                        movie.imdbId
                          ?.toString()
                          ?.toLowerCase()
                          ?.includes(searchTerm) ||
                        movie.title?.toLowerCase()?.includes(searchTerm) ||
                        theater.name?.toLowerCase()?.includes(searchTerm) ||
                        showTime?.includes(searchTerm)
                    )
                  : []
              );
            }}
          >
            <Icon slot="suffix" icon="vaadin:search"></Icon>
          </TextField>
        </div>
        <div className="dashboard-container">
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
        <div
          className="dashboard-wrapper"
          style={{
            gridTemplateColumns: !openForm ? "12fr 0fr" : "9fr 3fr",
          }}
        >
          <Grid items={filteredItems}>
            <GridSortColumn
              path="movie.imdbId"
              header={"ID"}
              footerRenderer={() => (
                <span>{filteredItems?.length} total Movie</span>
              )}
            />
            <GridSortColumn path="movie.title" header={"Tên Phim"} />
            <GridSortColumn path="showTime" header={"Suất chiếu"} />
            <GridSortColumn path="theater.name" header={"Phòng chiếu"} />
            <GridColumn
              frozenToEnd
              autoWidth
              flexGrow={0}
              path="movie"
              headerRenderer={() => (
                <DashboardAdd handle={handleChangeOpenForm}></DashboardAdd>
              )}
            >
              {(record) => (
                <div className="dashboard-actions">
                  <Button
                    theme="tertiary-inline"
                    onClick={() => {
                      !dialogOpened && setDialogOpened(true);
                      setSelectedCalendar(record.item?.calendarId);
                    }}
                  >
                    <TrashIcon />
                  </Button>
                  <Button
                    theme="tertiary-inline"
                    onClick={() => {
                      handleEditCalendar(record.item);
                    }}
                  >
                    <EditIcon />
                  </Button>
                </div>
              )}
            </GridColumn>
          </Grid>
          {openForm && (
            <div className="dashboard-form">
              <div className="dashboard-form-container">
                <CloseForm handle={handleChangeOpenForm}></CloseForm>
                <div className="dashboard-form-title">
                  <p>Thêm lịch chiếu</p>
                </div>
                <div className="dashboard-form-input">
                  <div className="dashboard-field">
                    <ComboBox
                      {...register("movieId")}
                      label="Tên phim"
                      itemLabelPath="title"
                      itemValuePath="movieId"
                      items={movieData}
                    />
                    {errors?.movieId && <p>{errors?.movieId?.message}</p>}
                  </div>
                  <div className="dashboard-field">
                    <ComboBox
                      {...register("theaterId")}
                      label="Phòng chiếu"
                      itemLabelPath="name"
                      itemValuePath="theaterId"
                      items={theaterData}
                    />
                    {errors?.theaterId && <p>{errors?.theaterId?.message}</p>}
                  </div>
                  <div className="dashboard-field">
                    <DateTimePicker
                      {...register("showTime")}
                      label="Lịch chiếu "
                      datePlaceholder="Date"
                      timePlaceholder="Time"
                      step={60 * 20}
                      min={format(
                        add(new Date(), { minutes: 5 }),
                        "yyyy-MM-dd'T'HH:mm"
                      )}
                      autoOpenDisabled
                      value={format(
                        add(new Date(), { minutes: 30 }),
                        "yyyy-MM-dd'T'HH:mm"
                      )}
                      errorMessage={errorDate}
                      onValueChanged={({ detail: { value: newValue } }) => {
                        const date = newValue ?? "";
                        setValue(date);
                        if (isBefore(date, minDate)) {
                          setErrorDate(
                            "Too early, choose another date and time"
                          );
                        } else {
                          setErrorDate("");
                        }
                      }}
                    />
                    {errors?.showTime && <p>{errors?.showTime?.message}</p>}
                  </div>
                </div>
                <Button onClick={handleSubmit(handleSubmitForm)}>Thêm</Button>
              </div>
            </div>
          )}
        </div>
        <ConfirmDialog
          header='Delete "Report Q4"?'
          cancelButtonVisible
          confirmText="Delete"
          confirmTheme="error primary"
          opened={dialogOpened}
          onCancel={() => {
            setDialogOpened(false);
          }}
          onConfirm={() => {
            handleRemoveCalendar(selectedCalendar);
            setDialogOpened(false);
          }}
        >
          Are you sure you want to permanently delete this item?
        </ConfirmDialog>
      </VerticalLayout>
    </Loading>
  );
};

export default Dashboard;
