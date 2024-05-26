import { Layout, Skeleton, Tabs } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import 'toastify-js/src/toastify.css';
import useTenantDetail from '../../api/getTenant';
import { TenantType } from '../../api/type';
import Search from '../../components/header/components/Search/Search';
import Logo from '../../components/logo/Logo';
import './Dashboard.scss';
import Tenant from './Tenant';
import AccountManagement from './components/AccountManagement';
import { CalendarManagement } from './components/CalendarManagement';
import PopcornManagement from './components/PopcornManagement';

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
  const [tenantLocal, setTenantLocal] = useState<any>(null);
  const {
    data,
    isLoading: tenantLoading,
    isFetching: tenantFetching,
    refetch: tenantRefetch,
  } = useTenantDetail(tenantLocal?.username);

  useEffect(() => {
    const tenantInLocal = JSON.parse(localStorage.getItem('tenant') ?? '');
    if (tenantInLocal) {
      setTenantLocal(tenantInLocal);
    }
  }, [localStorage.getItem('tenant')]);

  useEffect(() => {
    if (tenantLocal) {
      tenantRefetch();
    }
  }, [tenantLocal]);

  useEffect(() => {
    data && setTenant(data);
  }, [data]);

  const handleReload = async () => {
    const tenantInLocal = JSON.parse(localStorage.getItem('tenant') ?? '');
    if (tenantInLocal) {
      setTenantLocal(tenantInLocal);
    }
  };

  const itemsTab = [
    {
      label: (
        <div className='dashboard-admin'>
          {tenantLoading || tenantFetching ? (
            <Skeleton.Button className='loading-selector'></Skeleton.Button>
          ) : (
            <div className='dashboard-admin-wrap'>
              <Tenant tenantData={tenant}></Tenant>
              <div className='dashboard-admin-info'>
                <h4>Admin</h4>
                <span>{tenant?.username}</span>
              </div>
            </div>
          )}
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
      children: <AccountManagement tenantData={tenant} onResult={handleReload} />,
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
  useEffect(() => {
    data && setTenant(data);
  }, [data]);
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
          <Tabs defaultActiveKey={'calendar'} tabPosition={'left'} items={itemsTab} />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
