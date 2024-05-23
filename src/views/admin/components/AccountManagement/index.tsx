import { Button, Col, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import './style.scss';
import getTenant from '../../../../api/getTenant';
import { TenantType } from '@/api/type';
const AccountManagement = (props: { tenantData: any }) => {
  const tenantData = {
    username: props?.tenantData?.username,
    email: props?.tenantData?.email,
    password: props?.tenantData?.password,
  };
  console.log(tenantData);
  return (
    <div>
      <div className='dashboard-right'>
        <div className='dashboard-account'>
          <div className='dashboard-avatar'>
            <img src='https://via.placeholder.com/150' alt='Avatar' />
            <div className='dashboard-name'>
              <p>{tenantData?.username}</p>
            </div>
          </div>
          <Form
            initialValues={tenantData}
            layout='horizontal'
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 21 }}
          >
            <Form.Item label='Họ và tên: ' name='username'>
              <Input placeholder={tenantData?.username} readOnly />
            </Form.Item>
            <Form.Item label='Email: ' name='email'>
              <Input placeholder={tenantData?.email} readOnly />
            </Form.Item>
            {tenantData && (
              <Form.Item label='Mật khẩu: ' name='password' initialValue={tenantData?.password}>
                <Input.Password readOnly />
              </Form.Item>
            )}
            <div className='dashboard-button'>
              <Button className='edit'>
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
              <Button className='delete'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke-width='1.5'
                  stroke='currentColor'
                  className='size-6'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
                  />
                </svg>
                Xóa tài khoản
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AccountManagement;
