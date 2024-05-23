import { Button, Tabs, TabsProps } from 'antd';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './index.scss';
import Logo from '../logo/Logo';
import Search from './components/Search/Search';

const Header = (props: { hasSearch?: boolean }) => {
  const nav = useNavigate();
  const local = useLocation();
  const defaultActiveKey = local.pathname.includes('/movie/') ? 'movie' : 'home';
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
    } else if (key === 'information') {
      nav('/about');
    }
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
            defaultActiveKey={defaultActiveKey}
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
