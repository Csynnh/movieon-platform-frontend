import { Button, Tabs, TabsProps } from 'antd';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './index.scss';
import Logo from '../logo/Logo';
import Search from './components/Search/Search';
import { useEffect, useState } from 'react';

const Header = (props: { hasSearch?: boolean }) => {
  const nav = useNavigate();
  const local = useLocation();
  const [activeKey, setActiveKey] = useState(
    local.pathname.includes('/movie/')
      ? 'movie'
      : local.pathname.includes('/contact/')
      ? 'contact'
      : 'home',
  );
  useEffect(() => {
    setActiveKey(
      local.pathname.includes('/about')
        ? 'information'
        : local.pathname.includes('/contact')
        ? 'contact'
        : 'home',
    );
  }, [local.pathname]);
  const items: TabsProps['items'] = [
    {
      key: 'home',
      label: <Button>Home</Button>,
    },

    {
      key: 'information',
      label: <Button>Thông tin rạp</Button>,
    },
    {
      key: 'contact',
      label: <Button>Liên hệ</Button>,
    },
  ];
  const onChangeTab = (key: string) => {
    if (key === 'home') {
      nav('/');
    } else if (key === 'contact') {
      nav('/contact');
    } else if (key === 'information') {
      nav('/about');
    }
    setActiveKey(key);
  };
  return (
    <>
      <div className={'header'}>
        <header className=' header-container'>
          <h1 slot='navbar' className={'header-logo'}>
            <NavLink to='/'>
              <Logo />
            </NavLink>
          </h1>
          <Tabs
            slot='navbar'
            activeKey={activeKey}
            className='flex gap-s header-nav'
            items={items}
            onChange={onChangeTab}
          ></Tabs>
        </header>
      </div>
      {props?.hasSearch && <Search />}
    </>
  );
};

export default Header;
