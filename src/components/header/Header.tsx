import { Button, Tabs, TabsProps } from "antd";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../asset/icon/Logo.tsx";
import Search from "./components/Search/Search.tsx";
import "./index.scss";
import UserPropType from "./components/User/User.tsx";

const Header = (props: { hasSearch?: boolean }) => {
  const nav = useNavigate();
  const local = useLocation();
  const defaultActiveKey = local.pathname.includes("/movie/")
    ? "movie"
    : "home";
  const items: TabsProps["items"] = [
    {
      key: "home",
      label: <Button>Home</Button>,
    },
    {
      key: "movie",
      label: (
        <Button>
          <a href="#showtime">Phim</a>
        </Button>
      ),
    },
    {
      key: "information",
      label: <Button>Thông tin rạp</Button>,
    },
    {
      key: "contact",
      label: <Button>Liên hệ</Button>,
    },
    {
      key: "user",
      label: <UserPropType />,
      disabled: true,
    },
  ];
  const onChangeTab = (key: string) => {
    if (key === "home") {
      nav("/");
    } else if (key === "movie") {
      nav("#showtime");
    } else if (key === "information") {
      nav("/about");
    }
  };
  return (
    <>
      <div className={"header"}>
        <header className=" header-container">
          <h1 slot="navbar" className={"header-logo"}>
            <NavLink to="/">
              <Logo />
            </NavLink>
          </h1>
          <Tabs
            slot="navbar"
            defaultActiveKey={defaultActiveKey}
            className="flex gap-s header-nav"
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
