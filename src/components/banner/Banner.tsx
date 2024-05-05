import { Button } from "@hilla/react-components/Button";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import "./index.scss";

export interface BannerProps {
  id: number;
  image: string;
  title: string;
  description: string;
}
const Banner: FC<BannerProps> = ({ image, title, description }) => {
  return (
    <div className={"banner"}>
      <div className="banner-container">
        <div className="banner-poster">
          <img src={image} alt="poster" />
        </div>
        <div className="banner-content">
          <h2 className="banner-title">{title}</h2>
          <p className={"banner-detail"}>
            <strong>Thể loại: </strong>
            <span>{description}</span>
          </p>
          <p className={"banner-detail"}>
            <strong>Thể loại: </strong>
            <span>{description}</span>
          </p>
          <p className={"banner-detail"}>
            <strong>Thể loại: </strong>
            <span>{description}</span>
          </p>
          <p className={"banner-detail"}>
            <strong>Thể loại: </strong>
            <span>{description}</span>
          </p>

          <NavLink to={`/movie/${1}`} className={"banner-button"}>
            <Button theme="primary">Xem chi tiết</Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Banner;
