import { CheckboxOptionType, Radio } from "antd";
import ClockIcon from "../../asset/icon/ClockIcon";
import TimeButton from "../../components/selects/timeSelection/TimeButton";
import "./TimeSelection.scss";

const TimeSelection = (props: {
  timeData: (string | undefined)[];
  timeSelected: any;
  setTimeSelected: any;
}) => {
  const { timeData, timeSelected, setTimeSelected } = props;
  const items: CheckboxOptionType[] = timeData?.map((item) => ({
    value: item ?? "",
    label: (
      <TimeButton isActive={timeSelected === item}>
        {item?.split(" ")[1]}
      </TimeButton>
    ),
  }));
  console.log("timeSelected :>> ", timeSelected);
  return (
    <>
      <div className="showtime-selection time">
        <label htmlFor="time">
          <ClockIcon></ClockIcon>
          <span>Giờ chiếu</span>
        </label>
      </div>
      <div className="showtime-time">
        <Radio.Group
          onChange={(e) => setTimeSelected(e.target.value)}
          options={items}
          value={timeSelected}
        ></Radio.Group>
      </div>
    </>
  );
};
export default TimeSelection;
