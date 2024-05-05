import { Button } from "@hilla/react-components/Button.js";
import { RadioButton } from "@hilla/react-components/RadioButton";
import { RadioGroup } from "@hilla/react-components/RadioGroup";
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
  const label = (
    <p>
      <span className="day">{weekday}</span>
      <br />
      <span>{day}</span>
    </p>
  );
  return { label, value: day };
});
const DateSelection = (props: { dateSelected: any; setDateSelected: any }) => {
  const { dateSelected, setDateSelected } = props;

  return (
    <>
      <div className="showtime-selection">
        <label htmlFor="date">
          <Calendaricon></Calendaricon>
          <span>Ngày chiếu</span>
        </label>
      </div>
      <div className="showtime-date">
        <RadioGroup value={dateSelected}>
          {dateData?.map((item) => {
            return (
              <RadioButton
                value={item.value}
                key={item.value}
                onClick={(event: any) => {
                  if (event.currentTarget.value) {
                    setDateSelected(event.currentTarget.value);
                  }
                }}
              >
                <label slot="label">
                  <Button
                    theme={dateSelected == item.value ? "primary" : "tertiary"}
                    color="#0B2447"
                  >
                    {item.label}
                  </Button>
                </label>
              </RadioButton>
            );
          })}
        </RadioGroup>
      </div>
    </>
  );
};
export default DateSelection;
