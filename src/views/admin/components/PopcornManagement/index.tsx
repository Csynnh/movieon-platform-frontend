import useCinemasData from "@/api/listCinemasData";
import { Cinema } from "@/api/type";
import PlusIcon from "@/asset/icon/PlusIcon";
import CinemasSelection from "@/components/showtime/CinemasSelection";
import { InboxOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, UploadProps, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import Dragger from "antd/es/upload/Dragger";
import AWS from "aws-sdk";
import { useEffect, useState } from "react";
import PopcornComponent from "./PopcornComponent";
import "./styles.scss";
AWS.config.update({
  region: process.env.REACT_APP_AWS_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
});
const s3 = new AWS.S3();

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

  const props: UploadProps = {
    maxCount: 1,
    name: "file",
    beforeUpload: async (file) => {
      const params = {
        Bucket: "movieonplatformbucket",
        Key: file.name,
        Body: file,
      };
      let result: any = null;
      const res: any = s3.upload(params, function (err: any, data: any) {
        if (err) {
          console.error(err);
        }
        result = data;
        message.success("upload successfully.");
      });
      return false;
    },
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };
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
      {/* Modal create a new popcorn */}
      <Modal
        title="Thêm bắp nước"
        open={true}
        onOk={() => {}}
        onCancel={() => {}}
        okText="Thêm"
        cancelText="Hủy"
      >
        <Form className="popcorn-form">
          <Col span={22}>
            <Form.Item name={"image"} label="Hình Ảnh">
              <Dragger {...props} listType="picture">
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single upload. Strictly prohibited from
                  uploading company data or other banned file.
                </p>
              </Dragger>
            </Form.Item>
          </Col>
          <Col span={22}>
            <Form.Item name={"name"} label="Tên Combo">
              <Input></Input>
            </Form.Item>
          </Col>
          <Col span={22}>
            <Form.Item name={"price"} label="Giá">
              <Input type="number"></Input>
            </Form.Item>
          </Col>
          <Col span={22}>
            <Form.Item name={"discount"} label="Giảm Giá">
              <Input type="number"></Input>
            </Form.Item>
          </Col>
          <Col span={22}>
            <Form.Item name={"desc"} label="Mô tả">
              <TextArea></TextArea>
            </Form.Item>
          </Col>
        </Form>
      </Modal>
    </div>
  );
};

export default PopcornManagement;
