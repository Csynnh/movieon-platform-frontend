import comboPoster from "@/asset/image/combo-poster.png";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card } from "antd";
type PopcornComponentProps = {
  isForm?: boolean;
};
const PopcornComponent = ({ isForm }: PopcornComponentProps) => {
  return (
    <div className={`popcorn`}>
      <Card
        cover={<img alt="example" src={comboPoster} />}
        actions={[<EditOutlined key="edit" />, <DeleteOutlined key="delete" />]}
        title={"Combo gia đình"}
      >
        <div className="popcorn-wrap">
          <p className="popcorn-title">Giá:</p>{" "}
          <p className={`popcorn-value`}>
            {<>50.000</>}
            <span className="popcorn-unit">VND</span>
          </p>
        </div>
        <div className="popcorn-wrap">
          <p className="popcorn-title">Giảm giá:</p>{" "}
          <p className={`popcorn-value`}>
            {<>10</>}
            <span className="popcorn-unit">%</span>
          </p>
        </div>
        <div className="popcorn-wrap">
          <p className="popcorn-title">Mô tả:</p>{" "}
          <p className={`popcorn-value`}>{"1 bắp + 1 nước"}</p>
        </div>
      </Card>
    </div>
  );
};

export default PopcornComponent;
