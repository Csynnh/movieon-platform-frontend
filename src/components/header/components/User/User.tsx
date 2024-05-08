import { Avatar, Button, Dropdown, MenuProps } from "antd";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import getUser from "../../../../api/getUser";
import { User } from "../../../../api/type";
import { UserOutlined } from "@ant-design/icons";
import "./User.scss";
const UserPropType: React.FC = () => {
  const [user, setUser] = useState<User>();
  const userInLocal = localStorage.getItem("user");

  const userData = userInLocal
    ? getUser(JSON.parse(userInLocal).username)
    : undefined;
  useEffect(() => {
    userData && setUser(userData);
  }, [userData]);

  const handleSelectItem = (event: any) => {
    const eventValue = event.key;
    if (eventValue === "3") {
      handleSignOut();
    }
  };
  const handleSignOut = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Profile",
    },
    {
      key: "2",
      label: "Settings",
    },
    {
      key: "3",
      label: "Sign out",
      onClick: handleSelectItem,
    },
  ];
  return (
    <div className={"user flex items-center"}>
      {!user ? (
        <>
          <NavLink to={"/signin"}>
            <Button>Đăng Nhập</Button>
          </NavLink>
        </>
      ) : (
        <Dropdown
          menu={{ items }}
          placement="bottomLeft"
          arrow={{ pointAtCenter: true }}
        >
          <Button>
            <Avatar size="large" icon={<UserOutlined />} />{" "}
          </Button>
        </Dropdown>
      )}
    </div>
  );
};

export default UserPropType;
