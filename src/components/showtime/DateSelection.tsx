import { Radio } from "antd";
import Calendaricon from "../../asset/icon/Calendaricon";
import "./DateSelection.scss";
export const dateData = Array.from({ length: 7 }, (_, index) => {
  const date = new Date();
  date.setDate(new Date().getDate() + index);

  const formattedDate = date.toLocaleDateString("vi-VI", {
    weekday: "long",
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
  const [weekday, day] = formattedDate.split(", ");

  return {
    label: {
      weekday,
    },
    value: day,
  };
});
const DateSelection = (props: { dateSelected: any; setDateSelected: any }) => {
  const { dateSelected, setDateSelected } = props;

  return (
    <>
      <div className="showtime-selection">
        <label htmlFor="date">
          <Calendaricon></Calendaricon>
        </label>
        <div className="showtime-date">
          <Radio.Group
            defaultValue={dateSelected}
            buttonStyle="solid"
            options={dateData?.map((item) => ({
              label: (
                <p
                  className={`${item.value === dateSelected ? "checked" : ""}`}
                >
                  <span className="day">{item.label.weekday}</span>
                  <br />
                  <span>{item.value}</span>
                </p>
              ),
              value: item.value,
            }))}
            onChange={(e) => {
              setDateSelected(e.target.value);
            }}
          ></Radio.Group>
        </div>
      </div>
    </>
  );
};
export default DateSelection;
