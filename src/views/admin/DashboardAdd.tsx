import { Button } from "antd";
import { FC } from "react";

const DashboardAdd: FC<any> = ({ handle }) => {
  return (
    <Button className="dashboard-add" onClick={handle}>
      Add
    </Button>
  );
};

export default DashboardAdd;
