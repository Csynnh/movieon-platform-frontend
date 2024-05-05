import { NavLink } from "react-router-dom";
import { Avatar } from "@hilla/react-components/Avatar";
import React, { useEffect, useState } from "react";
import getUser from "../../api/getUser";
import { MenuBar } from "@hilla/react-components/MenuBar";
import { createRoot } from "react-dom/client";
import { User } from "../../api/type";

const UserPropType: React.FC = () => {
  const [user, setUser] = useState<User>();
  const userInLocal = localStorage.getItem("user");
  const [avatarComponent, setAvatarComponent] = useState<HTMLDivElement>();

  const userData = userInLocal
    ? getUser(JSON.parse(userInLocal).username)
    : undefined;
  useEffect(() => {
    userData && setUser(userData);
  }, [userData]);
  useEffect(() => {
    const container = document.createElement("div");
    createRoot(container).render(
      <Avatar name={`${user?.firstName.toUpperCase()}`} />
    );
    setAvatarComponent(container);
  }, [user]);

  const handleSelectItem = (event: any) => {
    const eventValue = event.detail.value.text;
    if (eventValue === "Sign out") {
      handleSignOut();
    }
  };
  const handleSignOut = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  const menuBarItems = [
    {
      component: avatarComponent,
      children: [
        {
          text: "Profile",
        },
        {
          text: "Settings",
        },
        {
          text: "Sign out",
        },
      ],
    },
  ];

  return (
    <div className={"search-auth flex items-center"}>
      {!user ? (
        <>
          <NavLink to={"/signin"}>Log in</NavLink>
          <span>/</span>
          <NavLink to={"/signup"}>Sign up</NavLink>
          <Avatar />
        </>
      ) : (
        <MenuBar
          items={menuBarItems}
          theme="tertiary-inline"
          onItemSelected={handleSelectItem}
        />
      )}
    </div>
  );
};

export default UserPropType;
