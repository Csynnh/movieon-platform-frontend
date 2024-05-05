import { Button } from "@hilla/react-components/Button.js";
import { Icon } from "@hilla/react-components/Icon.js";
import { FC } from "react";

const DashboardAdd: FC<any> = ({ handle }) => {
  return (
    <Button className="dashboard-add" onClick={handle}>
      Add
      <Icon slot="suffix" icon="vaadin:plus"></Icon>
    </Button>
  );
};

export default DashboardAdd;
