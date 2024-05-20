import { ComboFormType } from "@/api/type";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
type PopcornComponentProps = {
  data?: ComboFormType;
  onEdit: (data?: ComboFormType) => void;
  onDelete: (data?: ComboFormType) => void;
};
const PopcornComponent = ({
  data,
  onEdit,
  onDelete,
}: PopcornComponentProps) => {
  if (!data) return null;
  return (
    <div className={`popcorn`}>
      <Card
        cover={<img alt="example" src={data?.image} />}
        actions={[
          <Button onClick={() => onEdit(data)}>
            <EditOutlined className="popcorn-edit" key="edit" />
            <span className="popcorn-edit">Chỉnh sửa</span>
          </Button>,
          <Button onClick={() => onDelete(data)}>
            <DeleteOutlined className="popcorn-delete" key="delete" />
            <span className="popcorn-delete">Xóa</span>
          </Button>,
        ]}
        title={data?.name}
      >
        <div className="popcorn-wrap">
          <p className="popcorn-title">Giá:</p>{" "}
          <p className={`popcorn-value`}>
            {data?.price}
            <span className="popcorn-unit">VND</span>
          </p>
        </div>
        <div className="popcorn-wrap">
          <p className="popcorn-title">Giảm giá:</p>{" "}
          <p className={`popcorn-value`}>
            {data?.discount}
            <span className="popcorn-unit">%</span>
          </p>
        </div>
        <div className="popcorn-wrap">
          <p className="popcorn-title">Mô tả:</p>{" "}
          <p className={`popcorn-value`}>{data?.description}</p>
        </div>
      </Card>
    </div>
  );
};

export default PopcornComponent;
