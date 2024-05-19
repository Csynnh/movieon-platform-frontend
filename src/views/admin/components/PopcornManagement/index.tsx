import { useEffect, useState } from "react";
import CinemasSelection from "@/components/showtime/CinemasSelection";
import { Cinema } from "@/api/type";
import useCinemasData from "@/api/listCinemasData";
import PopcornComponent from "./PopcornComponent";
import "./styles.scss";
import { Button } from "antd";
import PlusIcon from "@/asset/icon/PlusIcon";
const PopcornManagement = () => {
  const [listCinemaWithAction, setListCinemaWithAction] = useState<Cinema[]>(
    []
  );
  const cinemaData: Cinema[] = useCinemasData();
  const [cinemaSelected, setCinemaSelected] = useState<string>();
  const handleSelectCinema = (event: any) => {
    event.detail?.value && setCinemaSelected(event.detail?.value?._id);
  };

  useEffect(() => {
    if (cinemaData) {
      setListCinemaWithAction(cinemaData);
      setCinemaSelected(cinemaData[0]?._id);
    }
  }, [cinemaData]);
  return (
    <div className="dashboard-right popcorn-header">
      <div className="dashboard-container">
        <CinemasSelection
          cinemas={listCinemaWithAction}
          handleSelect={handleSelectCinema}
          value={cinemaSelected}
        ></CinemasSelection>
        <Button className="popcorn-add-btn">
          Thêm bắp nước
          <PlusIcon />
        </Button>
      </div>
      <div className={`dashboard-popcorn-warrper `}>
        <PopcornComponent />
        <PopcornComponent />
        <PopcornComponent />
        <PopcornComponent />
        <PopcornComponent isForm />
      </div>
    </div>
  );
};

export default PopcornManagement;
