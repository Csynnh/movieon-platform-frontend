import { Select, Skeleton } from "antd";
import { Cinema } from "../../api/type";
import LocaIcon from "../../asset/icon/LocaIcon";
import "./CinemasSelection.scss";
const CinemasSelection = (props?: {
  cinemas: Cinema[];
  handleSelect?: any;
  value?: string;
}) => {
  const items: any = props?.cinemas?.map((item) => ({
    value: item?._id,
    label: item?.name,
  }));
  if (!props?.value) {
    return <Skeleton.Button active={true} size="large" />;
  }
  return (
    <div className={"showtime-selection"}>
      <label htmlFor="cinemas">
        <LocaIcon></LocaIcon>
        <span className="label">Rạp Chiếu</span>
      </label>
      <Select
        defaultValue={props?.value}
        style={{ width: 220 }}
        options={items}
        onChange={props?.handleSelect}
      />
    </div>
  );
};

export default CinemasSelection;
