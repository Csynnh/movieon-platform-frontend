import { CheckOutlined, CloseOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Upload, message } from 'antd';
import AWS from 'aws-sdk';
import { useEffect, useState } from 'react';
import './style.scss';
import { useUpdateTenant } from '@/api/updateTenant';
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
}

const AccountManagement = (props: { tenantData: any; onResult: any }) => {
  const { onResult } = props;
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submiting, setSubmiting] = useState<boolean>(false);
  const [uploadedImage, setUploadedImage] = useState<string>('');
  const [isAnableEdit, setIsAnableEdit] = useState<boolean>(false);
  useEffect(() => {
    setUploadedImage(props?.tenantData?.avatarURL ?? '');
  }, [props?.tenantData?.avatarURL]);
  const s3 = new AWS.S3();
  const handleUpload = async (file: any) => {
    if (!file?.name) return;
    setIsLoading(true);
    const params = {
      Bucket: 'movieonplatformbucket',
      Key: file.name,
      Body: file,
    };

    if (!s3) {
      setIsLoading(false);
      return false;
    }
    const res: any = await s3?.upload(params).promise();
    if (res) {
      setUploadedImage(res.Location);
      message.success('upload successfully.');
    } else {
      message.error('upload failed.');
    }
    setIsLoading(false);
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return false;
  };

  const tenantData = {
    username: props?.tenantData?.username,
    email: props?.tenantData?.email,
    password: props?.tenantData?.password,
  };
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type='button'>
      {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  const handleCancel = () => {
    setUploadedImage(props.tenantData?.avatarURL ?? '');
    setIsAnableEdit(false);
  };
  const handleUpdateTenant = async (values: any) => {
    setSubmiting(true);
    const data = { ...values, avatarURL: uploadedImage, user: props.tenantData?.username };
    const res = await useUpdateTenant(data);
    if (res?._id) {
      message.success('Update successfully');
      setIsAnableEdit(false);
    } else {
      message.error('Update failed');
    }
    setSubmiting(false);
    setIsAnableEdit(false);
    onResult(true);
    localStorage.setItem('tenant', JSON.stringify(res));
  };
  return (
    <div>
      <div className='dashboard-right'>
        <div className='dashboard-account'>
          <div className='dashboard-avatar'>
            <Upload
              name='avatar'
              listType='picture-card'
              className='avatar-uploader'
              fileList={
                uploadedImage
                  ? [
                      {
                        uid: '-1',
                        name: new URL(uploadedImage).pathname.slice(1),
                        status: 'done',
                        url: uploadedImage,
                      },
                    ]
                  : []
              }
              showUploadList={false}
              beforeUpload={handleUpload}
              disabled={isLoading || !isAnableEdit}
            >
              {uploadedImage && !isLoading ? (
                <img src={uploadedImage} alt='avatar' style={{ width: '100%' }} />
              ) : null}
              <div className='upload-btn'>{uploadButton}</div>
            </Upload>
            <div className='dashboard-name'>
              <p>{tenantData?.username}</p>
            </div>
          </div>
          <div className='account-form'>
            <Form
              form={form}
              initialValues={tenantData}
              layout='horizontal'
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 21 }}
              disabled={!isAnableEdit || submiting}
              onFinish={handleUpdateTenant}
            >
              <Form.Item label='Họ và tên: ' name='username'>
                <Input />
              </Form.Item>
              <Form.Item label='Email: ' name='email'>
                <Input />
              </Form.Item>
              <Form.Item label='Mật khẩu: ' name='password'>
                <Input.Password />
              </Form.Item>
            </Form>
            <div className='dashboard-button'>
              {!isAnableEdit ? (
                <>
                  <Button
                    loading={submiting}
                    className='edit'
                    onClick={() => setIsAnableEdit(true)}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                      className='size-6'
                    >
                      <path d='M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z' />
                      <path d='M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z' />
                    </svg>
                    Chỉnh sửa
                  </Button>
                  <Button loading={submiting} className='delete'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      className='size-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
                      />
                    </svg>
                    Xóa tài khoản
                  </Button>
                </>
              ) : (
                <>
                  <Button loading={submiting} className='edit' onClick={() => form.submit()}>
                    <CheckOutlined />
                    Xác nhận
                  </Button>
                  <Button disabled={submiting} className='cancel' onClick={handleCancel}>
                    <CloseOutlined />
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountManagement;
