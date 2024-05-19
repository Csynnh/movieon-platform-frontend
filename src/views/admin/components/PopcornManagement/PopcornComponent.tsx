import comboPoster from "@/asset/image/combo-poster.png";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, InputNumber } from "antd";
type PopcornComponentProps = {
  isForm?: boolean;
};
const PopcornComponent = ({ isForm }: PopcornComponentProps) => {
  return (
    <div className={`popcorn ${isForm ? "form" : ""}`}>
      <Form>
        <Card
          cover={<img alt="example" src={comboPoster} />}
          actions={
            isForm
              ? [
                  <Button type="primary" className="add-btn" key={"add"}>
                    Thêm
                  </Button>,
                ]
              : [<EditOutlined key="edit" />, <DeleteOutlined key="delete" />]
          }
          title={
            isForm ? (
              <Col span={24}>
                <Form.Item name={"name"}>
                  <Input placeholder="Tên combo"></Input>
                </Form.Item>
              </Col>
            ) : (
              "Combo gia đình"
            )
          }
        >
          <div className="popcorn-wrap">
            <p className="popcorn-title">Giá:</p>{" "}
            <p className={`popcorn-value ${isForm ? "input" : ""}`}>
              {isForm ? (
                <Col span={18}>
                  <Form.Item name={"price"}>
                    <InputNumber placeholder="Giá"></InputNumber>
                  </Form.Item>
                </Col>
              ) : (
                <>50.000</>
              )}
              <span className="popcorn-unit">VND</span>
            </p>
          </div>
          <div className="popcorn-wrap">
            <p className="popcorn-title">Giảm giá:</p>{" "}
            <p className={`popcorn-value ${isForm ? "input" : ""}`}>
              {isForm ? (
                <Col span={18}>
                  <Form.Item name={"discount"}>
                    <InputNumber placeholder="Giảm giá"></InputNumber>
                  </Form.Item>
                </Col>
              ) : (
                <>10</>
              )}
              <span className="popcorn-unit">%</span>
            </p>
          </div>
          <div className="popcorn-wrap">
            <p className="popcorn-title">Mô tả:</p>{" "}
            <p className={`popcorn-value ${isForm ? "input" : ""}`}>
              {isForm ? (
                <Col span={18}>
                  <Form.Item name={"description"} className="popcorn-textarea">
                    <Input.TextArea placeholder="Mô tả"></Input.TextArea>
                  </Form.Item>
                </Col>
              ) : (
                "1 bắp + 1 nước"
              )}
            </p>
          </div>
        </Card>
      </Form>
    </div>
  );
};

export default PopcornComponent;
