import { ComboBox } from "@hilla/react-components/ComboBox.js";
import { Cinema } from "../../api/type";
import LocaIcon from "../../asset/icon/LocaIcon";
import "./CinemasSelection.scss";
const CinemasSelection = (props?: {
  cinemas: Cinema[];
  handleSelect?: any;
  value?: string;
}) => {
  return (
    <div className={"showtime-selection"}>
      <label htmlFor="cinemas">
        <LocaIcon></LocaIcon>
        <span>Rạp Chiếu</span>
      </label>
      <ComboBox
        id={"cinemas"}
        itemLabelPath="name"
        itemValuePath="cinemaId"
        onSelectedItemChanged={props?.handleSelect}
        items={props?.cinemas}
        value={props?.value}
      />
    </div>
  );
};

export default CinemasSelection;
