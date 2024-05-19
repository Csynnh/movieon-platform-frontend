import { useEffect, useState } from "react";
import CinemasSelection from "@/components/showtime/CinemasSelection";
import { Cinema } from "@/api/type";
import useCinemasData from "@/api/listCinemasData";
import PopcornComponent from "./PopcornComponent";
import "./styles.scss";
import { Button, Col, Form, Input, Modal, UploadProps, message } from "antd";
import PlusIcon from "@/asset/icon/PlusIcon";
import TextArea from "antd/es/input/TextArea";
import Dragger from "antd/es/upload/Dragger";

import { InboxOutlined } from "@ant-design/icons";
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
    action: "https://open.larksuite.com/open-apis/im/v1/images",
    onChange(info) {
      console.log(info);
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
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
              <Dragger {...props}>
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
