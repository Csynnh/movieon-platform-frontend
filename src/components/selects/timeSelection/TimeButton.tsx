import { Button } from "antd";
import "./style.scss";

const TimeButton = (props: { children: any; isActive?: boolean }) => {
  return (
    <Button type={`${props?.isActive ? "primary" : "default"}`} color="#0B2447">
      {props?.children}
    </Button>
  );
};

export default TimeButton;
