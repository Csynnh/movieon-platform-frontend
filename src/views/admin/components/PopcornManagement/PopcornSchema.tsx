import { ComboFormType } from "@/api/type";
import { InboxOutlined } from "@ant-design/icons";
import { Col, Form, Input, Modal, UploadProps, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import Dragger from "antd/es/upload/Dragger";
import AWS from "aws-sdk";

export type PopcornFormType = {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  form: any;
  loading: boolean;
  onFinish: (values: ComboFormType) => void;
  onUpload: (file: any) => void;
  imageURL?: string;
};
try {
  AWS?.config?.update({
    region: import.meta.env.VITE_AWS_REGION,
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  });
} catch (error) {
  // Handle the exception here
  console.error("Error updating AWS config:", error);
}
const PopcornSchema = ({
  open,
  form,
  loading,
  onOk,
  onCancel,
  onFinish,
  onUpload,
  imageURL,
}: PopcornFormType) => {
  const s3 = new AWS.S3();
  console.log("imageURL", imageURL);
  const props: UploadProps = {
    maxCount: 1,
    name: "file",
    defaultFileList: imageURL
      ? [
          {
            uid: "-1",
            name: "combo.png",
            status: "done",
            url: imageURL,
          },
        ]
      : [],
    beforeUpload: async (file) => {
      const params = {
        Bucket: "movieonplatformbucket",
        Key: file.name,
        Body: file,
      };
      const res: any = s3.upload(params, function (err: any, data: any) {
        if (err) {
          console.error(err);
        }
        onUpload(data.Location);
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
    <Modal
      title="Thêm bắp nước"
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      okText="Thêm"
      cancelText="Hủy"
      confirmLoading={loading}
    >
      <Form className="popcorn-form" form={form} onFinish={onFinish}>
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
                Support for a single upload. Strictly prohibited from uploading
                company data or other banned file.
              </p>
            </Dragger>
          </Form.Item>
        </Col>
        <Col span={22}>
          <Form.Item name={"name"} label="Tên Combo">
            <Input placeholder="Nhập tên combo"></Input>
          </Form.Item>
        </Col>
        <Col span={22}>
          <Form.Item name={"price"} label="Giá">
            <Input
              type="number"
              placeholder="Nhập giá"
              addonAfter="VND"
            ></Input>
          </Form.Item>
        </Col>
        <Col span={22}>
          <Form.Item name={"discount"} label="Giảm Giá">
            <Input
              type="number"
              placeholder="Nhập giảm giá"
              addonAfter="%"
            ></Input>
          </Form.Item>
        </Col>
        <Col span={22}>
          <Form.Item name={"description"} label="Mô tả">
            <TextArea placeholder="Nhập mô tả cho combo"></TextArea>
          </Form.Item>
        </Col>
      </Form>
    </Modal>
  );
};

export default PopcornSchema;
