import { Button } from "antd";
import { NavLink } from "react-router-dom";
import "./styles.scss";
export type BannerProps = {
  id: number;
  image: string;
  title: string;
  description: string;
};
const Banner = ({ image, title, description }: BannerProps) => {
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
            <Button type="default">Xem chi tiết</Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Banner;
