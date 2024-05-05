import { RadioGroup } from "@hilla/react-components/RadioGroup";
import { RadioButton } from "@hilla/react-components/RadioButton";
import ClockIcon from "../../asset/icon/ClockIcon";
import "./TimeSelection.scss";
import TimeButton from "../../components/selects/timeSelection/TimeButton";

const TimeSelection = (props: {
  timeData: (string | undefined)[];
  timeSelected: any;
  setTimeSelected: any;
}) => {
  const { timeData, timeSelected, setTimeSelected } = props;

  return (
    <>
      <div className="showtime-selection time">
        <label htmlFor="time">
          <ClockIcon></ClockIcon>
          <span>Giờ chiếu</span>
        </label>
      </div>
      <div className="showtime-time">
        <RadioGroup value={timeSelected}>
          {timeData?.map((item, index) => {
            return (
              <RadioButton
                value={item}
                key={index}
                onClick={(event: any) => {
                  if (event.currentTarget.value) {
                    setTimeSelected(event.currentTarget.value);
                  }
                }}
              >
                <label slot="label">
                  <TimeButton isActive={timeSelected === item}>
                    {item?.split(":")[0] + ":" + item?.split(":")[1]}
                  </TimeButton>
                </label>
              </RadioButton>
            );
          })}
        </RadioGroup>
      </div>
    </>
  );
};
export default TimeSelection;
