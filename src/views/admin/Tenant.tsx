import { Avatar, Button, Dropdown, MenuProps } from 'antd';
import React from 'react';
import './Tenant.scss';
const Tenant: React.FC<any> = ({ tenantData }) => {
  const handleSelectItem = (event: any) => {
    const eventValue = event.key;
    if (eventValue === '3') {
      handleSignOut();
    }
  };
  const handleSignOut = () => {
    localStorage.removeItem('tenant');
    window.location.reload();
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Profile',
    },
    {
      key: '2',
      label: 'Settings',
    },
    {
      key: '3',
      label: 'Sign out',
      onClick: handleSelectItem,
    },
  ];
  return (
    <>
      {tenantData && (
        <Dropdown
          className='tenant'
          menu={{ items }}
          placement='bottomLeft'
          arrow={{ pointAtCenter: true }}
        >
          <Button>
            <Avatar size='large'>
              <img src={tenantData?.avatarURL} alt='avatar' />
            </Avatar>
          </Button>
        </Dropdown>
      )}
    </>
  );
};

export default Tenant;
