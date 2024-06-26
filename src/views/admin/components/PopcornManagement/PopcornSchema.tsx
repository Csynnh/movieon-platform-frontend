import { ComboFormType } from '@/api/type';
import Loading from '@/components/loading/Loading';
import { InboxOutlined } from '@ant-design/icons';
import { Col, Form, Input, Modal, UploadProps, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Dragger from 'antd/es/upload/Dragger';
import AWS from 'aws-sdk';
import { useState } from 'react';

export type PopcornFormType = {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  form: any;
  loading: boolean;
  onFinish: (values: ComboFormType) => void;
  onUpload: (file: any) => void;
  imageURL?: string;
  action?: string;
  uploadedImage?: string;
};
try {
  const awsAccessKeyId = import.meta.env.VITE_AWS_ACCESS_KEY_ID;
  const awsSecretAccessKey = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;
  if (awsAccessKeyId && awsSecretAccessKey && AWS && AWS.config) {
    AWS?.config?.update({
      region: 'ap-southeast-2',
      accessKeyId: awsAccessKeyId,
      secretAccessKey: awsSecretAccessKey,
    });
  }
} catch (error) {
  // Handle the exception here
  console.error('Error updating AWS config:', error);
}
const PopcornSchema = ({
  action,
  open,
  form,
  loading,
  onOk,
  onCancel,
  onFinish,
  onUpload,
  imageURL,
  uploadedImage,
}: PopcornFormType) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const s3 = new AWS.S3();
  const props: UploadProps = {
    maxCount: 1,
    listType: 'picture',
    name: 'file',
    onRemove: (file) => {
      onUpload('');
    },
    fileList:
      action === 'edit' && imageURL
        ? [
            {
              uid: '-1',
              name: new URL(imageURL).pathname.slice(1),
              status: 'done',
              url: imageURL,
            },
          ]
        : uploadedImage
        ? [
            {
              uid: '-1',
              name: new URL(uploadedImage).pathname.slice(1),
              status: 'done',
              url: uploadedImage,
            },
          ]
        : [],
    beforeUpload: async (file) => {
      setIsLoading(true);
      const params = {
        Bucket: 'movieonplatformbucket',
        Key: file.name,
        Body: file,
      };
      if (!s3) return false;
      const res: any = await s3?.upload(params).promise();
      if (res) {
        onUpload(res.Location);
        message.success('upload successfully.');
      } else {
        message.error('upload failed.');
      }
      setIsLoading(false);
      return false;
    },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };
  return (
    <Modal
      title={`${action === 'edit' ? 'CHỈNH SỬA' : 'THÊM'} BẮP NƯỚC`}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      okText='Submit'
      cancelText='Hủy'
      confirmLoading={loading}
    >
      <Form className='popcorn-form' form={form} onFinish={onFinish}>
        <Col span={22}>
          <Form.Item name={'image'} label='Hình Ảnh'>
            <Dragger {...props} listType='picture' disabled={isLoading}>
              <Loading spinning={isLoading}>
                <p className='ant-upload-drag-icon'>
                  <InboxOutlined />
                </p>
                <p className='ant-upload-text'>
                  Nhấp chọn hoặc kéo hình ảnh vào khu vực này để tải lên
                </p>
                <p className='ant-upload-hint'>
                  Hỗ trợ tải lên một lần. Nghiêm cấm tải lên dữ liệu công ty hoặc tập tin bị cấm
                  khác.
                </p>
              </Loading>
            </Dragger>
          </Form.Item>
        </Col>
        <Col span={22}>
          <Form.Item name={'name'} label='Tên Combo'>
            <Input placeholder='Nhập tên combo'></Input>
          </Form.Item>
        </Col>
        <Col span={22}>
          <Form.Item name={'price'} label='Giá'>
            <Input type='number' placeholder='Nhập giá' addonAfter='VND' maxLength={9}></Input>
          </Form.Item>
        </Col>
        <Col span={22}>
          <Form.Item name={'discount'} label='Giảm Giá'>
            <Input type='number' placeholder='Nhập giảm giá' addonAfter='%'></Input>
          </Form.Item>
        </Col>
        <Col span={22}>
          <Form.Item name={'description'} label='Mô tả'>
            <TextArea placeholder='Nhập mô tả cho combo'></TextArea>
          </Form.Item>
        </Col>
      </Form>
    </Modal>
  );
};

export default PopcornSchema;
