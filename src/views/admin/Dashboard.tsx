import { Layout, Tabs } from 'antd';
import dayjs from 'dayjs';
import { Children, useEffect, useState } from 'react';
import 'toastify-js/src/toastify.css';
import getTenant from '../../api/getTenant';
import { TenantType } from '../../api/type';
import Search from '../../components/header/components/Search/Search';
import Logo from '../../components/logo/Logo';
import './Dashboard.scss';
import Tenant from './Tenant';
import { CalendarManagement } from './components/CalendarManagement';
import PopcornManagement from './components/PopcornManagement';
import AccountManagement from './components/AccountManagement';
import { styleText } from 'util';

export const convertToDate = (date: string) => {
  const [day, month, year] = date.split('/');
  const result = `${year}/${month}/${day} 00:00:00`;
  return result;
};
export const convertToIOSDate = (date: string) => {
  return dayjs(date).format('YYYY/MM/DD HH:mm:ss');
};
const Dashboard = () => {
  const [tenant, setTenant] = useState<TenantType>();
  const tenantInLocal = localStorage.getItem('tenant');
  const tenantData = tenantInLocal ? getTenant(JSON.parse(tenantInLocal).username) : undefined;
  useEffect(() => {
    tenantData && setTenant(tenantData);
  }, [tenantData]);

  const itemsTab = [
    {
      label: (
        <div className='dashboard-admin'>
          <div className='dashboard-admin-wrap'>
            <Tenant tenantData={tenant}></Tenant>
            <div className='dashboard-admin-info'>
              <h4>Admin</h4>
              <span>{tenant?.username}</span>
            </div>
          </div>
          <div className='dashboard-admin-icon'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='size-6'
            >
              <path
                fillRule='evenodd'
                d='M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z'
                clipRule='evenodd'
              />
            </svg>
          </div>
        </div>
      ),
      key: 'admin',
      children: <AccountManagement tenantData={tenant} />,
    },
    {
      label: (
        <div className='dashboard-menu-wrap'>
          <a href='#'>Lịch chiếu</a>
        </div>
      ),
      key: 'calendar',
      children: <CalendarManagement />,
    },
    {
      label: (
        <div className='dashboard-menu-wrap'>
          <a href='#'>Bắp nước</a>
        </div>
      ),
      key: 'popcorn',
      children: <PopcornManagement />,
    },
  ];
  return (
    <Layout className='dashboard'>
      <div className='dashboard-search'>
        <div className='dashboard-logo'>
          <Logo></Logo>
        </div>
        <Search></Search>
      </div>
      <div className='dashboard-wrap'>
        <div className='dashboard-left'>
          <Tabs defaultActiveKey={'admin'} tabPosition={'left'} items={itemsTab} />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
